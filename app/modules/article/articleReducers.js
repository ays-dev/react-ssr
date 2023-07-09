import {
  ARTICLE_TO_FETCH,
  ARTICLE_FETCHING,
  ARTICLE_FETCHED,
  ARTICLE_FETCH_FAILED,
  ARTICLE_FETCH_CANCELLED
} from './articleActions';

export default function article(state = {
  readyState: ARTICLE_TO_FETCH
}, action) {
  const isClient = typeof document !== 'undefined';

  switch (action.type) {
    case ARTICLE_FETCHING:
      return {
        ...state,
        readyState: ARTICLE_FETCHING
      };
    case ARTICLE_FETCH_CANCELLED:
      return {
        ...state,
        readyState: ARTICLE_FETCH_CANCELLED
      };
    case ARTICLE_FETCH_FAILED:
      return {
        ...state,
        readyState: ARTICLE_FETCH_FAILED,
        error: action.error
      };
    case ARTICLE_FETCHED:
      return {
        ...state,
        readyState: ARTICLE_FETCHED,
        async: isClient,
        fetchedAt: new Date(),
        data: action.article.article,
        recommendations: action.article.recommendations,
        relations: action.article.relations,
        comments: action.article.comments
      };
    default:
      return state;
  }
}
