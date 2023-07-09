import React, { Component } from 'react';

import { yearOnly } from '../../../utils/filters';

class ArticleItemSmallSubtitle extends Component {
  render() {
    const {
      category,
      startAt,
      endAt
    } = this.props;
    const date = yearOnly(startAt, endAt);

    return (
      <div className='text-muted'>
        {category.substring(0, category.length - 1)}
        {date ? (
          <span className='text-gray-lighter'>
            {' | '}
            {date}
          </span>
        ) : null}
      </div>
    );
  }
}

export default ArticleItemSmallSubtitle;
