import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import parseQueryString from 'query-string';

// TODO: Create ../../../helpers/pagination
class ArticleListPagination extends Component {
  static pageSize = 50;

  static pagesListSize = 5;

  render() {
    const { category, location: { search } } = this.props;
    const { p = 1, q } = parseQueryString.parse(search);
    const currentPage = Number(p);
    const pagesList = [...new Array(ArticleListPagination.pagesListSize).keys()];
    const categoryBaseLink = category ? `/search/${category || 'films'}` : '';

    return (
      <ul className='py-4'>
        <li key={0} style={{ backgroundColor: 'transparent', display: (currentPage > 1) ? 'inline-block' : 'none' }}>
          <Link style={{ paddingRight: '1rem' }} className='mr-2' to={{ pathname: categoryBaseLink, search: `?q=${q || ''}&p=${currentPage - 1}` }}>
            <i style={{ verticalAlign: 'bottom' }} className='icon-lightest icon-inline material-icons'>
              keyboard_arrow_left
            </i>
            Previous
          </Link>
        </li>
        {
          pagesList.map((page, key) => (
            currentPage !== page + currentPage - (currentPage > 1 ? 1 : 0)
              ? (
                <li key={key + 1} style={{ backgroundColor: 'transparent', display: 'inline-block' }}>
                  <Link
                    style={{ paddingRight: '1rem' }}
                    to={{ pathname: categoryBaseLink, search: `?q=${q || ''}&p=${page + currentPage - (currentPage > 1 ? 1 : 0)}` }}
                  >
                    {page + currentPage - (currentPage > 1 ? 1 : 0)}
                  </Link>
                </li>
              )
              : (
                <li key={key + 1} style={{ backgroundColor: 'transparent', display: 'inline-block' }}>
                  <span
                    style={{ paddingRight: '1rem' }}
                  >
                    {page + currentPage - (currentPage > 1 ? 1 : 0)}
                  </span>
                </li>
              )
          ))
        }
        <li
          key={ArticleListPagination.pagesListSize + 1}
          style={{ backgroundColor: 'transparent', display: 'inline-block' }}
        >
          <Link style={{ paddingLeft: '1rem' }} className='ml-2' to={{ pathname: categoryBaseLink, search: `?q=${q || ''}&p=${currentPage + 1}` }}>
            Next
            <i style={{ verticalAlign: 'bottom' }} className='icon-lightest icon-inline material-icons'>
              keyboard_arrow_right
            </i>
          </Link>
        </li>
      </ul>
    );
  }
}

export default withRouter(ArticleListPagination);
