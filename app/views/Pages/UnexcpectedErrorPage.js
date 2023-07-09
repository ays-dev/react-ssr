import React, { Component } from 'react';
import HeadTag from 'react-head';

class UnexcpectedError extends Component {
  static loadContext() {
    return {
      status: 500
    };
  }

  static loadMeta() {
    return [
      <HeadTag tag='title'>500 - Unexcpected error</HeadTag>,
      <HeadTag tag='meta' name='robots' content='noindex, nofollow' />
    ];
  }

  render() {
    return (
      <div>
        <h1>
          500 - Unexcpected error
        </h1>
      </div>
    );
  }
}

export default UnexcpectedError;
