import Promise from 'bluebird';
import { Router } from 'express';

import Article from '../models/Article';
import ArticleComment from '../models/ArticleComment';
import ArticleRecommendation from '../models/ArticleRecommendation';
import ArticleRelation from '../models/ArticleRelation';
import Tag from '../models/Tag';
// import cachedMostUsedTags from './most_used_tags';

const cachedArticles = {};
const cachedCount = {};
const cachedMostUsedTags = {};
const router = Router();

function createContext(req, res, next) {
  req.scope = {};

  next();
}

function orderByScore(builder) {
  return builder.orderBy('score', 'asc');
}


function createScopedArticle(req, res, next) {
  req.scope.article = Article.query().findOneById(req.params.id);
  req.scope.comments = ArticleComment
    .query()
    .select(
      'article_comments.*',
      // ArticleComment.relatedQuery('votes').count().as('numberOfVotes'),
      ArticleComment.relatedQuery('votes').sum('vote').as('totalVotes'),
      ArticleComment.relatedQuery('votes').sum('vote').where({ vote: 1 }).as('upVotes'),
      ArticleComment.relatedQuery('votes').sum('vote').where({ vote: -1 }).as('downVotes'),
      ArticleComment.relatedQuery('votes').select('vote').where({ userId: 2 }).as('didIVote'),
      ArticleComment.relatedQuery('responses').count().as('numberOfResponses')
    )
    .eager('[user]')
    .where({
      articleId: req.params.id,
      commentId: null
    })
    .orderBy('totalVotes');
  req.scope.recommendations = ArticleRecommendation
    .query()
    .eager('[recommendation(orderByScore), recommendation.[translations, relations, relations.translations]]', { orderByScore })
    .where({ articleId: req.params.id })
    .orderBy('score', 'desc');
  req.scope.relations = ArticleRelation
    .query()
    .eager('[relation, relation.translations]')
    .where({ articleId: req.params.id });
  next();
}

async function getArticle(req, res, next) {
  try {
    const article = await Promise.props({
      article: req.scope.article,
      recommendations: req.scope.recommendations,
      relations: req.scope.relations,
      comments: req.scope.comments
    });

    return res.json(article);
  } catch (err) {
    return next(err);
  }
}

function createScopedArticles(req, res, next) {
  const { page, query, tags, includeTags, includeTag } = req.query;
  const category = req.query.category ? req.query.category.toLowerCase() : null;

  if (includeTags) {
    req.scope.includeTags = true;
  }

  if (includeTag) {
    req.scope.includeTag = includeTag;
  }

  req.scope.articles =
  // cachedArticles[(req.query.category || '') + (req.query.page || '') + (req.query.query || '')]
  //   ||
    Article.query().findByParams({ page, category, query, includeTag });

  if (includeTags && !includeTag) {
    req.scope.tags = cachedMostUsedTags[req.query.category || '']
      || Tag.query().findByCategory(category);
  }

  if (req.scope.includeTag) {
    req.scope.tag =
    // cachedArticles[(req.query.category || '') + (req.query.page || '') + (req.query.query || '')]
    //   ||
      Tag.query().findOneById(includeTag);
  }

  req.scope.count = cachedCount[req.query.category || '']
    || Article.query().countAll(category);

  next();
}

function getArticles(req, res, next) {
  return Promise.props({
    articles: req.scope.articles,
    tags: req.scope.tags,
    // count: req.scope.count,
    tag: req.scope.tag,
    page: req.scope.page
  })
    .then(({ articles, tags, tag, count = [{ 'count(*)': 0 }] }) => {
      const total = count[0]['count(*)'];

      cachedArticles[(req.query.category || '') + (req.query.page || '') + (req.query.query || '')] = articles;
      cachedMostUsedTags[req.query.category || ''] = tags;
      cachedCount[req.query.category || ''] = count;
      res.set('X-Total-Count', total);
      res.json({ articles, tags, tag, count });
    })
    .catch(next);
}

router.route('/articles/:id')
  .all(createContext)
  .get([createScopedArticle, getArticle]);

router.route('/articles')
  .all(createContext)
  .get([createScopedArticles, getArticles]);

export default router;
