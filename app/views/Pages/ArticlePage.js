import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Title, Meta } from 'react-head';
import HeadTag from 'react-head';
import Container from 'reactstrap/lib/Container';

import ListPlaceholder from '../Common/ListPlaceholder';
import CategoryList from '../Common/CategoryList';
import { Article } from '../Article/View';
import { Header, Footer } from '../Common';

import * as ArticleActions from '../../modules/article/articleActions';

class ArticlePage extends Component {
  static loadData(dispatch, match) {
    return Promise.all([
      dispatch(ArticleActions.fetchArticleIfNeeded(match))
    ]);
  }

  static loadContext(getState) {
    const article = getState().article.data;

    if (!article) {
      return {
        status: 301,
        to: '/'
      };
    }
    return null;
  }

  static loadMeta(getState, match, query, context) {
    const state = getState();
    const title = state.article.data.translations[0].label;
    const description = state.article.data.translations[0].description;
    const tags = state.article
      .data
      .tags
      .slice(-10)
      .map(({ translations: [{ label }] }) => label)
      .join(', ');

    return (
        <div>
        <Title>
          {`${title} - ${context.base}`}
        </Title>
        <Meta name='keywords' content={tags} />
        <Meta name='description' content={title + ' ' + description} />
        <Meta property='og:title' content={title} />
        <Meta property='og:description' content={title + ' ' + description} />
        <Meta property='og:url' content='https://yourwebsite.com/your-awesome-article' />
        <Meta property='og:image' content='https://yourwebsite.com/article-image.jpg' />
        <Meta property='og:site_name' content={context.base} />
        <Meta name='twitter:card' content='summary_large_image' />
        <Meta name='twitter:title' content={title} />
        <Meta name='twitter:description' content={title + ' ' + description} />
        <Meta name='twitter:url' content='https://yourwebsite.com/your-awesome-article' />
        <Meta name='twitter:image' content='https://yourwebsite.com/article-image.jpg' />

        </div>
      );
  }

  render() {
    const { article, loading } = this.props;

    return (
      <div className='Page'>
        <div className='Section'>
          <Header />
          <CategoryList />
          <Container>
            {(!article || loading)
              ? <ListPlaceholder />
              : <Article article={article} />
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
  article: state.article
}))(ArticlePage);
