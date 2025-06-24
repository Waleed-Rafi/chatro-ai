import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Check, Menu, ChevronDown, ChevronUp } from "lucide-react";

const Pricing = () => {
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
            <h1 className="text-xl font-medium text-white">Pricing Plans</h1>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 md:p-8 overflow-y-auto">
          {/* Mobile Layout */}
          <div className="md:hidden">
            {/* Pricing Header */}
            <div className="text-center mb-6">
              <h2 className="text-xl font-medium text-white mb-2">Pricing Plans</h2>
              <p className="text-gray-400 text-sm">Want to get more out of Chatly? Subscribe to one of our professional plans.</p>
            </div>

            {/* Pricing Cards */}
            <div className="space-y-4 mb-8">
              {/* Pro Monthly */}
              <div className="bg-[#2a2a2a] rounded-lg p-4">
                <h3 className="text-white text-lg font-medium mb-2">Pro Monthly</h3>
                <div className="mb-4">
                  <span className="text-2xl font-bold text-white">$20</span>
                  <span className="text-gray-400 ml-2 text-sm">per month, paid monthly</span>
                </div>
                <Button className="w-full bg-[#444] hover:bg-[#555] text-white mb-4">
                  Subscribe
                </Button>
                <p className="text-gray-400 text-xs">
                  Get a taste of pro membership and enjoy unlimited chats for one month.
                </p>
              </div>

              {/* Pro Quarterly - Popular */}
              <div className="bg-blue-600 rounded-lg p-4 relative">
                <div className="absolute -top-2 left-4">
                  <span className="bg-blue-800 text-white px-3 py-1 rounded text-xs font-medium">POPULAR</span>
                </div>
                <h3 className="text-white text-lg font-medium mb-2">Pro Quarterly</h3>
                <div className="mb-1">
                  <span className="text-2xl font-bold text-white">$15</span>
                  <span className="text-gray-200 ml-2 line-through text-sm">$20</span>
                </div>
                <div className="mb-4">
                  <span className="text-white text-sm">per month, paid quarterly</span>
                  <div className="bg-orange-500 text-white px-2 py-1 rounded text-xs inline-block ml-2">Save 25%</div>
                </div>
                <Button className="w-full bg-white text-blue-600 hover:bg-gray-100 mb-4">
                  Subscribe
                </Button>
                <p className="text-gray-200 text-xs">
                  Enjoy access to pro member features and unlimited chats for 3 months.
                </p>
              </div>

              {/* Pro Yearly */}
              <div className="bg-[#2a2a2a] rounded-lg p-4">
                <h3 className="text-white text-lg font-medium mb-2">Pro Yearly</h3>
                <div className="mb-1">
                  <span className="text-2xl font-bold text-white">$7.5</span>
                  <span className="text-gray-400 ml-2 line-through text-sm">$20</span>
                </div>
                <div className="mb-4">
                  <span className="text-white text-sm">per month, paid yearly</span>
                  <div className="bg-red-500 text-white px-2 py-1 rounded text-xs inline-block ml-2">Save 62%</div>
                </div>
                <Button className="w-full bg-[#444] hover:bg-[#555] text-white mb-4">
                  Subscribe
                </Button>
                <p className="text-gray-400 text-xs">
                  Access to all pro member-only features with unlimited chats for the entire year.
                </p>
              </div>
            </div>

            {/* Why go Pro section */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-white text-center mb-4">Why go Pro with Chatly?</h3>
              <p className="text-gray-400 text-center mb-6 text-sm">Multiple productivity needs, one solution</p>
              
              {/* Feature comparison */}
              <div className="bg-[#2a2a2a] rounded-lg p-4">
                <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                  <div>
                    <h4 className="text-white font-medium text-sm">Features</h4>
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-sm">Chatly</h4>
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-sm">OpenAI ChatGPT</h4>
                  </div>
                </div>

                {/* AI Chat Models */}
                <div className="mb-4">
                  <h5 className="text-white font-medium mb-3 text-sm">AI Chat Models</h5>
                  <div className="space-y-2">
                    {[
                      "OpenAI GPT-4.1",
                      "OpenAI o1-mini (Beta)",
                      "Google Gemini 2.5 Flash",
                      "X AI Grok 3 Mini",
                      "Deepseek R1",
                      "Anthropic Claude 4 Sonnet",
                      "Anthropic Claude 3.7 Sonnet"
                    ].map((model, index) => (
                      <div key={index} className="grid grid-cols-3 gap-4 items-center text-xs">
                        <span className="text-gray-300">{model}</span>
                        <div className="text-center">
                          <Check className="text-blue-500 mx-auto" size={16} />
                        </div>
                        <div className="text-center">
                          <div className="w-4 h-4 border-2 border-gray-500 rounded-full mx-auto"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Chat Features */}
                <div className="mb-4">
                  <h5 className="text-white font-medium mb-3 text-sm">AI Chat</h5>
                  <div className="space-y-2">
                    {[
                      { feature: "Chat with links", chatly: "Advanced", openai: "Limited" },
                      { feature: "Chat with documents", chatly: "Advanced", openai: "Limited" },
                      { feature: "Analyze data", chatly: "Advanced", openai: "Limited" },
                      { feature: "Chat with image", chatly: true, openai: false }
                    ].map((item, index) => (
                      <div key={index} className="grid grid-cols-3 gap-4 items-center text-xs">
                        <span className="text-gray-300">{item.feature}</span>
                        <div className="text-center">
                          {typeof item.chatly === 'boolean' ? (
                            item.chatly ? <Check className="text-blue-500 mx-auto" size={16} /> : 
                            <div className="w-4 h-4 border-2 border-gray-500 rounded-full mx-auto"></div>
                          ) : (
                            <span className="text-blue-400 text-xs">{item.chatly}</span>
                          )}
                        </div>
                        <div className="text-center">
                          {typeof item.openai === 'boolean' ? (
                            item.openai ? <Check className="text-blue-500 mx-auto" size={16} /> : 
                            <div className="w-4 h-4 border-2 border-gray-500 rounded-full mx-auto"></div>
                          ) : (
                            <span className="text-gray-400 text-xs">{item.openai}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Tools */}
                <div>
                  <h5 className="text-white font-medium mb-3 text-sm">AI Tools</h5>
                  <div className="space-y-2">
                    {[
                      { feature: "Image Generation", chatly: "Advanced", openai: "Limited" },
                      { feature: "AI Search Engine", chatly: "Advanced", openai: "Limited" }
                    ].map((item, index) => (
                      <div key={index} className="grid grid-cols-3 gap-4 items-center text-xs">
                        <span className="text-gray-300">{item.feature}</span>
                        <div className="text-center">
                          <span className="text-blue-400 text-xs">{item.chatly}</span>
                        </div>
                        <div className="text-center">
                          <span className="text-gray-400 text-xs">{item.openai}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div>
              <h3 className="text-lg font-medium text-white text-center mb-4">Frequently Asked Questions</h3>
              <p className="text-gray-400 text-center mb-6 text-sm">Discover more information by exploring our FAQ section.</p>
              
              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-[#2a2a2a] rounded-lg">
                    <button
                      className="w-full p-4 text-left flex items-center justify-between hover:bg-[#333] transition-colors rounded-lg"
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    >
                      <span className="text-white font-medium text-sm">{faq.question}</span>
                      {expandedFaq === index ? (
                        <ChevronUp className="text-gray-400 flex-shrink-0 ml-2" size={16} />
                      ) : (
                        <ChevronDown className="text-gray-400 flex-shrink-0 ml-2" size={16} />
                      )}
                    </button>
                    
                    {expandedFaq === index && (
                      <div className="px-4 pb-4">
                        <div className="text-gray-300 text-sm">
                          {faq.answer}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:block">
            {/* Pricing Header */}
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-medium text-white mb-4">Pricing Plans</h2>
              <p className="text-gray-400">Want to get more out of Chatly? Subscribe to one of our professional plans.</p>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-6xl mx-auto mb-8 md:mb-16">
              {/* Pro Monthly */}
              <div className="bg-[#2a2a2a] rounded-lg p-6 md:p-8">
                <h3 className="text-white text-lg md:text-xl font-medium mb-4">Pro Monthly</h3>
                <div className="mb-6">
                  <span className="text-3xl md:text-4xl font-bold text-white">$20</span>
                  <span className="text-gray-400 ml-2 text-sm md:text-base">per month, paid monthly</span>
                </div>
                <Button className="w-full bg-[#444] hover:bg-[#555] text-white mb-6">
                  Subscribe
                </Button>
                <p className="text-gray-400 text-sm">
                  Get a taste of pro membership and enjoy unlimited chats for one month.
                </p>
              </div>

              {/* Pro Quarterly - Popular */}
              <div className="bg-blue-600 rounded-lg p-6 md:p-8 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-800 text-white px-4 py-1 rounded text-sm font-medium">POPULAR</span>
                </div>
                <h3 className="text-white text-lg md:text-xl font-medium mb-4">Pro Quarterly</h3>
                <div className="mb-2">
                  <span className="text-3xl md:text-4xl font-bold text-white">$15</span>
                  <span className="text-gray-200 ml-2 line-through text-sm md:text-base">$20</span>
                </div>
                <div className="mb-6">
                  <span className="text-white text-sm md:text-base">per month, paid quarterly</span>
                  <div className="bg-orange-500 text-white px-2 py-1 rounded text-xs inline-block ml-2">Save 25%</div>
                </div>
                <Button className="w-full bg-white text-blue-600 hover:bg-gray-100 mb-6">
                  Subscribe
                </Button>
                <p className="text-gray-200 text-sm">
                  Enjoy access to pro member features and unlimited chats for 3 months.
                </p>
              </div>

              {/* Pro Yearly */}
              <div className="bg-[#2a2a2a] rounded-lg p-6 md:p-8">
                <h3 className="text-white text-lg md:text-xl font-medium mb-4">Pro Yearly</h3>
                <div className="mb-2">
                  <span className="text-3xl md:text-4xl font-bold text-white">$7.5</span>
                  <span className="text-gray-400 ml-2 line-through text-sm md:text-base">$20</span>
                </div>
                <div className="mb-6">
                  <span className="text-white text-sm md:text-base">per month, paid yearly</span>
                  <div className="bg-red-500 text-white px-2 py-1 rounded text-xs inline-block ml-2">Save 62%</div>
                </div>
                <Button className="w-full bg-[#444] hover:bg-[#555] text-white mb-6">
                  Subscribe
                </Button>
                <p className="text-gray-400 text-sm">
                  Access to all pro member-only features with unlimited chats for the entire year.
                </p>
              </div>
            </div>

            {/* Why go Pro section */}
            <div className="max-w-6xl mx-auto mb-8 md:mb-16">
              <h3 className="text-xl md:text-2xl font-medium text-white text-center mb-8">Why go Pro with Chatly?</h3>
              <p className="text-gray-400 text-center mb-8 md:mb-12">Multiple productivity needs, one solution</p>
              
              {/* Feature comparison */}
              <div className="bg-[#2a2a2a] rounded-lg p-4 md:p-8 overflow-x-auto">
                <div className="min-w-[600px]">
                  <div className="grid grid-cols-3 gap-4 md:gap-8 mb-8">
                    <div className="text-center">
                      <h4 className="text-white font-medium mb-2">Features</h4>
                    </div>
                    <div className="text-center">
                      <h4 className="text-white font-medium mb-2">Chatly</h4>
                    </div>
                    <div className="text-center">
                      <h4 className="text-white font-medium mb-2">OpenAI ChatGPT</h4>
                    </div>
                  </div>

                  {/* AI Chat Models */}
                  <div className="mb-6">
                    <h5 className="text-white font-medium mb-4">AI Chat Models</h5>
                    <div className="space-y-3">
                      {[
                        "OpenAI GPT-4.1",
                        "OpenAI o1-mini (Beta)",
                        "Google Gemini 2.5 Flash",
                        "X AI Grok 3 Mini",
                        "Deepseek R1",
                        "Anthropic Claude 4 Sonnet",
                        "Anthropic Claude 3.7 Sonnet"
                      ].map((model, index) => (
                        <div key={index} className="grid grid-cols-3 gap-4 md:gap-8 items-center">
                          <span className="text-gray-300 text-sm">{model}</span>
                          <div className="text-center">
                            <Check className="text-blue-500 mx-auto" size={20} />
                          </div>
                          <div className="text-center">
                            <div className="w-5 h-5 border-2 border-gray-500 rounded-full mx-auto"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI Chat Features */}
                  <div className="mb-6">
                    <h5 className="text-white font-medium mb-4">AI Chat</h5>
                    <div className="space-y-3">
                      {[
                        { feature: "Chat with links", chatly: "Advanced", openai: "Limited" },
                        { feature: "Chat with documents", chatly: "Advanced", openai: "Limited" },
                        { feature: "Analyze data", chatly: "Advanced", openai: "Limited" },
                        { feature: "Chat with image", chatly: true, openai: false }
                      ].map((item, index) => (
                        <div key={index} className="grid grid-cols-3 gap-4 md:gap-8 items-center">
                          <span className="text-gray-300 text-sm">{item.feature}</span>
                          <div className="text-center">
                            {typeof item.chatly === 'boolean' ? (
                              item.chatly ? <Check className="text-blue-500 mx-auto" size={20} /> : 
                              <div className="w-5 h-5 border-2 border-gray-500 rounded-full mx-auto"></div>
                            ) : (
                              <span className="text-blue-400 text-sm">{item.chatly}</span>
                            )}
                          </div>
                          <div className="text-center">
                            {typeof item.openai === 'boolean' ? (
                              item.openai ? <Check className="text-blue-500 mx-auto" size={20} /> : 
                              <div className="w-5 h-5 border-2 border-gray-500 rounded-full mx-auto"></div>
                            ) : (
                              <span className="text-gray-400 text-sm">{item.openai}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI Tools */}
                  <div>
                    <h5 className="text-white font-medium mb-4">AI Tools</h5>
                    <div className="space-y-3">
                      {[
                        { feature: "Image Generation", chatly: "Advanced", openai: "Limited" },
                        { feature: "AI Search Engine", chatly: "Advanced", openai: "Limited" }
                      ].map((item, index) => (
                        <div key={index} className="grid grid-cols-3 gap-4 md:gap-8 items-center">
                          <span className="text-gray-300 text-sm">{item.feature}</span>
                          <div className="text-center">
                            <span className="text-blue-400 text-sm">{item.chatly}</span>
                          </div>
                          <div className="text-center">
                            <span className="text-gray-400 text-sm">{item.openai}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="max-w-4xl mx-auto">
              <h3 className="text-xl md:text-2xl font-medium text-white text-center mb-8">Frequently Asked Questions</h3>
              <p className="text-gray-400 text-center mb-8">Discover more information by exploring our FAQ section.</p>
              
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-[#2a2a2a] rounded-lg">
                    <button
                      className="w-full p-4 md:p-6 text-left flex items-center justify-between hover:bg-[#333] transition-colors rounded-lg"
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    >
                      <span className="text-white font-medium text-sm md:text-base">{faq.question}</span>
                      {expandedFaq === index ? (
                        <ChevronUp className="text-gray-400 flex-shrink-0 ml-2" size={20} />
                      ) : (
                        <ChevronDown className="text-gray-400 flex-shrink-0 ml-2" size={20} />
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
    </div>
  );
};

export default Pricing;
