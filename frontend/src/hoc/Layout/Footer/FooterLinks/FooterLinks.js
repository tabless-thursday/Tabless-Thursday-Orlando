import React from 'react'

import './FooterLinks.scss';

const FooterLinks = (props) => {
  return (
    <div className="FooterLinkContainer">
        <div className="FooterLink__Spacer"></div>
        <address>
            <h3>ADDRESS</h3>
            <p>Tapless Thursday</p>
            <p>United States of America</p>
            <br/>
            <p>+9898989898</p>
        </address>
        <div className="Company">
            <h3>COMPANY</h3>
            <p>Authenticate</p>
            <p>Create Tab</p>
            <p>My Tabs</p>
            <p>Privacy Policy</p>
            <p>Terms &amp; Conditions</p>
        </div>
        <div className="Contact">
            <h3>CONTACT</h3>
            <p>supports@tabless.thrusday</p>
            <div>
                <span>facebook</span>
                <span>twitter</span>
                <span>github</span>
                <span>youtube</span>
            </div>
        </div>
    </div>
  )
}

export default FooterLinks;
