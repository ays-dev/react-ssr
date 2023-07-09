import React, { Component } from 'react';
import HeadTag from 'react-head';

import { Header, Footer } from '../Common';
import CategoryList from '../Common/CategoryList';

class NotFound extends Component {
  static loadContext() {
    return {
      status: 404
    };
  }

  static loadMeta() {
    return [
      <HeadTag tag='title'>404 - Page not found</HeadTag>,
      <HeadTag tag='meta' name='robots' content='noindex, nofollow' />
    ];
  }

  render() {
    return (
      <div className='Page'>
        <div className='Section'>
          <Header />
          <CategoryList />
          <h1>
            404 - Page not found
          </h1>
        </div>
        <Footer />
      </div>
    );
  }
}

export default NotFound;
