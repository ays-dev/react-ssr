import React, { Component } from 'react';

import Media from 'reactstrap/lib/Media';

import {
  ArticleItemTitle,
  ArticleItemSubtitle,
  ArticleItemDescription,
  ArticleItemTags
} from '.';

class ArticleItemBody extends Component {
  render() {
    const { article, relations } = this.props;

    if (!article) {
      return null;
    }

    const {
      id,
      category,
      countries,
      startAt,
      endAt,
      tags,
      wikidataId,
      translations: [translations]
    } = article;
    const { label: title, description } = translations || {};
    const aliases = JSON.parse(translations.aliases || '[]');

    return (
      <Media className='ArticleItemBody' body>
        <ArticleItemTitle title={title} slug={id} />
        <ArticleItemSubtitle
          category={category}
          countries={countries}
          startAt={startAt}
          endAt={endAt}
          aliases={aliases}
        />
        <ArticleItemTags tags={tags} />
        <ArticleItemDescription
          wikidataId={wikidataId}
          description={description}
          relations={relations}
        />
      </Media>
    );
  }
}

export default ArticleItemBody;
