import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '#about' },
    { label: 'Loan Products', href: '#products' },
    { label: 'Apply Now', href: '#apply' },
    { label: 'Become Associate', href: '#associate' },
    { label: 'Knowledge Hub', href: '#knowledge' },
    { label: 'Track My Case', href: '#track' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <>
      {/* Top Info Bar */}
      {/* <div className="bg-primary text-white py-3">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-4">
            <div className="d-flex align-items-center gap-2">
              <span className="bi bi-telephone-fill"></span>
              <span>+91-98765-43210</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <span className="bi bi-envelope-fill"></span>
              <span>info@smepaisa.com</span>
            </div>
          </div>
          <div className="d-none d-md-flex align-items-center">
            <span>🏆 ₹500Cr+ Disbursed | 10,000+ Happy Clients</span>
          </div>
        </div>
      </div> */}

      {/* Main Header */}
      <header className="bg-white shadow-sm sticky-top">
        <div className="container-fluid px-3 py-2">
          <div className="d-flex align-items-center justify-content-between">
            {/* Logo */}
            <Link to="/" className="d-flex align-items-center text-decoration-none">
              <div className="text-orange fw-bold fs-4">SME PAISA</div>
              <div className="text-muted ms-2 fs-6">Fuel Your Growth</div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="d-none d-lg-flex align-items-center ms-3 flex-nowrap">
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="text-dark text-decoration-none me-3 hover-text-orange"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* CRM Login & Mobile Menu */}
            <div className="d-flex align-items-center gap-2">
              <div className="d-none d-md-flex align-items-center gap-2">
                <Link to="/login">
                  <button className="btn btn-outline-primary btn-sm">Login</button>
                </Link>
                <Link to="/register">
                  <button className="btn btn-orange btn-sm">Register</button>
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="btn p-1 d-lg-none text-dark"
              >
                <span className={isMenuOpen ? 'bi bi-x-lg' : 'bi bi-list'}></span>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="d-lg-none py-3 border-top">
              <nav className="d-flex flex-column gap-2">
                {menuItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="text-dark text-decoration-none px-3 py-2 rounded hover-bg-light"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <div className="px-3 pt-3 border-top d-flex gap-2">
                  <Link to="/login" className="flex-fill">
                    <button className="btn btn-outline-primary btn-sm w-100">Login</button>
                  </Link>
                  <Link to="/register" className="flex-fill">
                    <button className="btn btn-orange btn-sm w-100">Register</button>
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;