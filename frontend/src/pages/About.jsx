import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './About.css';
import { Target, Heart, Shield, TrendingUp, Users } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Hero Section */}
      <section className="hero-section py-5 py-lg-7 text-center bg-gradient-light">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h1 className="display-4 fw-bold mb-4">
              About <span className="gradient-text">SME PAISA</span>
            </h1>
            <p className="lead text-muted mb-0">
              Empowering India's MSMEs with fast, secure, and affordable financing solutions. Your trusted partner for business growth and financial success.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="main-content py-5 py-lg-7">
        <div className="container">
          <div className="row align-items-center g-5 mb-6 mb-lg-7">
            <div className="col-lg-6">
              <h2 className="h1 fw-bold mb-4 text-dark">
                Fueling India's Business Dreams
              </h2>
              <p className="fs-5 text-muted mb-4">
                SME PAISA is a leading financial services company dedicated to bridging the funding gap for Micro, Small, and Medium Enterprises (MSMEs) across India. Since our inception, we have been committed to providing accessible, transparent, and efficient financing solutions that help businesses grow and thrive.
              </p>
              <p className="fs-5 text-muted">
                With our extensive network of banking partners and deep understanding of the MSME sector, we have successfully facilitated over ₹500 crores in funding, helping more than 10,000 businesses achieve their growth objectives.
              </p>
            </div>
            <div className="col-lg-6">
              <div className="stats-card bg-light rounded-3 p-4 p-lg-5">
                <div className="row text-center g-4">
                  <div className="col-6">
                    <div className="fs-2 fw-bold text-dark mb-2">₹500Cr+</div>
                    <div className="text-muted">Total Disbursed</div>
                  </div>
                  <div className="col-6">
                    <div className="fs-2 fw-bold text-dark mb-2">10,000+</div>
                    <div className="text-muted">Happy Clients</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="vision-mission py-5 py-lg-7 bg-light">
        <div className="container">
          <div className="text-center mb-5 mb-lg-6">
            <h2 className="h1 fw-bold mb-3 text-dark">Our Vision & Mission</h2>
            <p className="lead text-muted">
              Driving the future of MSME financing with innovation, integrity, and impact.
            </p>
          </div>
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="card h-100 border-0 shadow-sm rounded-3 p-4 animate-in">
                <div className="icon-circle bg-light rounded-circle d-flex align-items-center justify-content-center mb-4">
                  <Target className="text-dark" size={32} />
                </div>
                <h3 className="h4 fw-bold mb-3 text-dark">Our Vision</h3>
                <p className="text-muted">
                  To become India's most trusted and preferred financial partner for MSMEs, enabling every business to achieve its full potential through accessible and innovative financing solutions.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card h-100 border-0 shadow-sm rounded-3 p-4 animate-in">
                <div className="icon-circle bg-light rounded-circle d-flex align-items-center justify-content-center mb-4">
                  <Heart className="text-dark" size={32} />
                </div>
                <h3 className="h4 fw-bold mb-3 text-dark">Our Mission</h3>
                <p className="text-muted">
                  To democratize access to capital for MSMEs by leveraging technology, building strong partnerships, and delivering exceptional customer experiences that drive business growth and economic prosperity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="core-values py-5 py-lg-7">
        <div className="container">
          <div className="text-center mb-5 mb-lg-6">
            <h2 className="h1 fw-bold mb-3 text-dark">Our Core Values</h2>
            <p className="lead text-muted">
              The principles that guide everything we do at SME PAISA.
            </p>
          </div>
          <div className="row g-4">
            {[
              { icon: Shield, title: 'Integrity', desc: 'We conduct our business with the highest ethical standards, ensuring transparency and honesty in all our interactions.' },
              { icon: TrendingUp, title: 'Excellence', desc: 'We strive for excellence in everything we do, continuously improving our services to exceed customer expectations.' },
              { icon: Users, title: 'Customer First', desc: 'Our customers are at the heart of everything we do. We are committed to their success and growth.' },
            ].map((value, index) => (
              <div className="col-md-4 text-center animate-in" key={index}>
                <div className="value-card group">
                  <div className="icon-circle bg-light rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4 group-hover:bg-dark group-hover:text-white">
                    <value.icon size={40} />
                  </div>
                  <h3 className="h5 fw-bold mb-3 text-dark">{value.title}</h3>
                  <p className="text-muted">{value.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder's Message Section */}
      <section className="founder-message py-5 py-lg-7 bg-light">
        <div className="container">
          <div className="text-center mb-5 mb-lg-6">
            <h2 className="h1 fw-bold mb-3 text-dark">Founder's Message</h2>
            <p className="lead text-muted">A word from our leadership</p>
          </div>
          <div className="card border-0 shadow-sm rounded-3 p-4 p-lg-5 mx-auto max-w-4xl animate-in">
            <div className="quote-mark text-muted mb-4">"</div>
            <div className="fs-5 text-muted italic mb-4">
              <p className="mb-4">
                When I started SME PAISA, I had a simple yet powerful vision: to make business financing accessible to every entrepreneur who dares to dream. Having witnessed the struggles of countless MSMEs in securing timely funding, I realized that traditional financing models were not serving the needs of India's backbone - our small and medium enterprises.
              </p>
              <p className="mb-4">
                Today, I'm proud to say that SME PAISA has become a bridge between ambitious businesses and the capital they need to grow. Our success is measured not just in the funds we've disbursed, but in the dreams we've helped realize and the jobs we've helped create.
              </p>
              <p>
                As we continue to grow, our commitment remains unchanged: to be the most trusted, efficient, and customer-centric financial partner for India's MSMEs.
              </p>
            </div>
            <div className="border-top pt-4">
              <div className="fw-bold fs-5 text-dark">Rajesh Kumar</div>
              <div className="text-muted">Founder & CEO, SME PAISA</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-5 py-lg-7 bg-dark text-white">
        <div className="container text-center">
          <h2 className="h1 fw-bold mb-4">Ready to Grow Your Business?</h2>
          <p className="lead text-light mb-5">
            Join thousands of businesses that have chosen SME PAISA as their trusted financial partner.
          </p>
          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
            <button className="btn btn-light btn-lg px-5 py-3 fw-semibold animate-in">
              Apply for Funding
            </button>
            <button className="btn btn-outline-light btn-lg px-5 py-3 fw-semibold animate-in">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;