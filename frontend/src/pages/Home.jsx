import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import { Clock, ShieldCheck, Users, TrendingUp, Shield, CreditCard, Check, ArrowRight, Star } from 'lucide-react';

const Home = () => {
  return (
    <div className="home-wrapper bg-white text-black">
      {/* Hero Section */}
      <section className="hero-section py-5">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-md-6">
              <h1 className="display-4 fw-bold mb-4">Ready to Grow Your <span>Business?</span></h1>
              <p className="lead mb-4">
                Get instant access to working capital, term loans, and business financing. Join 10,000+ MSMEs who trust SME PAISA.
              </p>
              <div className="mb-4">
                {[
                  { icon: Clock, text: "Quick Response - Get callback within 2 hours" },
                  { icon: ShieldCheck, text: "No Spam Promise - We respect your privacy" },
                  { icon: Users, text: "Expert Guidance - Dedicated relationship manager" }
                ].map((item, i) => (
                  <div className="d-flex align-items-center gap-2 mb-2" key={i}>
                    <item.icon size={20} />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
              <div className="d-flex flex-column flex-sm-row gap-3">
                <Link to="/apply" className="btn btn-dark-custom px-4 py-2 fw-semibold text-white">Apply for Loan</Link>
                <Link to="/associate" className="btn btn-dark-custom px-4 py-2 fw-semibold text-white">Become Associate</Link>
              </div>
            </div>
            <div className="col-md-6">
              <div className="p-4 shadow-sm rounded form-box bg-white">
                <h3 className="h5 fw-bold mb-3 text-center">Get Your Free Quote</h3>
                <form>
                  <div className="row g-3">
                    <div className="col-md-6"><input type="text" className="form-control" placeholder="Full Name *" /></div>
                    <div className="col-md-6"><input type="tel" className="form-control" placeholder="Phone Number *" /></div>
                    <div className="col-12"><input type="email" className="form-control" placeholder="Email Address *" /></div>
                    <div className="col-12"><input type="text" className="form-control" placeholder="Business Name *" /></div>
                    <div className="col-md-6">
                      <select className="form-select">
                        <option value="">Select Loan Type *</option>
                        <option>Working Capital</option>
                        <option>CGTMSE Loans</option>
                        <option>Vyapar+ Takeover</option>
                        <option>Term Loans</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <select className="form-select">
                        <option value="">Loan Amount *</option>
                        <option>₹5L - ₹10L</option>
                        <option>₹10L - ₹25L</option>
                        <option>₹25L - ₹50L</option>
                        <option>₹50L - ₹1Cr</option>
                        <option>₹1Cr+</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn btn-dark-custom w-100 d-flex justify-content-center align-items-center">
                        Get Free Quote <ArrowRight size={16} className="ms-2" />
                      </button>
                    </div>
                  </div>
                  <p className="small text-center mt-3 text-muted">By submitting, you agree to our Terms and Privacy Policy</p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="h4 fw-bold mb-2">Our Services</h2>
            <p className="text-muted">Financial solutions tailored for MSMEs</p>
          </div>
          <div className="row g-4">
            {[TrendingUp, Shield, CreditCard].map((Icon, idx) => (
              <div className="col-md-4" key={idx}>
                <div className="card border-0 p-4 rounded h-100 service-box">
                  <Icon size={24} className="mb-3" />
                  <h5 className="fw-bold">Service {idx + 1}</h5>
                  <p className="text-muted">Description of the loan service goes here briefly.</p>
                  <ul className="list-unstyled mt-3">
                    <li className="d-flex align-items-center gap-2">
                      <Check size={16} />
                      <span className="small text-muted">Feature example</span>
                    </li>
                  </ul>
                  <button className="btn btn-dark-custom w-100 mt-3">Apply Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-5 bg-dark text-white">
        <div className="container">
          <div className="row text-center">
            {['₹500Cr+', '10,000+', '50+', '24Hrs'].map((value, idx) => (
              <div className="col-6 col-md-3 mb-4" key={idx}>
                <h3 className="fw-bold">{value}</h3>
                <p className="small text-white">Stat {idx + 1}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="h4 fw-bold">What Our Clients Say</h2>
            <p className="text-muted">Hear from our MSME partners</p>
          </div>
          <div className="row g-4">
            {['Rajesh', 'Priya', 'Ali'].map((name, idx) => (
              <div className="col-md-4" key={idx}>
                <div className="card p-4 h-100 border-0 rounded testimonial-box">
                  <div className="d-flex gap-1 mb-2">
                    {Array(5).fill(0).map((_, i) => <Star key={i} size={16} fill="#000" className="text-black" />)}
                  </div>
                  <p className="text-muted fst-italic mb-3">"{name}'s testimonial about SME PAISA."</p>
                  <div>
                    <h6 className="mb-0 text-black">{name}</h6>
                    <p className="small text-muted">Client Company</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
