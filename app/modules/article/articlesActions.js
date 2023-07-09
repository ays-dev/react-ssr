import axios from 'axios';
import https from 'https';

import { APP_CLIENT_LOADED } from '../app/appActions';

export const ARTICLES_TO_FETCH = 'ARTICLES_TO_FETCH';
export const ARTICLES_FETCHING = 'ARTICLES_FETCHING';
export const ARTICLES_FETCHED = 'ARTICLES_FETCHED';
export const ARTICLES_FETCHED_ASYNC = 'ARTICLES_FETCHED_ASYNC';
export const ARTICLES_FETCH_FAILED = 'ARTICLES_FETCH_FAILED';
export const ARTICLES_FETCH_CANCELLED = 'ARTICLES_FETCH_CANCELLED';

function fetchArticles(match, query, options = {}) {
  return dispatch => {
    const { params } = match;
    const { categorySlug: category = '', tagSlug: includeTag } = params;
    const { q: queryText = '', p: page = 0 } = query;
    const { includeTags } = options;
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    dispatch({ type: ARTICLES_FETCHING, category });

    const cancellablePromise = axios.get('https://127.0.0.1:3030/api/articles/', {
        cancelToken: source.token,
        httpsAgent: new https.Agent({
          rejectUnauthorized: false
        }),
        params: { category, query: queryText, page, includeTags, includeTag }
      })
      .then(({ data: articles }) => (
        dispatch({
          type: ARTICLES_FETCHED,
          category,
          articles,
          page
        })
      ))
      .catch(err => (
        (err && err.response)
          ? err.response
            .json()
            .then(
              error => dispatch({
                type: ARTICLES_FETCH_FAILED,
                error
              })
            )
          : dispatch({
            type: ARTICLES_FETCH_FAILED,
            error: { type: 'UnexpectedError', error: err.toString() }
          })
      ))
      .finally(() => (
        typeof cancellablePromise.isCancelled === 'function'
        && cancellablePromise.isCancelled()
        && (source.cancel() || dispatch({ type: ARTICLES_FETCH_CANCELLED }))
      ));
    return cancellablePromise;
  };
}

function shouldFetchArticles(state) {
  const { articles, app } = state;
  const articleToFetch = articles.readyState === ARTICLES_TO_FETCH
    || articles.readyState === ARTICLES_FETCH_FAILED;
  // todo: optimize
  if (articleToFetch || app.readyState === APP_CLIENT_LOADED) {
    return true;
  }

  return false;
}

export function fetchArticlesIfNeeded(match, query, options) {
  return (dispatch, getState) => {
    if (shouldFetchArticles(getState())) {
      return dispatch(fetchArticles(match, query, options));
    }
    return false;
  };
}
