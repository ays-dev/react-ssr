import Promise from 'bluebird';
import { Router } from 'express';

const router = Router();

function createContext(req, res, next) {
  req.scope = {};

  if (Array.isArray(req.query.includes) && req.query.includes.includes('tags')) {
    req.scope.includeTags = true;
  }
  next();
}

function createScopedArticle(req, res, next) {
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
  const { page, query } = req.query;
  const category = req.query.category ? req.query.category.toLowerCase() : null;

  req.scope.articles = cachedArticles[(req.query.category || '') + (req.query.page || '') + (req.query.query || '')]
    || Article.query().findByParams({ page, category, query });

  if (req.scope.includeTags) {
    req.scope.tags = Array.isArray(cachedMostUsedTags[req.query.category || ''])
      ? cachedMostUsedTags[req.query.category || ''].slice(0, 25)
      : null;
  }

  req.scope.count = cachedCount[req.query.category || '']
    || Article.query().countAll(category);

  next();
}

function getArticles(req, res, next) {
  return Promise.props({
    articles: req.scope.articles,
    tags: req.scope.tags,
    count: req.scope.count,
    page: req.scope.page
  })
    .then(({ articles, tags, count }) => {
      const total = count[0]['count(*)'];

      cachedArticles[(req.query.category || '') + (req.query.page || '') + (req.query.query || '')] = articles;
      cachedMostUsedTags[req.query.category || ''] = tags;
      cachedCount[req.query.category || ''] = count;
      res.set('X-Total-Count', total);
      res.json({ articles, tags, count });
    })
    .catch(next);
}

router.route('/articles/:id')
  .all(createContext)
  .get([createScopedArticle, getArticle]);

export default router;
