import React, { Component } from 'react';

class ArticleItemSmallDescription extends Component {
  render() {
    const { description } = this.props;

    if (!description) {
      return null;
    }

    return (
      <div>
        {description}
      </div>
    );
  }
}

export default ArticleItemSmallDescription;
