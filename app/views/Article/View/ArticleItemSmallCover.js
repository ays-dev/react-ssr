// todo: delete
import React, { Component } from 'react';
import cx from 'classnames';
import Media from 'reactstrap/lib/Media';
import { LazyImage } from 'react-lazy-images';
// import _ from 'lodash';
// import md5 from 'md5';

const patchwork = [
  { width: '100px', height: '144px' },
  { width: '60px', height: '70px' },
];

// https://commons.wikimedia.org/w/thumb.php?width=144&f=Fullmetal_Alchemist_Sacred_Star_of_Milos.png
class ArticleItemSmallCover extends Component {
  render() {
    const { category, images } = this.props;
    const arr = JSON.parse(images) || [];
    const image = arr.length ? encodeURIComponent(arr[0].replace(/ /g, '_')) : null;
    if (image) {
      arr.shift();
    }

    return (
      <Media left href='/' style={{ display: 'block' }}>
        <LazyImage
          src={`/cache/${image}.png`}
          alt="Buildings with tiled exteriors, lit by the sunset."
          placeholder={({ imageProps, ref }) => (
            <img
              ref={ref}
              className='mr-1'
              style={{
                ...patchwork[0],
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundColor: image ? '#EEE' : '#EEE'
              }}
              src='/img/pixel.gif'
              alt='Generic placeholder image'
            />
          )}
          error={() => (
            <img
              className='mr-1'
              style={{
                ...patchwork[0],
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundColor: image ? '#EEE' : '#EEE'
              }}
              src='/img/pixel.gif'
              alt='Generic placeholder image'
            />
          )}
          actual={({ imageProps }) =>
            <img
              className='mr-1'
              style={{
                ...patchwork[0],
                backgroundImage: 'url("' + `/cache/${image}` + '.png")',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundColor: image ? '#EEE' : '#EEE'
              }}
              src='/img/pixel.gif'
              alt='Generic placeholder image'
            />
          }
        />
      </Media>
    );
  }
}

export default ArticleItemSmallCover;
