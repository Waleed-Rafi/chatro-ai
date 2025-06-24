
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ModelSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModelSelector = ({ isOpen, onClose }: ModelSelectorProps) => {
  if (!isOpen) return null;

  const models = [
    {
      name: "OpenAI GPT-4o-mini",
      description: "OpenAI's fastest compact model",
      isPro: false,
      isSelected: true
    },
    {
      name: "Google Gemini 2.5 Flash",
      description: "Google's latest reasoning model", 
      isPro: false,
      isNew: true
    },
    {
      name: "Grok 3 Mini",
      description: "X AI's advanced reasoning model",
      isPro: false,
      isNew: true
    },
    {
      name: "OpenAI GPT-4.1-nano",
      description: "OpenAI's fastest compact model",
      isPro: false,
      isNew: true
    },
    {
      name: "OpenAI o4-mini",
      description: "OpenAI's efficient reasoning model",
      isPro: false,
      isNew: true
    },
    {
      name: "Anthropic Claude 4 Sonnet",
      description: "Anthropic's best coding model",
      isPro: true,
      isNew: true
    },
    {
      name: "OpenAI GPT-4.1",
      description: "OpenAI's most advanced model",
      isPro: true,
      isNew: true
    },
    {
      name: "OpenAI o4-mini (High)",
      description: "OpenAI's best reasoning model",
      isPro: true,
      isNew: true
    },
    {
      name: "OpenAI GPT-4o",
      description: "OpenAI's most advanced model",
      isPro: true
    },
    {
      name: "Deepseek R1",
      description: "Optimized for reasoning tasks",
      isPro: true,
      isPreview: true
    },
    {
      name: "Anthropic Claude 3.7 Sonnet",
      description: "Anthropic's most advanced model",
      isPro: true
    }
  ];

  return (
    <>
      <div 
        className="fixed inset-0 z-40" 
        onClick={onClose}
      />
      <div className="absolute top-16 left-4 z-50 w-80 bg-[#1a1a1a] rounded-lg shadow-lg">
        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search..."
              className="bg-[#0d0d0d] text-white placeholder-gray-500 pl-10"
            />
          </div>
        </div>

        {/* Models List */}
        <div className="space-y-1 max-h-96 overflow-y-auto p-4 pt-0">
          {models.map((model, index) => (
            <div
              key={index}
              className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                model.isSelected 
                  ? 'bg-[#333]' 
                  : 'hover:bg-[#333]'
              }`}
              onClick={onClose}
            >
              <div className="w-8 h-8 bg-[#333] rounded-full flex items-center justify-center">
                <span className="text-xs">🤖</span>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-white font-medium text-sm">{model.name}</span>
                  {model.isNew && (
                    <span className="text-xs bg-blue-600 px-1.5 py-0.5 rounded text-white">NEW</span>
                  )}
                  {model.isPro && (
                    <span className="text-xs bg-purple-600 px-1.5 py-0.5 rounded text-white">Pro</span>
                  )}
                  {model.isPreview && (
                    <span className="text-xs bg-gray-600 px-1.5 py-0.5 rounded text-white">PREVIEW</span>
                  )}
                </div>
                <div className="text-gray-400 text-xs">{model.description}</div>
              </div>

              <div className="w-4 h-4 border border-gray-500 rounded-full flex items-center justify-center">
                {model.isSelected && <div className="w-2 h-2 bg-white rounded-full"></div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
