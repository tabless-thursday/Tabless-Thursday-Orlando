import React, { Component } from 'react'
import GetUpdate from './GetUpdate/GetUpdate'
import FooterLinks from './FooterLinks/FooterLinks';

import './Footer.scss';

class Footer extends Component {
  render() {
    return (
      <footer className="Footer">
          <GetUpdate />
          <hr />
          <FooterLinks />
          <p className="Copyright">&copy;Tabless Thursday 2018. All rights reserved. Made in The United States of America</p>
      </footer>
    )
  }
}

export default Footer;
