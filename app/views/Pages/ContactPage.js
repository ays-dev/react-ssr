import React, { Component } from 'react';
import Container from 'reactstrap/lib/Container';

import { Header, Footer } from '../Common';
import CategoryList from '../Common/CategoryList';

class TosPage extends Component {
  render() {
    return (
      <div className='Page'>
        <div className='Section'>
          <Header />
          <CategoryList />
          <Container>
            <div>
              Contact us
            </div>
          </Container>
        </div>
        <Footer />
      </div>
    );
  }
}

export default TosPage;
