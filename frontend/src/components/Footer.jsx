import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-start py-4 w-100 footer-bottom">
      <div className="container-fluid">
        <div className="row">
          {/* Company Info */}
          <div className="col-12 col-md-3 mb-4 mb-md-0">
            <h3 className="text-warning mb-3">SME PAISA</h3>
            <p className="text-white text-start">
              Empowering MSMEs with fast, secure, and affordable financing solutions. Your trusted partner for business growth.
            </p>
            <div className="d-flex gap-2">
              <a href="#" className="text-white"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-white"><i className="bi bi-twitter"></i></a>
              <a href="#" className="text-white"><i className="bi bi-linkedin"></i></a>
              <a href="#" className="text-white"><i className="bi bi-instagram"></i></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-12 col-md-3 mb-4 mb-md-0">
            <h4 className="text-white mb-3">Quick Links</h4>
            <ul className="list-unstyled">
              {['About Us', 'Loan Products', 'Apply Now', 'Partner with Us', 'Knowledge Hub', 'Contact Us'].map((link) => (
                <li key={link}><a href="#" className="text-white text-decoration-none text-start">{link}</a></li>
              ))}
            </ul>
          </div>

          {/* Loan Products */}
          <div className="col-12 col-md-3 mb-4 mb-md-0">
            <h4 className="text-white mb-3">Loan Products</h4>
            <ul className="list-unstyled">
              {['Working Capital', 'Vyapar+ Loans', 'CGTMSE Loans', 'Term Loans', 'Corporate Finance', 'Equipment Finance'].map((product) => (
                <li key={product}><a href="#" className="text-white text-decoration-none text-start">{product}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-12 col-md-3">
            <h4 className="text-white mb-3">Contact Info</h4>
            <div>
              <p className="mb-1"><i className="bi bi-telephone-fill text-warning me-2"></i><a href="tel:+919876543210" className="text-white text-decoration-none text-start">+91 98765 43210</a><br /><small className="text-white">Mon-Sat, 9AM-7PM</small></p>
              <p className="mb-1"><i className="bi bi-envelope-fill text-warning me-2"></i><a href="mailto:info@smepaisa.com" className="text-white text-decoration-none text-start">info@smepaisa.com</a><br /><small className="text-white">24/7 Support</small></p>
              <p><i className="bi bi-geo-alt-fill text-warning me-2"></i><span className="text-white text-start">123 Business Tower,<br />Mumbai, Maharashtra 400001</span></p>
            </div>
          </div>
        </div>

        <hr className="bg-light my-4" />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
          <p className="text-white mb-0 text-start">© 2024 SME PAISA. All rights reserved.</p>
          <div className="d-flex gap-3">
            <a href="#" className="text-white text-decoration-none text-start">Privacy Policy</a>
            <a href="#" className="text-white text-decoration-none text-start">Terms of Service</a>
            <a href="#" className="text-white text-decoration-none text-start">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;