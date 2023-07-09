import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import Container from 'reactstrap/lib/Container';

class Footer extends Component {
  render() {
    return (
      <div className='Footer'>
        <Container className='Footer-table table' style={{ marginLeft: 'auto', marginRight: 'auto' }}>
          <Row>
            <Col xs={{ offset: '4', size: '4' }}>
              <ul style={{ listStyle: 'none', float: 'left' }} className='py-4'>
                <li className='pb-2'>
                  <Link to='/termsofuse'>Terms of use</Link>
                </li>
                <li className='pb-2'>
                  <Link to='/about'>About</Link>
                </li>
              </ul>
              <ul style={{ listStyle: 'none', float: 'right' }} className='py-4'>
                <li className='pb-2'>
                  <Link to='/privacypolicy'>Privacy</Link>
                </li>
                <li className='pb-2'>
                  <Link to='/contact'>Contact</Link>
                </li>
                <li className='pb-2'>
                  <small className='text-muted'>XXXXXXXXX © 2018</small>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Footer;
