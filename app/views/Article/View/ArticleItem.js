import React, { Component } from 'react';

import Media from 'reactstrap/lib/Media';

import {
  ArticleItemBody,
  ArticleItemCover
} from '.';

class ArticleItem extends Component {
  render() {
    const { article, relations } = this.props;

    if (!article) {
      return null;
    }

    return (
      <Media className='ArticleItem'>
        <ArticleItemCover article={article} />
        <ArticleItemBody article={article} relations={relations} />
      </Media>
    );
  }
}

export default ArticleItem;
