import { Model } from 'objection';

export default class ArticleComment extends Model {
  static tableName = 'article_comments';

  static relationMappings ={
    user: {
      relation: Model.HasOneRelation,
      modelClass: `${__dirname}/User`,
      join: {
        from: 'article_comments.userId',
        to: 'users.id'
      }
    },
    originalArticle: {
      relation: Model.HasOneRelation,
      modelClass: `${__dirname}/Article`,
      join: {
        from: 'article_comments.articleId',
        to: 'articles.id'
      }
    },
    responses: {
      relation: Model.HasManyRelation,
      modelClass: `${__dirname}/ArticleComment`,
      join: {
        from: 'article_comments.id',
        to: 'article_comments.commentId'
      }
    },
    votes: {
      relation: Model.HasManyRelation,
      modelClass: `${__dirname}/ArticleCommentVote`,
      join: {
        from: 'article_comments.id',
        to: 'article_comment_votes.articleCommentId'
      }
    }
  };
}
