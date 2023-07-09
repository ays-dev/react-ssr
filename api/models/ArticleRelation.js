import { Model } from 'objection';

export default class ArticleRelation extends Model {
  static tableName = 'article_relations';

  static relationMappings ={
    originalArticle: {
      relation: Model.HasOneRelation,
      modelClass: `${__dirname}/Article`,
      join: {
        from: 'article_relations.articleId',
        to: 'articles.id'
      }
    },
    relation: {
      relation: Model.HasOneRelation,
      modelClass: `${__dirname}/Article`,
      join: {
        from: 'article_relations.toArticleId',
        to: 'articles.id'
      }
    }
  };
}
