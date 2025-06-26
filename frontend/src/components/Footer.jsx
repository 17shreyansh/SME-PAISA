import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-section bg-white text-dark pt-5 border-top">
      <div className="container">
        <div className="row">

          {/* Company Info */}
          <div className="col-12 col-md-3 mb-4">
            <h5 className="text-primary fw-semibold mb-3">SME PAISA</h5>
            <p className="small text-muted">
              Empowering MSMEs with fast, secure, and affordable financing solutions.
            </p>
            <div className="d-flex gap-3">
              <Link to="#"><i className="bi bi-facebook fs-5 text-muted"></i></Link>
              <Link to="#"><i className="bi bi-twitter fs-5 text-muted"></i></Link>
              <Link to="#"><i className="bi bi-linkedin fs-5 text-muted"></i></Link>
              <Link to="#"><i className="bi bi-instagram fs-5 text-muted"></i></Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-12 col-md-3 mb-4">
            <h6 className="text-dark fw-semibold mb-3">Quick Links</h6>
            <ul className="list-unstyled small">
              {['About Us', 'Loan Products', 'Apply Now', 'Partner with Us', 'Knowledge Hub', 'Contact Us'].map((link) => (
                <li key={link}><Link to="#" className="text-muted text-decoration-none">{link}</Link></li>
              ))}
            </ul>
          </div>

          {/* Loan Products */}
          <div className="col-12 col-md-3 mb-4">
            <h6 className="text-dark fw-semibold mb-3">Loan Products</h6>
            <ul className="list-unstyled small">
              {['Working Capital', 'Vyapar+ Loans', 'CGTMSE Loans', 'Term Loans', 'Corporate Finance', 'Equipment Finance'].map((product) => (
                <li key={product}><Link to="#" className="text-muted text-decoration-none">{product}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-12 col-md-3 mb-4">
            <h6 className="text-dark fw-semibold mb-3">Contact Info</h6>
            <p className="small mb-2"><i className="bi bi-telephone-fill text-primary me-2"></i>+91 98765 43210</p>
            <p className="small mb-2"><i className="bi bi-envelope-fill text-primary me-2"></i>info@smepaisa.com</p>
            <p className="small"><i className="bi bi-geo-alt-fill text-primary me-2"></i>123 Business Tower, Mumbai, MH</p>
          </div>
        </div>

        <hr />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center py-3">
          <p className="text-muted mb-2 mb-md-0 small">© 2024 SME PAISA. All rights reserved.</p>
          <div className="d-flex gap-3">
            <Link to="#" className="text-muted small text-decoration-none">Privacy Policy</Link>
            <Link to="#" className="text-muted small text-decoration-none">Terms of Service</Link>
            <Link to="#" className="text-muted small text-decoration-none">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
