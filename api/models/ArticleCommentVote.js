import { Model } from 'objection';

export default class ArticleCommentVote extends Model {
  static tableName = 'article_comment_votes';

  static relationMappings ={
    originalComment: {
      relation: Model.HasOneRelation,
      modelClass: `${__dirname}/ArticleComment`,
      join: {
        from: 'article_comment_votes.articleCommentId',
        to: 'article_comments.id'
      }
    }
  };
}
