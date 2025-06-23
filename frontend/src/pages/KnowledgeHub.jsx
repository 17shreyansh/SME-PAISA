import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './KnowledgeHub.css';
import { 
  BookOpen, 
  Play, 
  Download, 
  Calendar, 
  User, 
  Clock, 
  Eye, 
  FileText, 
  Video, 
  Search,
  Filter,
  Tag,
  ArrowRight,
  Star
} from 'lucide-react';

const KnowledgeHub = () => {
  const [activeTab, setActiveTab] = useState('blog');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Dummy Blog Data
  const blogPosts = [
    {
      id: 1,
      title: "5 Essential Steps to Secure MSME Funding in 2025",
      excerpt: "Navigate the complexities of MSME funding with our comprehensive guide covering eligibility, documentation, and application strategies.",
      author: "Priya Sharma",
      date: "2025-06-20",
      readTime: "8 min read",
      views: 1240,
      category: "Funding",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop",
      featured: true
    },
    {
      id: 2,
      title: "Digital Transformation for Small Businesses: A Complete Guide",
      excerpt: "Learn how digital transformation can revolutionize your small business operations and boost growth in today's competitive market.",
      author: "Rajesh Kumar",
      date: "2025-06-18",
      readTime: "12 min read",
      views: 980,
      category: "Technology",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
      featured: false
    },
    {
      id: 3,
      title: "Tax Benefits and Incentives for MSMEs in India",
      excerpt: "Discover various tax benefits, subsidies, and government incentives available for Micro, Small, and Medium Enterprises.",
      author: "Amit Patel",
      date: "2025-06-15",
      readTime: "6 min read",
      views: 756,
      category: "Finance",
      image: "https://images.unsplash.com/photo-1554224154-26032fbc4d72?w=400&h=250&fit=crop",
      featured: false
    },
    {
      id: 4,
      title: "Building Strong Cash Flow Management Systems",
      excerpt: "Master the art of cash flow management with proven strategies to maintain healthy business finances and avoid liquidity crises.",
      author: "Sneha Gupta",
      date: "2025-06-12",
      readTime: "10 min read",
      views: 892,
      category: "Finance",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
      featured: true
    }
  ];

  // Dummy Video Data
  const videos = [
    {
      id: 1,
      title: "MSME Loan Application Process Explained",
      description: "Step-by-step walkthrough of the MSME loan application process with SME PAISA.",
      duration: "12:45",
      views: 15600,
      date: "2025-06-19",
      category: "Tutorial",
      thumbnail: "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=400&h=225&fit=crop",
      featured: true
    },
    {
      id: 2,
      title: "Success Story: From Startup to Scale",
      description: "How a small manufacturing unit scaled to ₹50 crores with strategic funding from SME PAISA.",
      duration: "8:30",
      views: 8900,
      date: "2025-06-16",
      category: "Success Story",
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=225&fit=crop",
      featured: false
    },
    {
      id: 3,
      title: "Understanding Credit Scores for Business Loans",
      description: "Everything you need to know about business credit scores and how they impact loan approvals.",
      duration: "15:20",
      views: 12300,
      date: "2025-06-14",
      category: "Education",
      thumbnail: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=225&fit=crop",
      featured: false
    },
    {
      id: 4,
      title: "Digital Marketing Strategies for MSMEs",
      description: "Cost-effective digital marketing strategies to grow your MSME business online.",
      duration: "18:15",
      views: 9800,
      date: "2025-06-10",
      category: "Marketing",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop",
      featured: true
    }
  ];

  // Dummy Document Data
  const documents = [
    {
      id: 1,
      title: "MSME Loan Application Checklist",
      description: "Complete checklist of documents required for MSME loan applications.",
      type: "PDF",
      size: "2.4 MB",
      downloads: 3400,
      date: "2025-06-20",
      category: "Templates",
      featured: true
    },
    {
      id: 2,
      title: "Business Plan Template for MSMEs",
      description: "Professional business plan template tailored for small and medium enterprises.",
      type: "DOCX",
      size: "1.8 MB",
      downloads: 2890,
      date: "2025-06-18",
      category: "Templates",
      featured: false
    },
    {
      id: 3,
      title: "Financial Projection Worksheet",
      description: "Excel template for creating accurate financial projections for your business.",
      type: "XLSX",
      size: "956 KB",
      downloads: 1950,
      date: "2025-06-15",
      category: "Tools",
      featured: true
    },
    {
      id: 4,
      title: "MSME Registration Guide 2025",
      description: "Step-by-step guide to register your business under MSME category.",
      type: "PDF",
      size: "3.2 MB",
      downloads: 4200,
      date: "2025-06-12",
      category: "Guides",
      featured: false
    },
    {
      id: 5,
      title: "Tax Planning Calendar for SMEs",
      description: "Annual tax planning calendar with important dates and deadlines.",
      type: "PDF",
      size: "1.5 MB",
      downloads: 2100,
      date: "2025-06-08",
      category: "Resources",
      featured: false
    }
  ];

  const categories = ['all', 'Funding', 'Technology', 'Finance', 'Marketing', 'Templates', 'Tools', 'Guides', 'Resources'];

  // Blog Component
  const BlogSection = () => (
    <div className="d-flex flex-column gap-5">
      {/* Featured Posts */}
      <div className="mb-5">
        <h2 className="h4 fw-bold mb-4 text-dark">Featured Articles</h2>
        <div className="row g-4">
          {blogPosts.filter(post => post.featured).map((post) => (
            <div key={post.id} className="col-lg-6" data-testid="blog-post">
              <div className="card h-100 border-0 shadow-sm rounded-3 overflow-hidden animate-fade-in blog-card">
                <div className="position-relative overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="card-img-top object-fit-cover"
                    style={{ height: '12rem' }}
                  />
                  <div className="position-absolute top-0 start-0 m-3">
                    <span className="badge bg-dark text-white">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="card-body p-4">
                  <h3 className="card-title h5 fw-bold mb-3 text-dark line-clamp-2">{post.title}</h3>
                  <p className="card-text text-muted mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="d-flex flex-wrap justify-content-between text-muted small">
                    <div className="d-flex align-items-center gap-3">
                      <span className="d-flex align-items-center">
                        <User size={16} className="me-1" />
                        {post.author}
                      </span>
                      <span className="d-flex align-items-center">
                        <Calendar size={16} className="me-1" />
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <span className="d-flex align-items-center">
                        <Clock size={16} className="me-1" />
                        {post.readTime}
                      </span>
                      <span className="d-flex align-items-center">
                        <Eye size={16} className="me-1" />
                        {post.views}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Posts */}
      <div>
        <h2 className="h4 fw-bold mb-4 text-dark">Latest Articles</h2>
        <div className="row g-4">
          {blogPosts.map((post) => (
            <div key={post.id} className="col-md-6 col-lg-4" data-testid="blog-post">
              <div className="card h-100 border-0 shadow-sm rounded-3 overflow-hidden animate-fade-in blog-card">
                <div className="position-relative overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="card-img-top object-fit-cover"
                    style={{ height: '10rem' }}
                  />
                  <div className="position-absolute top-0 start-0 m-2">
                    <span className="badge bg-dark text-white">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="card-body p-4">
                  <h3 className="card-title h6 fw-bold mb-2 text-dark line-clamp-2">{post.title}</h3>
                  <p className="card-text text-muted small mb-3 line-clamp-2">{post.excerpt}</p>
                  <div className="d-flex justify-content-between text-muted small">
                    <span>{post.author}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <button className="btn btn-link p-0 mt-2 text-dark small fw-semibold d-flex align-items-center text-decoration-none hover-underline">
                    Read More <ArrowRight size={16} className="ms-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Video Gallery Component
  const VideoSection = () => (
    <div className="d-flex flex-column gap-5">
      {/* Featured Videos */}
      <div className="mb-5">
        <h2 className="h4 fw-bold mb-4 text-dark">Featured Videos</h2>
        <div className="row g-4">
          {videos.filter(video => video.featured).map((video) => (
            <div key={video.id} className="col-lg-6" data-testid="video">
              <div className="card h-100 border-0 shadow-sm rounded-3 overflow-hidden animate-fade-in video-card">
                <div className="position-relative overflow-hidden">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="card-img-top object-fit-cover"
                    style={{ height: '12rem' }}
                  />
                  <div className="position-absolute inset-0 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center opacity-0 hover-opacity-100">
                    <div className="bg-white rounded-circle p-3 transform scale-75 hover-scale-100">
                      <Play size={24} className="text-dark" />
                    </div>
                  </div>
                  <div className="position-absolute top-0 start-0 m-3">
                    <span className="badge bg-dark text-white">
                      {video.category}
                    </span>
                  </div>
                  <div className="position-absolute bottom-0 end-0 m-3">
                    <span className="badge bg-dark bg-opacity-75 text-white">
                      {video.duration}
                    </span>
                  </div>
                </div>
                <div className="card-body p-4">
                  <h3 className="card-title h5 fw-bold mb-3 text-dark line-clamp-2">{video.title}</h3>
                  <p className="card-text text-muted mb-4">{video.description}</p>
                  <div className="d-flex justify-content-between text-muted small">
                    <span className="d-flex align-items-center">
                      <Eye size={16} className="me-1" />
                      {video.views.toLocaleString()} views
                    </span>
                    <span className="d-flex align-items-center">
                      <Calendar size={16} className="me-1" />
                      {new Date(video.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Videos */}
      <div>
        <h2 className="h4 fw-bold mb-4 text-dark">Video Library</h2>
        <div className="row g-4">
          {videos.map((video) => (
            <div key={video.id} className="col-md-6 col-lg-4" data-testid="video">
              <div className="card h-100 border-0 shadow-sm rounded-3 overflow-hidden animate-fade-in video-card">
                <div className="position-relative overflow-hidden">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="card-img-top object-fit-cover"
                    style={{ height: '10rem' }}
                  />
                  <div className="position-absolute inset-0 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center opacity-0 hover-opacity-100">
                    <div className="bg-white rounded-circle p-2 transform scale-75 hover-scale-100">
                      <Play size={20} className="text-dark" />
                    </div>
                  </div>
                  <div className="position-absolute top-0 start-0 m-2">
                    <span className="badge bg-dark text-white">
                      {video.category}
                    </span>
                  </div>
                  <div className="position-absolute bottom-0 end-0 m-2">
                    <span className="badge bg-dark bg-opacity-75 text-white">
                      {video.duration}
                    </span>
                  </div>
                </div>
                <div className="card-body p-4">
                  <h3 className="card-title h6 fw-bold mb-2 text-dark line-clamp-2">{video.title}</h3>
                  <p className="card-text text-muted small mb-3 line-clamp-2">{video.description}</p>
                  <div className="d-flex justify-content-between text-muted small">
                    <span>{video.views.toLocaleString()} views</span>
                    <span>{new Date(video.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Document Library Component
  const DocumentSection = () => (
    <div className="row g-4">
      {documents.map((doc) => (
        <div key={doc.id} className="col-md-6 col-lg-4" data-testid="document">
          <div className={`card h-100 border-0 shadow-sm rounded-3 p-4 animate-fade-in document-card ${doc.featured ? 'border-dark border-opacity-10' : ''}`}>
            {doc.featured && (
              <div className="d-flex align-items-center mb-3">
                <Star size={16} className="text-warning me-1" />
                <span className="small fw-medium text-warning">Featured</span>
              </div>
            )}
            <div className="d-flex align-items-start justify-content-between mb-4">
              <div className="d-flex align-items-center">
                <div className="bg-light rounded-2 p-2 me-3">
                  <FileText size={24} className="text-muted" />
                </div>
                <span className="badge bg-light text-muted">{doc.type}</span>
              </div>
              <span className="small text-muted">{doc.size}</span>
            </div>
            <h3 className="card-title h6 fw-bold mb-2 text-dark line-clamp-2">{doc.title}</h3>
            <p className="card-text text-muted small mb-4 line-clamp-2">{doc.description}</p>
            <div className="d-flex justify-content-between text-muted small mb-4">
              <span className="d-flex align-items-center">
                <Download size={16} className="me-1" />
                {doc.downloads.toLocaleString()} downloads
              </span>
              <span>{new Date(doc.date).toLocaleDateString()}</span>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-dark flex-grow-1 py-2 d-flex align-items-center justify-content-center">
                <Download size={16} className="me-2" />
                Download
              </button>
              <button className="btn btn-outline-dark py-2 px-3">
                <Eye size={16} />
              </button>
            </div>
            <div className="mt-3">
              <span className="badge bg-light text-muted">{doc.category}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-dark">
      {/* Hero Section */}
      <section className="hero-section py-5 py-lg-7 text-center bg-gradient-light">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h1 className="display-4 fw-bold mb-4">
              Knowledge <span className="gradient-text">Hub</span>
            </h1>
            <p className="lead text-muted mb-5">
              Explore our comprehensive library of resources, insights, and tools designed to empower your business journey.
            </p>
            <div className="position-relative max-w-2xl mx-auto">
              <Search className="position-absolute start-0 top-50 translate-middle-y ms-3 text-muted" size={20} />
              <input
                type="text"
                placeholder="Search articles, videos, documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control ps-5 py-3 rounded-3"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="nav-tabs py-4 border-bottom border-light">
        <div className="container">
          <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-md-between gap-3">
            <div className="nav nav-pills bg-light rounded-3 p-1 d-flex">
              {[
                { id: 'blog', label: 'Articles', icon: BookOpen },
                { id: 'videos', label: 'Videos', icon: Video },
                { id: 'documents', label: 'Documents', icon: FileText }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`nav-link flex-grow-1 d-flex align-items-center px-4 py-2 ${activeTab === tab.id ? 'active bg-dark text-white' : 'text-muted hover-bg-light-dark'}`}
                >
                  <tab.icon size={20} className="me-2" />
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="d-flex align-items-center gap-3">
              <Filter size={20} className="text-muted" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="form-select rounded-3"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="content-section py-5 py-lg-6">
        <div className="container">
          {activeTab === 'blog' && <BlogSection />}
          {activeTab === 'videos' && <VideoSection />}
          {activeTab === 'documents' && <DocumentSection />}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="newsletter-section py-5 py-lg-6 bg-dark text-white">
        <div className="container text-center">
          <h2 className="h3 fw-bold mb-4">Stay Updated</h2>
          <p className="lead text-light mb-5">
            Get the latest insights, resources, and funding opportunities delivered to your inbox.
          </p>
          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="form-control py-3 rounded-3"
            />
            <button className="btn btn-light py-3 px-5 fw-semibold">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default KnowledgeHub;