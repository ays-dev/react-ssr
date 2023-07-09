import { Model, QueryBuilder } from 'objection';

function selectLanguage(language) {
  return builder => builder.where('languageCode', language);
}

function selectTag(slug) {
  return builder => builder.where('slug', slug);
}

function selectQuery(query) {
  // todo: sanitize
  return builder => builder
    .whereRaw('MATCH (label, description, aliasesRaw) AGAINST ( ? IN BOOLEAN MODE)', [query]);
}

class ArticleQueryBuilder extends QueryBuilder {
  findByParams({
    page = 0,
    category,
    query,
    includeTag
  }) {
    let articlesScope = null;
    let articleModifiers = null;

    if (query) {
      articlesScope = '[translations(selectLanguage, selectQuery)]';
      this
        .eagerAlgorithm(Article.JoinEagerAlgorithm)
        .eagerOptions({ joinOperation: 'innerJoin' });
      articleModifiers = {
        selectLanguage: selectLanguage('EN'), selectQuery: selectQuery(query)
      };
    } else if (includeTag) {
      articlesScope = '[translations(selectLanguage),tags(selectTag).[translations(selectLanguage)]]';
      this
        .eagerAlgorithm(Article.JoinEagerAlgorithm)
        .eagerOptions({ joinOperation: 'innerJoin' });
      articleModifiers = {
        selectLanguage: selectLanguage('EN'), selectTag: selectTag(includeTag)
      };
    } else {
      articlesScope = '[translations(selectLanguage)]';
      articleModifiers = {
        selectLanguage: selectLanguage('EN')
      };
    }

    if (page > 0) {
      this.offset(Article.pageSize * (page - 1));
    }
    if (category) {
      this.where({ category });
    }
    if (query) {
      return this
        .eager(articlesScope, articleModifiers)
        .where({ status: 'ENABLED' })
        .limit(Article.pageSize);
    }
    if (includeTag) {
      return this
        .eager(articlesScope, articleModifiers)
        // .orderByRaw('haveCover DESC')
        .where({ status: 'ENABLED' })
        .limit(Article.pageSize);
    }
    return this
      .eager(articlesScope, articleModifiers)
      .orderByRaw('haveCover DESC')
      .where({ status: 'ENABLED' })
      .limit(Article.pageSize);
  }

  findOneById(id) {
    const articleScope = '[translations(selectLanguage), '
      + 'tags.translations(selectLanguage), '
      + 'countries.translations(selectLanguage)]';

    return this
      .eager(articleScope, { selectLanguage: selectLanguage('EN') })
      .where({ id })
      .first();
  }

  countAll(category) {
    if (category) {
      this.where({ category });
    }
    this.andWhere({ status: 'ENABLED' });
    return this.count('*');
  }
}

export default class Article extends Model {
  static tableName = 'articles';

  static QueryBuilder = ArticleQueryBuilder;

  static pageSize = 20;

  static relationMappings = {
    comments: {
      relation: Model.HasManyRelation,
      modelClass: `${__dirname}/ArticleComment`,
      join: {
        from: 'articles.id',
        to: 'article_comments.articleId'
      }
    },
    relations: {
      relation: Model.ManyToManyRelation,
      modelClass: `${__dirname}/Article`,
      join: {
        from: 'articles.id',
        through: {
          from: 'article_relations.articleId',
          to: 'article_relations.toArticleId'
        },
        to: 'articles.id'
      }
    },
    translations: {
      relation: Model.HasManyRelation,
      modelClass: `${__dirname}/ArticleTranslation`,
      join: {
        from: 'articles.id',
        to: 'article_translations.articleId'
      }
    },
    tags: {
      relation: Model.ManyToManyRelation,
      modelClass: `${__dirname}/Tag`,
      join: {
        from: 'articles.id',
        through: {
          from: 'article_tags.articleId',
          to: 'article_tags.tagId'
        },
        to: 'tags.id'
      }
    },
    countries: {
      relation: Model.ManyToManyRelation,
      modelClass: `${__dirname}/Country`,
      join: {
        from: 'articles.id',
        through: {
          from: 'article_countries.articleId',
          to: 'article_countries.countryId'
        },
        to: 'countries.id'
      }
    }
  };
}
