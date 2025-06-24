
import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Mail, Menu } from "lucide-react";

const Support = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(5);

  const faqs = [
    {
      question: "What can I use Chatly for?",
      answer: "Chatly is a versatile AI assistant that can help with various tasks including writing, coding, analysis, and creative projects."
    },
    {
      question: "What platforms is Chatly available on?",
      answer: "Chatly is available as a web application accessible from any modern browser."
    },
    {
      question: "What subscription plans are available?",
      answer: "We offer Pro Monthly, Pro Quarterly, and Pro Yearly plans with different features and pricing."
    },
    {
      question: "Can I switch between AI models?",
      answer: "Yes, you can easily switch between different AI models depending on your needs and subscription plan."
    },
    {
      question: "What's new in Image Generation?",
      answer: "We've introduced a new and improved Image Generation feature that gives users more control and flexibility. Now, you can choose between two models:\n\n• Flux Basic - For quick and efficient image generation.\n• Flux HD - For higher-quality, more detailed images\n\nYou can also select from multiple aspect ratios, including Landscape [3:2], Wide screen [16:9], and Portrait [4:5], and much more to tailor images to your needs.\n\nTo customise your image settings, simply click on the settings option in the prompt box and select your preferred model and aspect ratio before generating images."
    },
    {
      question: "What file types are supported for upload?",
      answer: "Chatly supports various file types including images, documents, and text files for analysis and processing."
    },
    {
      question: "Is my personal data safe and secure when using Chatly?",
      answer: "Yes, we take data security seriously and implement industry-standard measures to protect your information."
    },
    {
      question: "Can I share my account with others?",
      answer: "Account sharing is not recommended. Each user should have their own account for security and usage tracking purposes."
    },
    {
      question: "Who do I contact if I have questions or need support?",
      answer: "You can contact our support team through the email option below or check our FAQ section for common questions."
    },
    {
      question: "How can I report a bug to the developer?",
      answer: "Please contact our support team with details about the bug you encountered, and we'll forward it to our development team."
    },
    {
      question: "How can I cancel my subscription?",
      answer: "You can cancel your subscription through your account settings or by contacting our support team."
    }
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white flex">
      <Sidebar 
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        onOpenPricing={() => {}}
      />
      
      <div className="flex-1 flex flex-col">
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
          {/* Talk with our team */}
          <div className="mb-12">
            <h2 className="text-2xl font-medium text-white mb-6">Talk with our team</h2>
            
            <div className="bg-[#2a2a2a] rounded-lg p-6 flex items-center justify-between hover:bg-[#333] transition-colors cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#444] rounded-lg flex items-center justify-center">
                  <Mail className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-white font-medium">Email Us</h3>
                  <p className="text-gray-400 text-sm">We'll aim to respond in 1 day</p>
                </div>
              </div>
              <ChevronDown className="text-gray-400" size={20} />
            </div>
          </div>

          {/* FAQ Section */}
          <div>
            <h2 className="text-2xl font-medium text-white mb-2">Frequently Asked Questions</h2>
            <p className="text-gray-400 mb-8">Discover more information by exploring our FAQ section.</p>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-[#2a2a2a] rounded-lg">
                  <button
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-[#333] transition-colors"
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
                      <div className="text-gray-300 whitespace-pre-line">
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
