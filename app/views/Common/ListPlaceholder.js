import React, { Component } from 'react';

import Media from 'reactstrap/lib/Media';
import Button from 'reactstrap/lib/Button';

class ListPlaceholder extends Component {
  render() {
    return (
      <div className='mt-5'>
        <div>
          <div>
            <div className='placeholder' />
          </div>
          <div className='mb-4 pb-3 mt-3'>
            <span>
              <Button
                className='mr-3'
                color='primary'
                size='sm'
                disabled
              >
                <b>&nbsp;</b>
              </Button>
            </span>
          </div>
        </div>
        {[...Array(10)].map((val, key) => (
          <Media className='my-3' key={key}>
            <Media left href='/'>
              <Media className='mr-3' style={{ width: '100px', height: '144px', backgroundColor: '#EEE' }} object src='/img/pixel.gif' alt='Generic placeholder image' />
            </Media>
            <Media body>
              <Media heading className='placeholder' />
            </Media>
          </Media>
        ))}
      </div>
    );
  }
}

export default ListPlaceholder;
