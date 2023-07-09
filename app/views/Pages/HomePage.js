import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Title } from 'react-head';

import Container from 'reactstrap/lib/Container';
import CategoryList from '../Common/CategoryList';

import { Header, Footer } from '../Common';
import ListPlaceholder from '../Common/ListPlaceholder';
import {
  ArticleList,
} from '../Article/List';

import * as ArticlesActions from '../../modules/article/articlesActions';

class HomePage extends Component {
  static loadData(dispatch, match, query) {
    return Promise.all([
      dispatch(ArticlesActions.fetchArticlesIfNeeded(match, query))
    ]);
  }

  static loadMeta(getState, match, query, context) {
    const page = getState().articles.page;
    return [<Title>{context.base}{page ? ` - Page ${page}` : ''}</Title>];
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
      loading, articles, totalCount, tags, match: { params: { categorySlug } }
    } = this.props;

    return (
      <div>
        <div>
          <Header />
          <CategoryList />
          <Container>
            {loading
              ? <ListPlaceholder />
              : (
                <div>
                  <ArticleList
                    articles={articles}
                    tags={tags}
                    pagination
                    totalCount={totalCount}
                  />
                </div>
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

export default connect((state, props) => ({
  articles: state.articles.list,
  tags: state.articles.tags,
  totalCount: state.articles.totalCount
}))(HomePage);
