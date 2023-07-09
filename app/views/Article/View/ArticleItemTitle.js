import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Media from 'reactstrap/lib/Media';

class ArticleItemTitle extends Component {
  render() {
    const { title } = this.props;

    if (!title) {
      return null;
    }

    return (
      <Media heading tag='h1' className='mt-1 mb-0 pb-0'>
        <Link to='#'>
          {title}
        </Link>
      </Media>
    );
  }
}

export default ArticleItemTitle;
