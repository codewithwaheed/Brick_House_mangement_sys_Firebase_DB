import React, { Component } from "react";
import logo from "../2.png";

class Footer extends Component {
  render() {
    return (
      <div className="container-fluid footer font-xsa2l">
        <div className="row justify-content-center mt-5">
          <img src={logo} alt="#" className="logo mt-5"></img>
        </div>
        <div className="row mt-5 contactFooter">
          <div className="col-xs-2 col-md-2"></div>
          <div className=" col-xs-2 col-md-2 footerAdjust ">
            <ul className="list-unstyled">
              <li>HOME</li>
              <li>ABOUT US</li>
              <li>FAQ</li>
                          <li>BRAND INFORMATION</li>
              <li>GLOBAL CATALOGUE</li>
            </ul>
          </div>
          <div className="col-xs-2 col-md-2 footerAdjust oddF">
            <ul className="list-unstyled">
              <li>LOGIN</li>
              <li>SIGN UP</li>
              <li>STORES</li>
              <li>BRAND</li>
            </ul>
          </div>
          <div className=" col-xs-2 col-md-2 footerAdjust">
            <p>NEWSLETTER SIGN UP</p>
            <input className="emailI" placeholder="Enter your e-mail"></input>
            <button className="emailB mb-2">Send</button>
          </div>
          <div className=" col-xs-2 col-md-2  footerAdjust oddF">
            <p >FOLLOW US</p>
            <div className="mb-5 ">
              <i class="fab fa-facebook fa-2x mr-3"></i>
              <i class="fab fa-instagram fa-2x mr-3"></i>
              <i class="fab fa-twitter fa-2x mr-3"></i>
              <i class="fab fa-youtube fa-2x mr-3"></i>
            </div>
            <div>
              <i class="fab fa-cc-amex fa-2x mr-3"></i>
              <i class="fab fa-cc-discover fa-2x mr-3"></i>
              <i class="fab fa-cc-mastercard fa-2x mr-3"></i>
              <i class="fab fa-cc-visa fa-2x mr-3"></i>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
        <hr></hr>
        <div className="row mt-2">
          <div className="col-md-2 mb-3"></div>
          <div className="col-md-2 mb-3">Privacy Policy</div>
          <div className="col-md-2 mb-3">Cookies</div>
          <div className="col-md-2 mb-3">Terms and Conditions</div>
          <div className="col-md-2 mb-3">
            Copyright <i class="fas fa-copyright"></i> Name
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
