import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeadTag from 'react-head';
import { Link } from 'react-router-dom';

import Container from 'reactstrap/lib/Container';

import CategoryList from '../Common/CategoryList';
import { Header, Footer } from '../Common';

class AccountPage extends Component {
  static loadContext(getState) {
    const user = getState().user.data;

    if (!user) {
      return {
        status: 301,
        to: '/'
      };
    }
    return null;
  }

  static loadMeta(getState) {
    const { username } = getState().user.data || {};
    return [
      <HeadTag tag='title'>
        {`${username}'s account - YT`}
      </HeadTag>
    ];
  }

  render() {
    const { loading } = this.props;

    return (
      <div>
        <Header />
        <CategoryList />
        <Container>
          <div><Link to='/admin'>Admin</Link></div>
          <div><Link to='/'>General</Link></div>
          <div><Link to='/'>Privacy and login</Link></div>
        </Container>
        {
          !loading
          && <Footer />
        }
      </div>
    );
  }
}

export default connect(state => ({
  user: state.user.data
}))(AccountPage);
