import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ContactUs.css';
import { 
  Phone,
  Heart,
  Mail,
  MapPin,
  Clock,
  Send,
  User,
  Building,
  FileText,
  CheckCircle,
  AlertCircle,
  MessageCircle,
} from 'lucide-react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    inquiryType: 'general',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const offices = [
    {
      id: 1,
      name: 'Mumbai Head Office',
      address: '12th Floor, Business Tower, Bandra Kurla Complex, Mumbai - 400051',
      phone: '+91 22 4567 8900',
      email: 'mumbai@smepaisa.com',
      hours: 'Mon-Fri: 9:00 AM - 6:00 PM',
    },
    {
      id: 2,
      name: 'Delhi Branch',
      address: 'Connaught Place, Central Delhi, New Delhi - 110001',
      phone: '+91 11 4567 8901',
      email: 'delhi@smepaisa.com',
      hours: 'Mon-Fri: 9:30 AM - 6:30 PM',
    },
    {
      id: 3,
      name: 'Bangalore Branch',
      address: 'Koramangala 5th Block, Bangalore - 560095',
      phone: '+91 80 4567 8902',
      email: 'bangalore@smepaisa.com',
      hours: 'Mon-Fri: 9:00 AM - 6:00 PM',
    },
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
        inquiryType: 'general',
      });
      
      setTimeout(() => setSubmitStatus(null), 3000);
    }, 2000);
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = '919876543210';
    const message = encodeURIComponent('Hi! I would like to know more about SME PAISA financing solutions.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Hero Section */}
      <section className="hero-section py-5 py-lg-7 text-center bg-gradient-light">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h1 className="display-4 fw-bold mb-4 animate-fade-in">
              Contact <span className="gradient-text">Us</span>
            </h1>
            <p className="lead text-muted mb-0 animate-fade-in-delay">
              Ready to fuel your business growth? Get in touch with our expert team today.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Contact Cards */}
      <section className="quick-contact py-5 py-lg-6">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm rounded-3 p-4 text-center animate-fade-in contact-card">
                <div className="icon-circle bg-dark rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4">
                  <Phone className="text-white" size={32} />
                </div>
                <h3 className="h5 fw-bold mb-2">Call Us</h3>
                <p className="text-muted mb-3">Speak directly with our experts</p>
                <Link to="tel:+919876543210" className="text-dark fw-semibold text-decoration-none hover-underline">
                  +91 98765 43210
                </Link>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm rounded-3 p-4 text-center animate-fade-in contact-card">
                <div className="icon-circle bg-dark rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4">
                  <Mail className="text-white" size={32} />
                </div>
                <h3 className="h5 fw-bold mb-2">Email Us</h3>
                <p className="text-muted mb-3">Get detailed responses</p>
                <Link to="mailto:info@smepaisa.com" className="text-dark fw-semibold text-decoration-none hover-underline">
                  info@smepaisa.com
                </Link>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm rounded-3 p-4 text-center animate-fade-in contact-card">
                <div className="icon-circle bg-success rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4 cursor-pointer hover-bg-success-dark" onClick={handleWhatsAppClick}>
                  <MessageCircle className="text-white" size={32} />
                </div>
                <h3 className="h5 fw-bold mb-2">WhatsApp</h3>
                <p className="text-muted mb-3">Quick chat support</p>
                <button 
                  onClick={handleWhatsAppClick}
                  className="text-success fw-semibold text-decoration-none hover-underline bg-transparent border-0 p-0"
                >
                  Start Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="main-content py-5 py-lg-6 bg-light">
        <div className="container">
          <div className="row g-5">
            {/* Contact Form */}
            <div className="col-lg-6">
              <div className="card border-0 shadow-sm rounded-3 p-4 p-lg-5 animate-fade-in">
                <h2 className="h3 fw-bold mb-4 text-dark">Send us a Message</h2>
                
                {submitStatus === 'success' && (
                  <div className="alert alert-success d-flex align-items-center mb-4 animate-fade-in" role="alert">
                    <CheckCircle className="me-3 flex-shrink-0" size={20} />
                    <span>Message sent successfully! We'll get back to you soon.</span>
                  </div>
                )}

                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="position-relative">
                      <User className="position-absolute start-0 top-50 translate-middle-y ms-3 text-black" size={20} />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Full Name *"
                        required
                        className="form-control ps-5"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="position-relative">
                      <Mail className="position-absolute start-0 top-50 translate-middle-y ms-3 text-black" size={20} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email Address *"
                        required
                        className="form-control ps-5"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="position-relative">
                      <Phone className="position-absolute start-0 top-50 translate-middle-y ms-3 text-black" size={20} />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Phone Number *"
                        required
                        className="form-control ps-5"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="position-relative">
                      <Building className="position-absolute start-0 top-50 translate-middle-y ms-3 text-black" size={20} />
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Company Name"
                        className="form-control ps-5"
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="funding">Funding Application</option>
                      <option value="partnership">Partnership</option>
                      <option value="support">Customer Support</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <div className="position-relative">
                      <FileText className="position-absolute start-0 top-0 mt-3 ms-3 text-black" size={20} />
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Your message *"
                        required
                        rows="5"
                        className="form-control ps-5 pt-4 resize-none"
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-12">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-black w-100 py-3 d-flex align-items-center justify-content-center text-white"
                    >
                      {isSubmitting ? (
                        <div className="spinner-border spinner-border-sm text-light me-2" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      ) : (
                        <>
                          <Send className="me-2" size={20} />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Office Locator */}
            <div className="col-lg-6">
              <h2 className="h3 fw-bold mb-4 text-dark">Our Offices</h2>
              <div className="d-flex flex-column gap-4">
                {offices.map((office, index) => (
                  <div 
                    key={office.id} 
                    className="card border-0 shadow-sm rounded-3 p-4 animate-slide-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <h3 className="h5 fw-bold mb-3 text-dark">{office.name}</h3>
                    <div className="d-flex flex-column gap-3">
                      <div className="d-flex align-items-start">
                        <MapPin className="text-black me-3 flex-shrink-0 mt-1" size={20} />
                        <span className="text-black">{office.address}</span>
                      </div>
                      <div className="d-flex align-items-center">
                        <Phone className="text-black me-3 flex-shrink-0" size={20} />
                        <Link to={`tel:${office.phone}`} className="text-black text-decoration-none hover-underline">
                          {office.phone}
                        </Link>
                      </div>
                      <div className="d-flex align-items-center">
                        <Mail className="text-black me-3 flex-shrink-0" size={20} />
                        <Link to={`mailto:${office.email}`} className="text-black text-decoration-none hover-underline">
                          {office.email}
                        </Link>
                      </div>
                      <div className="d-flex align-items-center">
                        <Clock className="text-black me-3 flex-shrink-0" size={20} />
                        <span className="text-black">{office.hours}</span>
                      </div>
                    </div>
                    <button className="btn btn-outline-dark w-100 mt-4">
                      Get Directions
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section py-5 py-lg-6">
        <div className="container">
          <h2 className="h3 fw-bold mb-5 text-center text-dark">Frequently Asked Questions</h2>
          <div className="d-flex flex-column gap-3">
            {[
              {
                question: "How long does the funding approval process take?",
                answer: "Our streamlined process typically takes 3-7 business days for approval, depending on the complexity of your application."
              },
              {
                question: "What documents do I need for the application?",
                answer: "Basic requirements include business registration, financial statements, bank statements, and identity proof. Our team will guide you through the complete list."
              },
              {
                question: "What is the interest rate for MSME loans?",
                answer: "Interest rates are competitive and vary based on your business profile, credit score, and loan amount. Contact us for personalized rates."
              }
            ].map((faq, index) => (
              <div key={index} className="card border-0 shadow-sm rounded-3 p-4 animate-fade-in">
                <div className="d-flex align-items-start">
                  <AlertCircle className="text-black me-3 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h3 className="fw-semibold text-dark mb-2">{faq.question}</h3>
                    <p className="text-black">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-4 end-4 z-50">
        <button
          onClick={handleWhatsAppClick}
          className="btn btn-success btn-lg rounded-circle p-3 shadow-lg animate-bounce"
        >
          <MessageCircle size={24} />
        </button>
      </div>
    </div>
  );
};

export default ContactUs;