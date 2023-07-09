import React, { Component } from 'react';

import { Link } from 'react-router-dom';

class ArticleItemTags extends Component {
  render() {
    const { tags } = this.props;

    if (!tags) {
      return null;
    }

    return (
      <div className='mt-4'>
        {tags.map((tag, key) => (
          Boolean(tag.translations.length)
            && (
            <span title={tag.translations[0].description} key={key}>
              <Link
                className='mr-3 text-success'
                to={'/tags/' + tag.slug}
              >
                <b className='text-nowrap'>
                  {`#${tag.translations[0].label}`}
                </b>
              </Link>
              {' '}
            </span>
            )
        ))}
      </div>
    );
  }
}

export default ArticleItemTags;
