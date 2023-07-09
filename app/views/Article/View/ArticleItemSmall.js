import React, { Component } from 'react';

import Media from 'reactstrap/lib/Media';

import {
  ArticleItemSmallBody,
  ArticleItemSmallCover
} from '.';

class ArticleItemSmall extends Component {
  render() {
    const { article } = this.props;

    if (!article) {
      return null;
    }

    return (
      <Media className='my-4'>
        <ArticleItemSmallCover images={article.images} category={article.category} />
        <ArticleItemSmallBody article={article} />
      </Media>
    );
  }
}

export default ArticleItemSmall;
