import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ArticleListFilter extends Component {
  render() {
    const { tag, tags } = this.props;

    if (tag) {
        return (
        <div>
          <div className='mt-4'>
            <h3>
              Tag: {tag.translations[0].label}
            </h3>
          </div>
          {
            tag.translations[0].description
            && (
              <div className='mb-4 pt-2 pb-3'>
                {tag.translations[0].description}
              </div>
            )
          }
        </div>
      );
    }

    return (
      <div>
        <div className='pt-4'>
          <h3>
            Trending tags{/* <small className='text-muted'>view all</small>*/}
          </h3>
        </div>
        <div className='mb-4 pb-3 mt-4'>
          {tags.map((tag, key) => (
            <span key={key}>
              <Link
                className='mr-2 text-success'
                to={'/tags/' + tag.slug}
              >
                <b className='text-nowrap'>
                  {`#${tag.translations[0].label}`}
                </b>
              </Link>
              {' '}
            </span>
          ))}
        </div>
      </div>
    );
  }
}


export default ArticleListFilter;
