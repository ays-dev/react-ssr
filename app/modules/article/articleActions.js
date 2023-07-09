import axios from 'axios';
import https from 'https';

import { APP_CLIENT_LOADED } from '../app/appActions';
// import { Article } from './articleResources';

export const ARTICLE_TO_FETCH = 'ARTICLE_TO_FETCH';
export const ARTICLE_FETCHING = 'ARTICLE_FETCHING';
export const ARTICLE_FETCHED = 'ARTICLE_FETCHED';
export const ARTICLE_FETCH_FAILED = 'ARTICLE_FETCH_FAILED';
export const ARTICLE_FETCH_CANCELLED = 'ARTICLE_FETCH_CANCELLED';

function fetchArticle(match) {
  return dispatch => {
    const { params } = match;
    const { articleSlug: articleId } = params;
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    dispatch({ type: ARTICLE_FETCHING, articleId });

    const cancellablePromise = axios.get('https://127.0.0.1:3030/api/articles/' + articleId, {
        cancelToken: source.token,
        httpsAgent: new https.Agent({
          rejectUnauthorized: false
        })
      })
      .then(({ data: article }) => (
        dispatch({
          type: ARTICLE_FETCHED,
          articleId,
          article
        })
      ))
      .catch(err => (
        (err && err.response)
          ? err.response
            .json()
            .then(
              error => dispatch({
                type: ARTICLE_FETCH_FAILED,
                articleId,
                error
              })
            )
          : dispatch({
            type: ARTICLE_FETCH_FAILED,
            articleId,
            error: { type: 'UnexpectedError', error: err.toString() }
          })
      ))
      .finally(() => (
        typeof cancellablePromise.isCancelled === 'function'
        && cancellablePromise.isCancelled()
        && (source.cancel() || dispatch({ type: ARTICLE_FETCH_CANCELLED }))
      ));
    return cancellablePromise;
  };
}

function shouldFetchArticle(state) {
  const article = state.article;
  const app = state.app;

  if (app.readyState === APP_CLIENT_LOADED
    || article.readyState === ARTICLE_FETCH_FAILED
    || article.readyState === ARTICLE_TO_FETCH) {
    return true;
  }

  return false;
}

export function fetchArticleIfNeeded(match) {
  return (dispatch, getState) => {
    if (shouldFetchArticle(getState())) {
      return dispatch(fetchArticle(match));
    }
    return false;
  };
}

export function comment() {
  return (dispatch, getState) => {
    return '';
  };
}
