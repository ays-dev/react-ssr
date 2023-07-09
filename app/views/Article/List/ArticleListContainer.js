import React, { Component } from 'react';

import { ArticleItemSmall } from '../View';

class ArticleListContainer extends Component {
  render() {
    const {
      articles
    } = this.props;

    if (!articles) {
      return null;
    }

    return (
      <div className='mt-4'>
        {
          articles.map(article => (
            <ArticleItemSmall
              key={article.uid}
              article={article}
            />
          ))
        }

      </div>
    );
  }
}

export default ArticleListContainer;
