import React, { Component } from 'react';

import Container from 'reactstrap/lib/Container';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';

class Debug extends Component {
  render() {
    return (
      <div className={`debug${this.props.lines ? ' debug-lines' : ''}${this.props.indicators ? ' debug-indicators' : ''}`}>
        {this.props.indicators && (
          <div style={{
            backgroundColor: this.props.fetching ? 'red' : 'lightgreen',
            position: 'absolute',
            zIndex: 1051,
            top: '85px',
            left: '25px'
          }}
          >
            {this.props.fetching ? 'Slow query (>500ms)' : 'Fast query'}
          </div>
        )}
        {
          this.props.columns
          &&
        <div style={{
          position: 'absolute',
          zIndex: 1052,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
        >
          <Container style={{
            height: '100%'
          }}>
            <Row className='bg-faded' style={{
              height: '100%'
            }}>
              <Col xs='1' className='column-debug'>
                1
              </Col>
              <Col xs='1' className='column-debug'>
                2
              </Col>
              <Col xs='1' className='column-debug'>
                3
              </Col>
              <Col xs='1' className='column-debug'>
                4
              </Col>
              <Col xs='1' className='column-debug'>
                5
              </Col>
              <Col xs='1' className='column-debug'>
                6
              </Col>
              <Col xs='1' className='column-debug'>
                7
              </Col>
              <Col xs='1' className='column-debug'>
                8
              </Col>
              <Col xs='1' className='column-debug'>
                9
              </Col>
              <Col xs='1' className='column-debug'>
                10
              </Col>
              <Col xs='1' className='column-debug'>
                11
              </Col>
              <Col xs='1' className='column-debug'>
                12
              </Col>
            </Row>
          </Container>
        </div>

        }
      </div>
    );
  }
}

export default Debug;
