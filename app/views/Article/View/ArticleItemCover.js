// todo: delete
import React, { Component } from 'react';

import Media from 'reactstrap/lib/Media';

class ArticleItemCover extends Component {
  render() {
    const { article } = this.props;
    const images = JSON.parse(article.images);
    const image = article.images ? encodeURIComponent(images[0].replace(/ /g, '_')) : null;

    if (!image) {
      return (
        <Media className='mr-3' left target='_blank' href={'https://commons.wikimedia.org/wiki/File:' + image}>
          <Media
            object
            style={{
              width: '10rem',
              height: '15rem',
              backgroundImage: 'url("' + `/cache/${image}` + '.png")',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundColor: image ? '#EEE' : '#EEE'
            }}
            src='/img/pixel.gif'
            alt='Generic placeholder image'
          />
          <small className='d-block mt-2 ml-1 text-secondary'>Add image</small>
        </Media>
      );
    }

    return (
      <Media className='mr-3' left target='_blank' href={'https://commons.wikimedia.org/wiki/File:' + image}>
        <Media
          object
          style={{
            width: '10rem',
            height: '15rem',
            backgroundImage: 'url("' + `/cache/${image}` + '.png")',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundColor: image ? '#EEE' : '#EEE'
          }}
          src='/img/pixel.gif'
          alt='Generic placeholder image'
        />
        <small className='d-block mt-2 ml-1 text-secondary'>wikimedia.org</small>
      </Media>
    );
  }
}

export default ArticleItemCover;
