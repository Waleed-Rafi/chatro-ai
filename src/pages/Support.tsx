
import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Menu, ChevronDown, ChevronUp, ArrowRight } from "lucide-react";

const Support = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    { question: "What can I use Chatly for?", answer: "Answer for what you can use Chatly for..." },
    { question: "What platforms is Chatly available on?", answer: "Answer about platform availability..." },
    { question: "What subscription plans are available?", answer: "Answer about subscription plans..." },
    { question: "Can I switch between AI models?", answer: "Answer about switching AI models..." },
    { question: "What's new in Image Generation?", answer: "Answer about image generation updates..." },
    { question: "What file types are supported for upload?", answer: "Answer about supported file types..." },
    { question: "Is my personal data safe and secure when using Chatly?", answer: "Answer about data security..." },
    { question: "Can I share my account with others?", answer: "Answer about account sharing..." },
    { question: "Who do I contact if I have questions or need support?", answer: "Answer about contacting support..." },
    { question: "How can I report a bug to the developer?", answer: "Answer about reporting bugs..." },
    { question: "How can I cancel my subscription?", answer: "Answer about canceling subscription..." }
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white flex">
      <Sidebar 
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        onOpenPricing={() => {}}
      />
      
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        isSidebarCollapsed ? 'md:ml-16' : 'md:ml-64'
      } pt-16 md:pt-0`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            {isSidebarCollapsed && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSidebarCollapsed(false)}
                className="text-gray-400 hover:text-white hidden md:flex"
              >
                <Menu size={16} />
              </Button>
            )}
            <h1 className="text-lg md:text-xl font-medium text-white">Support</h1>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 md:p-8 max-w-4xl mx-auto w-full">
          {/* Talk with our team section */}
          <div className="mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-medium text-white mb-6 md:mb-8">Talk with our team</h2>
            
            <div className="bg-[#2a2a2a] rounded-lg p-4 md:p-6 flex items-center justify-between hover:bg-[#333] transition-colors cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#333] rounded-lg flex items-center justify-center">
                  <span className="text-xl">✉️</span>
                </div>
                <div>
                  <div className="text-white font-medium text-lg">Email Us</div>
                  <div className="text-gray-400 text-sm">We'll aim to respond in 1 day</div>
                </div>
              </div>
              <ArrowRight className="text-gray-400" size={20} />
            </div>
          </div>

          {/* FAQ Section */}
          <div>
            <h2 className="text-2xl md:text-3xl font-medium text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-400 mb-6 md:mb-8">Discover more information by exploring our FAQ section.</p>

            <div className="space-y-3 md:space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-[#2a2a2a] rounded-lg">
                  <button
                    className="w-full p-4 md:p-6 text-left flex items-center justify-between hover:bg-[#333] transition-colors rounded-lg"
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  >
                    <span className="text-white font-medium text-sm md:text-base pr-4">{faq.question}</span>
                    {expandedFaq === index ? (
                      <ChevronUp className="text-gray-400 flex-shrink-0" size={20} />
                    ) : (
                      <ChevronDown className="text-gray-400 flex-shrink-0" size={20} />
                    )}
                  </button>
                  
                  {expandedFaq === index && (
                    <div className="px-4 md:px-6 pb-4 md:pb-6">
                      <div className="text-gray-300 text-sm md:text-base">
                        {faq.answer}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
