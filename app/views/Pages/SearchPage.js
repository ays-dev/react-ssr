import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeadTag from 'react-head';

import Container from 'reactstrap/lib/Container';

import { Header, Footer } from '../Common';
import { ArticleList } from '../Article/List';
import CategoryList from '../Common/CategoryList';
import ListPlaceholder from '../Common/ListPlaceholder';
import * as ArticlesActions from '../../modules/article/articlesActions';

class SearchPage extends Component {
  static loadContext(getState, match) {
    const articles = getState().articles.list;

    if (match.params.tagSlug && !articles.length) {
      return {
        status: 301,
        to: '/'
      };
    }

    return null;
  }

  static loadData(dispatch, match, query) {
    return Promise.all([
      dispatch(ArticlesActions.fetchArticlesIfNeeded(match, query, { includeTags: true }))
    ]);
  }

  static loadMeta(getState, match, query, context) {
    const { category, page, tags } = getState().articles;
    return [
      <HeadTag tag='title'>
        {`Discover ${category} - ${page > 1 ? ` Page ${page} - ` : ''}${context.base} Recommendations`}
      </HeadTag>,
      <HeadTag tag='meta' name='keywords' content={'Discover recommendations ' + category + ' look like comment list critic'} />
    ];
  }

  shouldComponentUpdate(nextProps) {
    const { location: { key }, loading } = this.props;
    const { location: { key: nextKey }, loading: nextLoading } = nextProps;
    return key !== nextKey
      || (key === nextKey
        && loading === true
        && nextLoading === false);
  }

  render() {
    const {
      loading, articles, totalCount, tags, tag, match: { params: { categorySlug } }
    } = this.props;

    return (
      <div className='Page'>
        <div className='Section'>
          <Header />
          <CategoryList />
          <Container>
            {loading
              ? <ListPlaceholder />
              : (
                <ArticleList
                  articles={articles}
                  tag={tag}
                  tags={tags}
                  totalCount={totalCount}
                  category={categorySlug}
                  pagination
                />
              )
            }
          </Container>
        </div>
        {
          !loading
          && <Footer />
        }
      </div>
    );
  }
}

export default connect(state => ({
  articles: state.articles.list,
  tag: state.articles.tag,
  tags: state.articles.tags,
  totalCount: state.articles.totalCount
}))(SearchPage);
