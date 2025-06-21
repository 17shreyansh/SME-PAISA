import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Users, DollarSign, Award } from 'lucide-react';

const AssociateSection = () => {
  const benefits = [
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Attractive Commissions",
      description: "Earn up to 10% commission on first level referrals"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Multi-Level Earnings",
      description: "3-tier system: 10% + 5% + 2.5% commission structure"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Build Your Network",
      description: "Create a sustainable income stream through referrals"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Recognition & Rewards",
      description: "Monthly incentives and performance bonuses"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-orange-50">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
              <Users className="w-4 h-4 mr-2" />
              Associate Program
            </div>
            
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Become a <span className="text-blue-600">SME PAISA Associate</span>
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Join our network of financial consultants and earn attractive commissions 
              while helping businesses grow. Build a sustainable income stream with our 
              proven MLM system.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 flex-shrink-0">
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{benefit.title}</h4>
                    <p className="text-sm text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-semibold rounded-xl"
              >
                Join as Associate
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-6 text-lg font-semibold rounded-xl"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Right Content - Commission Structure */}
          <div>
            <Card className="bg-white shadow-2xl border-0">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Commission Structure
                </h3>
                
                <div className="space-y-6">
                  <div className="relative">
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border-l-4 border-blue-600">
                      <div>
                        <div className="font-bold text-blue-900">Level 1 - Direct Referrals</div>
                        <div className="text-sm text-blue-700">Your direct clients</div>
                      </div>
                      <div className="text-2xl font-bold text-blue-600">10%</div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border-l-4 border-green-500">
                      <div>
                        <div className="font-bold text-green-900">Level 2 - Sub-Associates</div>
                        <div className="text-sm text-green-700">Associates you refer</div>
                      </div>
                      <div className="text-2xl font-bold text-green-600">5%</div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl border-l-4 border-orange-500">
                      <div>
                        <div className="font-bold text-orange-900">Level 3 - Network Growth</div>
                        <div className="text-sm text-orange-700">Extended network</div>
                      </div>
                      <div className="text-2xl font-bold text-orange-600">2.5%</div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-gray-50 rounded-xl text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">₹50,000+</div>
                  <div className="text-gray-600">Average Monthly Earnings</div>
                  <div className="text-sm text-gray-500 mt-1">Top performing associates</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AssociateSection;