import React, { Component } from 'react';

import Media from 'reactstrap/lib/Media';

import {
  ArticleItemSmallTitle,
  ArticleItemSmallSubtitle,
  ArticleItemSmallDescription
} from '.';

class ArticleItemSmallBody extends Component {
  render() {
    const { article } = this.props;

    if (!article) {
      return null;
    }

    const {
      id,
      category,
      countries,
      startAt,
      endAt,
      translations: [translations]
    } = article;
    const { label: title, description } = translations || {};

    return (
      <Media body className='ml-2'>
        <ArticleItemSmallTitle title={title} slug={id} />
        <ArticleItemSmallSubtitle
          category={category}
          countries={countries}
          startAt={startAt}
          endAt={endAt}
        />
        <ArticleItemSmallDescription description={description} />
      </Media>
    );
  }
}

export default ArticleItemSmallBody;
