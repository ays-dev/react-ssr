import { Model } from 'objection';

export default class ArticleTranslation extends Model {
  static tableName = 'article_translations';

  static relationMappings = {
    originalArticle: {
      relation: Model.HasOneRelation,
      modelClass: `${__dirname}/Article`,
      join: {
        from: 'article_translations.articleId',
        to: 'articles.id'
      }
    }
  };
}
