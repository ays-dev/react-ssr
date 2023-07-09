// todo: delete
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Media from 'reactstrap/lib/Media';

class ArticleItemSmallTitle extends Component {
  render() {
    const { title, slug } = this.props;

    if (!title) {
      return null;
    }

    return (
      <Media heading className='mb-1'>
        <Link to={`/pages/${slug}`}>
          {title}
        </Link>
      </Media>
    );
  }
}

export default ArticleItemSmallTitle;
