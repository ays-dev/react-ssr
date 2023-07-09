import React, { Component } from 'react';

class LogoutPage extends Component {
  static loadContext() {
    return {
      status: 300,
      to: '/'
    };
  }

  static loadData(dispatch) {
    return Promise.all([
      fetch('/api/logout'),
      dispatch({ type: 'USER_SIGNED_OUT' })
    ]);
  }

  render() {
    return (
      <div>
        Log out. Please wait...
      </div>
    );
  }
}

export default LogoutPage;
