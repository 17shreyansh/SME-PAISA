import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight } from 'lucide-react';

const FeaturedCaseStudies = () => {
  const caseStudies = [
    {
      title: "Manufacturing Marvel",
      company: "Kumar Textiles",
      sector: "Textile Manufacturing",
      problem: "Urgent working capital needed for bulk order fulfillment",
      solution: "₹25L OD limit sanctioned in 48 hours",
      impact: "300% increase in production capacity",
      image: "🏭",
      hasVideo: true
    },
    {
      title: "Retail Warrior",
      company: "Sharma Electronics",
      sector: "Electronics Retail",
      problem: "Expansion funding for new showroom",
      solution: "₹50L CGTMSE loan without collateral",
      impact: "Opened 3 new outlets in 6 months",
      image: "🏪",
      hasVideo: true
    },
    {
      title: "Agri Hero",
      company: "Green Valley Foods",
      sector: "Food Processing",
      problem: "Machinery upgrade for processing unit",
      solution: "₹75L term loan for equipment finance",
      impact: "2x processing capacity, 50% cost reduction",
      image: "🌾",
      hasVideo: false
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured <span className="text-orange-500">Success Stories</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real businesses, real growth. See how SME PAISA has helped entrepreneurs achieve their dreams
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
              <CardContent className="p-0">
                {/* Image/Icon Section */}
                <div className="relative bg-gradient-to-br from-orange-100 to-blue-100 h-48 flex items-center justify-center">
                  <div className="text-6xl">{study.image}</div>
                  {study.hasVideo && (
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button variant="outline" className="bg-white text-gray-900 hover:bg-gray-100">
                        <Play className="w-5 h-5 mr-2" />
                        Watch Story
                      </Button>
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="text-blue-600 border-blue-600">
                      {study.sector}
                    </Badge>
                    {study.hasVideo && (
                      <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                        <Play className="w-3 h-3 text-white fill-white" />
                      </div>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">{study.title}</h3>
                  <div className="text-orange-500 font-semibold mb-4">{study.company}</div>

                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-semibold text-gray-900">Challenge: </span>
                      <span className="text-gray-600">{study.problem}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900">Solution: </span>
                      <span className="text-gray-600">{study.solution}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900">Impact: </span>
                      <span className="text-green-600 font-medium">{study.impact}</span>
                    </div>
                  </div>

                  <Button 
                    variant="ghost" 
                    className="w-full mt-4 text-orange-500 hover:text-orange-600 hover:bg-orange-50"
                  >
                    Read Full Story
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg"
          >
            View All Success Stories
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCaseStudies;