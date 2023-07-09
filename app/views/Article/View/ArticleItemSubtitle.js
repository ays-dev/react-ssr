import React, { Component } from 'react';

import { yearOnly } from '../../../utils/filters';

class ArticleItemSubtitle extends Component {
  render() {
    const {
      category,
      countries,
      startAt,
      endAt,
      aliases
    } = this.props;

    return (
      <div>
        {aliases && !aliases.length
          ? null
          : (
            <div className='text-muted'>
              {'alt: '}
              {
              aliases.map((alias, key) => (
                <span key={key}>
                  {alias}
                  {key !== aliases.length - 1 ? ', ' : ''}
                </span>
              ))
            }
            </div>
          )}
        <div className='text-muted'>
          {category.substring(0, category.length - 1)}
          {
            yearOnly(startAt, endAt)
            && (
            <span className='text-gray-lighter'>
              {' | '}
            </span>
            )
          }
          {yearOnly(startAt, endAt)}
          {
            countries[0]
            && (
            <span className='text-gray-lighter'>
              {' | '}
            </span>
            )
          }
          {
            countries.map(country => (
              <span key={country.longCountryCode}>
                <span title={`Flag of ${country.translations[0].name}, ${country.translations[0].description}`}>
                  {country.flag}
                </span>
              </span>
            ))
          }
        </div>
      </div>
    );
  }
}

export default ArticleItemSubtitle;
