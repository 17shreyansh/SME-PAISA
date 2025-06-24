import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import { Clock, ShieldCheck, Users, TrendingUp, Shield, CreditCard, Check, ArrowRight, Star } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Hero Section */}
      <section className="hero-section py-5 py-lg-7 bg-gradient-dark text-white position-relative">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-md-6 animate-fade-in">
              <h1 className="display-4 fw-bold mb-4">
                Ready to Grow Your <span className="gradient-text">Business?</span>
              </h1>
              <p className="lead text-light mb-4">
                Get instant access to working capital, term loans, and business financing solutions. Join 10,000+ MSMEs who trust SME PAISA for their growth journey.
              </p>
              <div className="d-flex flex-column gap-3 mb-5">
                <div className="d-flex align-items-center gap-2">
                  <div className="icon-circle bg-white bg-opacity-25 rounded-circle p-2">
                    <Clock size={20} className="text-black" />
                  </div>
                  <span>Quick Response - Get callback within 2 hours</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <div className="icon-circle bg-white bg-opacity-25 rounded-circle p-2">
                    <ShieldCheck size={20} className="text-black" />
                  </div>
                  <span>No Spam Promise - We respect your privacy</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <div className="icon-circle bg-white bg-opacity-25 rounded-circle p-2">
                    <Users size={20} className="text-black" />
                  </div>
                  <span>Expert Guidance - Dedicated relationship manager</span>
                </div>
              </div>
              <div className="d-flex flex-column flex-sm-row gap-3">
                {/* Main CTA Buttons - Use Bootstrap and custom class for black button */}
                <Link to="/apply" className="btn btn-black btn-lg px-5 py-3 fw-semibold text-white btn-black-custom">
                  Apply for Loan
                </Link>
                <Link to="/associate" className="btn btn-black btn-lg px-5 py-3 fw-semibold text-white btn-black-custom">
                  Become Associate
                </Link>
              </div>
            </div>
            <div className="col-md-6 animate-fade-in">
              <div className="card border-0 shadow-sm rounded-3 p-4 p-lg-5 bg-white bg-opacity-95 glassmorphism">
                <h3 className="h4 fw-bold mb-4 text-dark text-center">Get Your Free Quote</h3>
                <div id="quoteForm">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <input type="text" className="form-control" placeholder="Full Name *" required />
                    </div>
                    <div className="col-md-6">
                      <input type="tel" className="form-control" placeholder="Phone Number *" required />
                    </div>
                    <div className="col-12">
                      <input type="email" className="form-control" placeholder="Email Address *" required />
                    </div>
                    <div className="col-12">
                      <input type="text" className="form-control" placeholder="Business Name *" required />
                    </div>
                    <div className="col-md-6">
                      <select className="form-select" required>
                        <option value="">Select Loan Type *</option>
                        <option value="working-capital">Working Capital</option>
                        <option value="cgtmse">CGTMSE Loans</option>
                        <option value="vyapar">Vyapar+ Takeover</option>
                        <option value="term-loan">Term Loans</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <select className="form-select" required>
                        <option value="">Loan Amount Required *</option>
                        <option value="5-10">₹5L - ₹10L</option>
                        <option value="10-25">₹10L - ₹25L</option>
                        <option value="25-50">₹25L - ₹50L</option>
                        <option value="50-100">₹50L - ₹1Cr</option>
                        <option value="100+">₹1Cr+</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn btn-dark w-100 py-3 d-flex align-items-center justify-content-center">
                        Get Free Quote
                        <ArrowRight size={16} className="ms-2" />
                      </button>
                    </div>
                  </div>
                  <p className="text-muted small text-center mt-3">
                    By submitting this form, you agree to our Terms & Conditions and Privacy Policy
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section py-5 py-lg-6 bg-light">
        <div className="container">
          <div className="text-center mb-5 animate-fade-in">
            <h2 className="h3 fw-bold mb-3 text-dark">
              Our <span className="gradient-text">Services</span> Snapshot
            </h2>
            <p className="lead text-muted">
              Comprehensive financial solutions tailored for MSMEs at every growth stage
            </p>
          </div>
          <div className="row g-4">
            {[
              {
                icon: TrendingUp,
                title: 'Working Capital Loans',
                desc: 'OD, CC, Invoice Discounting, Bill Discounting',
                details: [
                  { label: 'Loan Amount', value: '₹10L - ₹2Cr', class: 'text-primary' },
                  { label: 'Interest Rate', value: '12% onwards', class: 'text-success' },
                  { label: 'Tenure', value: '12-36 months' },
                  { label: 'Processing Time', value: '24-48 hours', class: 'text-success' },
                ],
                features: ['Quick approval', 'Minimal documentation', 'Flexible repayment', 'No prepayment charges'],
              },
              {
                icon: Shield,
                title: 'CGTMSE Loans',
                desc: 'Government-backed collateral-free loans for MSMEs',
                details: [
                  { label: 'Loan Amount', value: 'Up to ₹2Cr', class: 'text-primary' },
                  { label: 'Interest Rate', value: '10% onwards', class: 'text-success' },
                  { label: 'Tenure', value: '36-84 months' },
                  { label: 'Processing Time', value: '7-10 days', class: 'text-success' },
                ],
                features: ['Government backed', 'No collateral', 'Lower interest rates', 'Higher approval rates'],
              },
              {
                icon: CreditCard,
                title: 'Vyapar+ (Loan Takeover)',
                desc: 'Better Rates & Enhanced Limits',
                details: [
                  { label: 'Loan Amount', value: '₹5L - ₹50L', class: 'text-primary' },
                  { label: 'Interest Rate', value: '14% onwards', class: 'text-success' },
                  { label: 'Tenure', value: '6-24 months' },
                  { label: 'Processing Time', value: 'Same day', class: 'text-success' },
                ],
                features: ['Better rates', 'Enhanced limits', 'Same day approval', 'Digital process'],
              },
            ].map((service, index) => (
              <div className="col-lg-4 col-md-6 animate-fade-in" key={index}>
                <div className="card h-100 border-0 shadow-sm rounded-3 p-4 service-card">
                  <div className="icon-circle bg-gradient-primary rounded-circle d-flex align-items-center justify-content-center mb-4">
                    <service.icon size={24} className="text-white" />
                  </div>
                  <h3 className="h5 fw-bold mb-3 text-dark">{service.title}</h3>
                  <p className="text-muted mb-4">{service.desc}</p>
                  <div className="row g-2 mb-4">
                    {service.details.map((detail, i) => (
                      <div className="col-6" key={i}>
                        <span className="small text-muted d-block">{detail.label}</span>
                        <span className={`small fw-semibold ${detail.class || ''}`}>{detail.value}</span>
                      </div>
                    ))}
                  </div>
                  <ul className="list-unstyled d-flex flex-column gap-2 mb-4">
                    {service.features.map((feature, i) => (
                      <li key={i} className="d-flex align-items-center gap-2">
                        <Check size={16} className="text-success" />
                        <span className="small text-muted">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="btn btn-dark w-100 py-2">Apply Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section py-5 py-lg-6 bg-gradient-dark text-white">
        <div className="container">
          <div className="row text-center g-4">
            {[
              { value: '₹500Cr+', label: 'Disbursed' },
              { value: '10,000+', label: 'Happy Clients' },
              { value: '50+', label: 'Bank Partners' },
              { value: '24Hrs', label: 'Quick Approval' },
            ].map((stat, index) => (
              <div className="col-md-3 animate-fade-in" key={index}>
                <h3 className="h2 fw-bold mb-2 gradient-text">{stat.value}</h3>
                <p className="text-light">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section py-5 py-lg-6">
        <div className="container">
          <div className="text-center mb-5 animate-fade-in">
            <h2 className="h3 fw-bold mb-3 text-dark">
              What Our <span className="gradient-text">Clients Say</span>
            </h2>
            <p className="lead text-muted">
              Don't just take our word for it. Here's what businesses and associates say about their experience with SME PAISA
            </p>
          </div>
          <div className="row g-4">
            {[
              {
                text: 'SME PAISA helped us get ₹25 lakhs working capital in just 48 hours. Their process is incredibly smooth and transparent.',
                author: 'Rajesh Kumar',
                company: 'Kumar Textiles, Mumbai',
                initials: 'RK',
              },
              {
                text: 'The CGTMSE loan process was seamless. Got ₹50 lakhs without any collateral. Highly recommend their services.',
                author: 'Priya Sharma',
                company: 'Sharma Electronics, Delhi',
                initials: 'PS',
              },
              {
                text: "As an associate, I've earned over ₹2 lakhs in commissions. The MLM structure is transparent and rewarding.",
                author: 'Mohammad Ali',
                company: 'Ali Trading Co., Bangalore',
                initials: 'MA',
              },
            ].map((testimonial, index) => (
              <div className="col-lg-4 col-md-6 animate-fade-in" key={index}>
                <div className="card h-100 border-0 shadow-sm rounded-3 p-4 testimonial-card">
                  <div className="d-flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="text-warning" fill="#fbbf24" />
                    ))}
                  </div>
                  <p className="text-muted mb-4 italic">"{testimonial.text}"</p>
                  <div className="d-flex align-items-center gap-3">
                    <div className="author-avatar bg-gradient-primary rounded-circle d-flex align-items-center justify-content-center text-white fw-bold">
                      {testimonial.initials}
                    </div>
                    <div>
                      <h4 className="small fw-semibold text-dark mb-1">{testimonial.author}</h4>
                      <p className="small text-muted">{testimonial.company}</p>
                    </div>
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