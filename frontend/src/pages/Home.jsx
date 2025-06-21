import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

const Home = () => {
  return (
    <div className='home-container'>
      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="container">
          <div className="hero-content row align-items-center">
            <div className="hero-text col-md-6 animate-in">
              <h1>
                Ready to Grow Your <span className="gradient-text">Business?</span>
              </h1>
              <p>
                Get instant access to working capital, term loans, and business financing solutions. Join 10,000+ MSMEs who trust SME PAISA for their growth journey.
              </p>
              <div className="hero-features">
                <div className="feature-item">
                  <div className="feature-icon">
                    <i data-lucide="clock" width="20" height="20"></i>
                  </div>
                  <span>Quick Response - Get callback within 2 hours</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <i data-lucide="shield-check" width="20" height="20"></i>
                  </div>
                  <span>No Spam Promise - We respect your privacy</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <i data-lucide="users" width="20" height="20"></i>
                  </div>
                  <span>Expert Guidance - Dedicated relationship manager</span>
                </div>
              </div>
              <div className="d-flex gap-3 flex-wrap">
                <a href="#apply" className="btn btn-primary">
                  Apply for Loan
                </a>
                <a href="#associate" className="btn btn-secondary">
                  Become Associate
                </a>
              </div>
            </div>
            <div className="quote-form glassmorphism col-md-6 animate-in">
              <h3>Get Your Free Quote</h3>
              <div id="quoteForm">
                <div className="row">
                  <div className="form-group col-md-6">
                    <input type="text" className="form-control" placeholder="Full Name *" required />
                  </div>
                  <div className="form-group col-md-6">
                    <input type="tel" className="form-control" placeholder="Phone Number *" required />
                  </div>
                </div>
                <div className="form-group">
                  <input type="email" className="form-control" placeholder="Email Address *" required />
                </div>
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Business Name *" required />
                </div>
                <div className="row">
                  <div className="form-group col-md-6">
                    <select className="form-control" required>
                      <option value="">Select Loan Type *</option>
                      <option value="working-capital">Working Capital</option>
                      <option value="cgtmse">CGTMSE Loans</option>
                      <option value="vyapar">Vyapar+ Takeover</option>
                      <option value="term-loan">Term Loans</option>
                    </select>
                  </div>
                  <div className="form-group col-md-6">
                    <select className="form-control" required>
                      <option value="">Loan Amount Required *</option>
                      <option value="5-10">₹5L - ₹10L</option>
                      <option value="10-25">₹10L - ₹25L</option>
                      <option value="25-50">₹25L - ₹50L</option>
                      <option value="50-100">₹50L - ₹1Cr</option>
                      <option value="100+">₹1Cr+</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Get Free Quote
                  <i data-lucide="arrow-right" width="16" height="16"></i>
                </button>
              </div>
              <p className="disclaimer">
                By submitting this form, you agree to our Terms & Conditions and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services" id="services">
        <div className="container">
          <div className="section-header animate-in text-center">
            <h2>
              Our <span className="highlight">Services</span> Snapshot
            </h2>
            <p>Comprehensive financial solutions tailored for MSMEs at every growth stage</p>
          </div>
          <div className="row">
            {[
              {
                icon: 'trending-up',
                title: 'Working Capital Loans',
                desc: 'OD, CC, Invoice Discounting, Bill Discounting',
                details: [
                  { label: 'Loan Amount', value: '₹10L - ₹2Cr', class: 'amount' },
                  { label: 'Interest Rate', value: '12% onwards', class: 'rate' },
                  { label: 'Tenure', value: '12-36 months' },
                  { label: 'Processing Time', value: '24-48 hours', class: 'rate' },
                ],
                features: ['Quick approval', 'Minimal documentation', 'Flexible repayment', 'No prepayment charges'],
              },
              {
                icon: 'shield',
                title: 'CGTMSE Loans',
                desc: 'Government-backed collateral-free loans for MSMEs',
                details: [
                  { label: 'Loan Amount', value: 'Up to ₹2Cr', class: 'amount' },
                  { label: 'Interest Rate', value: '10% onwards', class: 'rate' },
                  { label: 'Tenure', value: '36-84 months' },
                  { label: 'Processing Time', value: '7-10 days', class: 'rate' },
                ],
                features: ['Government backed', 'No collateral', 'Lower interest rates', 'Higher approval rates'],
              },
              {
                icon: 'credit-card',
                title: 'Vyapar+ (Loan Takeover)',
                desc: 'Better Rates & Enhanced Limits',
                details: [
                  { label: 'Loan Amount', value: '₹5L - ₹50L', class: 'amount' },
                  { label: 'Interest Rate', value: '14% onwards', class: 'rate' },
                  { label: 'Tenure', value: '6-24 months' },
                  { label: 'Processing Time', value: 'Same day', class: 'rate' },
                ],
                features: ['Better rates', 'Enhanced limits', 'Same day approval', 'Digital process'],
              },
            ].map((service, index) => (
              <div className="col-lg-4 col-md-6 animate-in" key={index}>
                <div className="service-card">
                  <div className="service-icon">
                    <i data-lucide={service.icon} width="24" height="24"></i>
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                  <div className="service-details row">
                    {service.details.map((detail, i) => (
                      <div className="detail-item col-6" key={i}>
                        <span className="detail-label">{detail.label}</span>
                        <span className={`detail-value ${detail.class || ''}`}>{detail.value}</span>
                      </div>
                    ))}
                  </div>
                  <ul className="features-list">
                    {service.features.map((feature, i) => (
                      <li key={i}>
                        <i data-lucide="check" className="check-icon" width="16" height="16"></i>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="btn btn-primary w-100">Apply Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="row text-center">
            {[
              { value: '₹500Cr+', label: 'Disbursed' },
              { value: '10,000+', label: 'Happy Clients' },
              { value: '50+', label: 'Bank Partners' },
              { value: '24Hrs', label: 'Quick Approval' },
            ].map((stat, index) => (
              <div className="col-md-3 animate-in" key={index}>
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials" id="testimonials">
        <div className="container">
          <div className="section-header animate-in text-center">
            <h2>
              What Our <span className="highlight">Clients Say</span>
            </h2>
            <p>Don't just take our word for it. Here's what businesses and associates say about their experience with SME PAISA</p>
          </div>
          <div className="row">
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
              <div className="col-lg-4 col-md-6 animate-in" key={index}>
                <div className="testimonial-card">
                  <div className="stars">★★★★★</div>
                  <p className="testimonial-text">"{testimonial.text}"</p>
                  <div className="testimonial-author">
                    <div className="author-avatar">{testimonial.initials}</div>
                    <div className="author-info">
                      <h4>{testimonial.author}</h4>
                      <p>{testimonial.company}</p>
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