import React, { Component } from 'react';

class CookieBanner extends Component {
  render() {
    return (
      <div
        className='py-2 px-3'
        style={{
          position: 'fixed',
          bottom: '0',
          left: '0',
          right: '0',
          backgroundColor: 'white',
          borderTop: '1px solid rgba(0, 0, 0, 0.1)'
        }}
      >Cookie banned</div>
    );
  }
}

export default CookieBanner;
