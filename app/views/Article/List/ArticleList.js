import React, { Component } from 'react';
import { withRouter } from 'react-router';
import parseQueryString from 'query-string';

import { ArticleItemSmall } from '../View';
import {
  ArticleListPagination,
  ArticleListFilter
} from '.';

class ArticleList extends Component {
  render() {
    const {
      articles, tag, tags, totalCount, category, pagination, location: { search }
    } = this.props;

    if (!articles) {
      return null;
    }

    const { p: page = 1, q: query = '' } = parseQueryString.parse(search);

    return (
      <div className='pt-3'>
        {
          ((tag || tags) && !query)
          && (
          <ArticleListFilter
            tag={tag}
            tags={tags}
          />
          )
        }
        {
          articles.map(article => (
            <ArticleItemSmall
              key={article.id}
              article={article}
            />
          ))
        }
        {
          (pagination && articles.length)
            ? (
              <ArticleListPagination
                category={category}
              />
            )
            : (
              <div>0 results</div>
            )
        }
      </div>
    );
  }
}

export default withRouter(ArticleList);
