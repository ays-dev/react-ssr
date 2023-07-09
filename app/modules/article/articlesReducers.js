import {
  ARTICLES_TO_FETCH,
  ARTICLES_FETCHING,
  ARTICLES_FETCHED,
  ARTICLES_FETCH_FAILED,
  ARTICLES_FETCH_CANCELLED
} from './articlesActions';

export default function articles(state = {
  readyState: ARTICLES_TO_FETCH,
  async: null,
  fetchBeginAt: null,
  fetchedAt: null,
  pageState: null,
  tag: null,
  tags: null,
  list: null,
  totalCount: null,
  page: null,
  category: null
}, action) {
  const isClient = typeof document !== 'undefined';

  switch (action.type) {
    case ARTICLES_FETCHING:
      return {
        ...state,
        fetchBeginAt: new Date(),
        readyState: ARTICLES_FETCHING,
        category: action.category
      };
    case ARTICLES_FETCH_CANCELLED:
      return {
        ...state,
        readyState: ARTICLES_FETCH_CANCELLED
      };
    case ARTICLES_FETCH_FAILED:
      return {
        ...state,
        readyState: ARTICLES_FETCH_FAILED,
        error: action.error
      };
    case ARTICLES_FETCHED:
      return {
        ...state,
        readyState: ARTICLES_FETCHED,
        async: isClient,
        fetchedAt: new Date(),
        list: action.articles.articles,
        tag: action.articles.tag,
        tags: action.articles.tags,
        category: action.category,
        page: action.page,
        totalCount: action.articles.count[0]['count(*)']
      };
    default:
      return state;
  }
}
