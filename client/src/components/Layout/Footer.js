import React from "react";
// import { Link } from "react-router-dom";
import './App.css'
const Footer = () => {
  return (
    <>
    <footer class="site-footer">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <h6>Welcome to Shopify!</h6>
            <p class="text-justify">At EShop, we're passionate about bringing convenience, quality, and satisfaction to your online shopping experience. With a commitment to excellence and a focus on customer-centricity, we aim to be your go-to destination for all your shopping needs.</p>
          </div>
          <div class="col-xs-6 col-md-3" style={{marginLeft:"150px"}}>
            <h6>Quick Links</h6>
            <ul class="footer-links">
              <li><a href="http://localhost:3000/">About Us</a></li>
              <li><a href="http://localhost:3000/">Contact Us</a></li>
              <li><a href="http://localhost:3000/">Contribute</a></li>
              <li><a href="http://localhost:3000/">Privacy Policy</a></li>
              <li><a href="http://localhost:3000/">Sitemap</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-md-8 col-sm-6 col-xs-12">
            <p class="copyright-text">Copyright &copy; 2024
            </p>
          </div>
        </div>
      </div>
</footer>
    </>
  );
};

export default Footer;
