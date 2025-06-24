import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Menu, ChevronDown, ChevronUp } from "lucide-react";

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
        isSidebarCollapsed ? 'ml-16' : 'ml-64'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            {isSidebarCollapsed && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSidebarCollapsed(false)}
                className="text-gray-400 hover:text-white"
              >
                <Menu size={16} />
              </Button>
            )}
            <h1 className="text-xl font-medium text-white">Support</h1>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-8 max-w-4xl mx-auto w-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-400">Find answers to common questions about using Chatly.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-[#2a2a2a] rounded-lg">
                <button
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-[#333] transition-colors rounded-lg"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <span className="text-white font-medium">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="text-gray-400" size={20} />
                  ) : (
                    <ChevronDown className="text-gray-400" size={20} />
                  )}
                </button>
                
                {expandedFaq === index && (
                  <div className="px-6 pb-6">
                    <div className="text-gray-300">
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
  );
};

export default Support;
