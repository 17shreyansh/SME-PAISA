import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, TrendingUp, Shield, Phone, PlayCircle } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-br from-orange-50 to-blue-50 min-h-screen flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                <TrendingUp className="w-4 h-4 mr-2" />
                India's Growing MSME Platform | ₹500Cr+ Disbursed
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Fuel Your Business 
                <span className="text-orange-500"> Growth</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Get instant access to working capital, term loans, and business financing solutions. 
                Join 10,000+ MSMEs who trust SME PAISA for their growth journey.
              </p>

              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span>100% Secure & RBI Compliant</span>
                </div>
                <div className="hidden md:block w-px h-6 bg-gray-300"></div>
                <div className="hidden md:flex items-center gap-2">
                  <PlayCircle className="w-5 h-5 text-blue-500" />
                  <span>Watch Success Stories</span>
                </div>
              </div>
            </div>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Apply for Loan
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-300"
              >
                Become Associate
                <Users className="ml-2 w-5 h-5" />
              </Button>
            </div>

            {/* Additional CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button variant="ghost" className="text-gray-700 hover:text-orange-500 justify-start p-0">
                📞 Get Free Consultation Call
              </Button>
              <Button variant="ghost" className="text-gray-700 hover:text-blue-500 justify-start p-0">
                📊 Track My Loan Application
              </Button>
              <Button variant="ghost" className="text-gray-700 hover:text-green-500 justify-start p-0">
                🏢 Partner with Us (Corporate)
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-8 pt-6 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">₹500Cr+</div>
                <div className="text-sm text-gray-600">Disbursed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">10,000+</div>
                <div className="text-sm text-gray-600">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">50+</div>
                <div className="text-sm text-gray-600">Bank Partners</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-500">24Hrs</div>
                <div className="text-sm text-gray-600">Quick Approval</div>
              </div>
            </div>
          </div>

          {/* Right Content - Enhanced Dashboard Preview */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">Quick Application</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-600">Live</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border-l-4 border-orange-500">
                    <div>
                      <span className="text-gray-700 font-medium">Working Capital</span>
                      <div className="text-xs text-gray-500">OD/CC/Invoice Discounting</div>
                    </div>
                    <span className="text-orange-500 font-semibold">₹10L - ₹2Cr</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border-l-4 border-blue-500">
                    <div>
                      <span className="text-gray-700 font-medium">CGTMSE Loans</span>
                      <div className="text-xs text-gray-500">No Collateral Required</div>
                    </div>
                    <span className="text-blue-500 font-semibold">Up to ₹2Cr</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border-l-4 border-green-500">
                    <div>
                      <span className="text-gray-700 font-medium">Vyapar+ Takeover</span>
                      <div className="text-xs text-gray-500">Better Rates & Enhanced Limits</div>
                    </div>
                    <span className="text-green-500 font-semibold">₹5L - ₹50L</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-600">Processing Time</span>
                    <span className="text-sm font-semibold text-green-600">24-48 Hours</span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-600">Documentation</span>
                    <span className="text-sm font-semibold text-blue-600">Minimal & Digital</span>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 rounded-lg font-semibold shadow-lg">
                  Get Started in 2 Minutes
                </Button>

                <div className="text-center">
                  <span className="text-xs text-gray-500">✓ No hidden charges • ✓ Quick approval • ✓ Expert support</span>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center animate-bounce shadow-lg">
              <span className="text-2xl">💰</span>
            </div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center animate-pulse shadow-lg">
              <span className="text-xl">📈</span>
            </div>
            <div className="absolute top-1/2 -left-4 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center animate-pulse shadow-lg">
              <span className="text-lg">⚡</span>
            </div>
          </div>
        </div>

        {/* Regional Office Finder */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-white rounded-xl shadow-md">
            <span className="text-gray-600">Find your nearest office:</span>
            <div className="flex gap-2">
              {['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Pune'].map((city) => (
                <Button key={city} variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                  {city}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;