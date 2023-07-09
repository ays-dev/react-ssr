import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Navbar from 'reactstrap/lib/Navbar';
import NavbarBrand from 'reactstrap/lib/NavbarBrand';
import Nav from 'reactstrap/lib/Nav';
import NavItem from 'reactstrap/lib/NavItem';
import NavLink from 'reactstrap/lib/NavLink';

import { SearchBar } from '.';

class Header extends Component {
  render() {
    const { user } = this.props;

    return (
      <div>
        <div>
          <Navbar
            color='white'
            className='p-3'
            light
            fixed='top'
            style={{
              borderBottom: '1px solid #e6ecf0',
              boxShadow: '0 1px 3px 0 rgba(0,0,0,0.25)'
            }}
          >
            <NavbarBrand tag={Link} to='/'>
              <span style={{
                border: '1px solid #DDD',
                backgroundColor: '#007bff',
                padding: '0.5rem 0.2rem',
                borderRadius: '5px'
              }}
              >
                <span style={{
                  border: '1px solid #DDD',
                  backgroundColor: 'white',
                  padding: '0.3rem',
                  borderRadius: '5px',
                  color: '#007bff'
                }}
                >
                  <b>Cn</b>
                </span>
              </span>
            </NavbarBrand>
            <SearchBar />
            {!user
              ? (
                <Nav>
                  <NavItem>
                    <NavLink tag={Link} className='text-primary' to='/login'>Log in</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} className='text-primary' to='/register'>Register</NavLink>
                  </NavItem>
                </Nav>
              )
              : (
                <Nav>
                  <NavItem>
                    <NavLink tag={Link} className='text-primary' to='/account'>
                      <b className='pl-3'>{user.username}</b>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} className='text-primary' to='/logout'>
                      Logout
                    </NavLink>
                  </NavItem>
                </Nav>
              )}
          </Navbar>
        </div>
        <div>
          <Navbar
            color='white'
            className='p-3'
            light
          >
            <NavbarBrand tag={Link} to='/'>
              <span style={{
                border: '1px solid #DDD',
                backgroundColor: '#007bff',
                padding: '0.5rem 0.2rem',
                borderRadius: '5px'
              }}
              >
                <span style={{
                  border: '1px solid #DDD',
                  backgroundColor: 'white',
                  padding: '0.3rem',
                  borderRadius: '5px',
                  color: '#007bff'
                }}
                >
                  <b>Cn</b>
                </span>
              </span>
            </NavbarBrand>
            <SearchBar />
            {!user
              ? (
                <Nav>
                  <NavItem>
                    <NavLink tag={Link} className='text-primary' to='/login'>Log in</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} className='text-primary' to='/register'>Register</NavLink>
                  </NavItem>
                </Nav>
              )
              : (
                <Nav>
                  <NavItem>
                    <NavLink tag={Link} className='text-primary' to='/account'>
                      <b className='pl-3'>{user.username}</b>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} className='text-primary' to='/logout'>
                      Logout
                    </NavLink>
                  </NavItem>
                </Nav>
              )}
          </Navbar>
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  user: state.user.data
}))(Header);
