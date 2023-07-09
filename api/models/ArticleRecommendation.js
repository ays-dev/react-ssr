import { Model } from 'objection';

export default class ArticleRecommendation extends Model {
  static tableName = 'article_recommendations';

  static relationMappings ={
    originalArticle: {
      relation: Model.HasOneRelation,
      modelClass: `${__dirname}/Article`,
      join: {
        from: 'article_recommendations.articleId',
        to: 'articles.id'
      }
    },
    recommendation: {
      relation: Model.HasOneRelation,
      modelClass: `${__dirname}/Article`,
      join: {
        from: 'article_recommendations.toArticleId',
        to: 'articles.id'
      }
    }
  };
}
