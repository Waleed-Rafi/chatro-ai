
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { X, Check, Crown } from "lucide-react";

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PricingModal = ({ isOpen, onClose }: PricingModalProps) => {
  const features = [
    {
      name: "Advanced AI Models",
      description: "Gemini 2.5 Flash, Grok 3 Mini, OpenAI GPT-4.1, o4-mini(High) and more",
      free: false,
      pro: true
    },
    {
      name: "AI Chat without limits",
      description: "Unlimited chats with all models",
      free: false,
      pro: true
    },
    {
      name: "240 images with Image Generation",
      description: "Get more images with image generation",
      free: false,
      pro: true
    },
    {
      name: "Unlimited access to AI Search Engine",
      description: "Get unlimited searches with AI Search Engine",
      free: false,
      pro: true
    },
    {
      name: "Chat with PDF, docs, and more",
      description: "Analyze PDFs, docs, sheets, etc",
      free: false,
      pro: true
    },
    {
      name: "Unlimited file uploads",
      description: "Upload and process unlimited files",
      free: false,
      pro: true
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xs sm:max-w-lg md:max-w-3xl lg:max-w-5xl bg-[#1a1a1a] border-[#333] text-white p-0 max-h-[90vh] overflow-y-auto">
        <div className="flex flex-col lg:flex-row">
          {/* Left side - Features */}
          <div className="flex-1 p-4 sm:p-6 lg:p-8">
            <DialogHeader className="mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold">C</span>
                  </div>
                  <span className="text-white font-semibold">Chatly</span>
                </div>
                <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white">
                  <X size={16} />
                </Button>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-left">Combined Access to All Features</h2>
            </DialogHeader>

            <div className="space-y-4">
              <div className="hidden sm:grid grid-cols-3 gap-4 text-center mb-6">
                <div></div>
                <div className="text-gray-400 font-medium">Free</div>
                <div className="text-gray-400 font-medium">Pro</div>
              </div>

              {features.map((feature, index) => (
                <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center py-3 border-b border-[#333]">
                  <div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-[#333] rounded-lg flex items-center justify-center">
                        {feature.name.includes("AI Models") && "🤖"}
                        {feature.name.includes("Chat without") && "💬"}
                        {feature.name.includes("images") && "🎨"}
                        {feature.name.includes("Search") && "🔍"}
                        {feature.name.includes("PDF") && "📄"}
                        {feature.name.includes("file uploads") && "∞"}
                      </div>
                      <div>
                        <div className="text-white font-medium text-sm">{feature.name}</div>
                        <div className="text-gray-400 text-xs">{feature.description}</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center hidden sm:block">
                    {feature.free ? (
                      <Check size={16} className="text-green-500 mx-auto" />
                    ) : (
                      <div className="w-4 h-4 bg-gray-600 rounded-full mx-auto"></div>
                    )}
                  </div>
                  <div className="text-center hidden sm:block">
                    <Check size={16} className="text-green-500 mx-auto" />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button variant="link" className="text-blue-400 hover:text-blue-300">
                View all plans to learn more
              </Button>
            </div>
          </div>

          {/* Right side - Pricing */}
          <div className="w-full lg:w-96 bg-[#0d0d0d] p-4 sm:p-6 lg:p-8">
            <div className="text-center mb-6">
              <h3 className="text-xl sm:text-2xl font-bold mb-2">Upgrade your plan ✨</h3>
            </div>

            <div className="space-y-4">
              {/* Pro Monthly */}
              <div className="border border-[#333] rounded-lg p-4">
                <div className="text-white font-medium">Pro Monthly</div>
                <div className="text-gray-400 text-sm">20 USD/month</div>
                <div className="text-right text-lg font-bold">0.67 USD/day</div>
              </div>

              {/* Pro Quarterly - Highlighted */}
              <div className="border-2 border-blue-500 rounded-lg p-4 relative">
                <div className="absolute -top-2 left-4">
                  <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">Save 25%</span>
                </div>
                <div className="text-white font-medium">Pro Quarterly</div>
                <div className="text-gray-400 text-sm">45 USD/quarter</div>
                <div className="text-right text-lg font-bold">0.5 USD/day</div>
              </div>

              {/* Pro Yearly */}
              <div className="border border-[#333] rounded-lg p-4 relative">
                <div className="absolute -top-2 left-4">
                  <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded">Save 63%</span>
                </div>
                <div className="text-white font-medium">Pro Yearly</div>
                <div className="text-gray-400 text-sm">90 USD/year</div>
                <div className="text-right text-lg font-bold">0.25 USD/day</div>
              </div>
            </div>

            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-6 py-3 text-lg font-medium">
              Continue
            </Button>

            <div className="text-center mt-4">
              <div className="text-gray-400 text-sm mb-2">🔒 Pay Safe and Secure with</div>
              <div className="flex justify-center space-x-2 flex-wrap">
                <div className="w-8 h-5 bg-blue-600 rounded text-xs flex items-center justify-center text-white">PP</div>
                <div className="w-8 h-5 bg-blue-800 rounded text-xs flex items-center justify-center text-white">V</div>
                <div className="w-8 h-5 bg-red-600 rounded text-xs flex items-center justify-center text-white">MC</div>
                <div className="w-8 h-5 bg-blue-700 rounded text-xs flex items-center justify-center text-white">AE</div>
                <div className="w-8 h-5 bg-orange-600 rounded text-xs flex items-center justify-center text-white">D</div>
                <div className="w-8 h-5 bg-green-600 rounded text-xs flex items-center justify-center text-white">JCB</div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
