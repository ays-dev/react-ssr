import React, { Component } from 'react';
import Container from 'reactstrap/lib/Container';

import { Header, Footer } from '../Common';

class PrivacyPage extends Component {
  render() {
    return (
      <div>
        <div>
          <Header />
          <Container>
            <div>
              <h1>Welcome to our Privacy Policy</h1>
              <h3>Your privacy is critically important to us.</h3>
              <p>This Privacy Policy, together with the Terms and conditions posted on our Website, set forth the general rules and policies governing your use of our Website. Depending on your activities when visiting our Website, you may be required to agree to additional terms and conditions.</p>
              <h2>Website Visitors</h2>
              <h2>Gathering of Personally-Identifying Information</h2>
              <h2>Security</h2>
              <p>The security of your Personal Information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.</p>
              <h2>Advertisements</h2>
              <h2>Links To External Sites</h2>
              <p>Our Service may contain links to external sites that are not operated by us. If you click on a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy and terms and conditions of every site you visit.</p>
              <p>We have no control over, and assume no responsibility for the content, privacy policies or practices of any third party sites, products or services.</p>
              <h2>Protection of Certain Personally-Identifying Information</h2>
              <h2>Aggregated Statistics</h2>
              <h2>Affiliate Disclosure</h2>
              <p>This site uses affiliate links and does earn a commission from certain links. This does not affect your purchases or the price you may pay.</p>
              <h2>Cookies</h2>
              <h2>E-commerce</h2>
              <h2>Business Transfers</h2>
              <h2>Privacy Policy Changes</h2>
            </div>
          </Container>
        </div>
        <Footer />
      </div>
    );
  }
}

export default PrivacyPage;
