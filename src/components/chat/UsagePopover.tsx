
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface UsagePopoverProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UsagePopover = ({ isOpen, onClose }: UsagePopoverProps) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Desktop Popover */}
      <div className="hidden md:block">
        <div 
          className="fixed inset-0 z-40" 
          onClick={onClose}
        />
        <div className="absolute top-16 right-8 z-50 w-80 bg-[#2a2a2a] rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-white text-sm">👤</span>
            <span className="text-white text-sm font-medium">Free plan</span>
          </div>
          
          <div className="mb-4">
            <div className="text-white text-2xl font-bold mb-1">2 daily prompts left</div>
            <div className="bg-gray-600 text-white text-xs px-2 py-1 rounded inline-block">
              Refills in 24 hours
            </div>
          </div>
          
          <div className="text-gray-300 text-sm mb-4">
            Create and explore ideas with Chatly
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-300">1 of 3 messages used</span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-2">
              <div className="bg-orange-500 h-2 rounded-full" style={{ width: '33%' }}></div>
            </div>
          </div>
          
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            👑 Unlock more
          </Button>
        </div>
      </div>

      {/* Mobile Full Screen Modal */}
      <div className="md:hidden fixed inset-0 z-50 bg-[#1a1a1a] p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-lg font-medium">Usage</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="bg-[#2a2a2a] rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-white text-sm">👤</span>
            <span className="text-white text-sm font-medium">Free plan</span>
          </div>
          
          <div className="mb-4">
            <div className="text-white text-2xl font-bold mb-1">2 daily prompts left</div>
            <div className="bg-gray-600 text-white text-xs px-2 py-1 rounded inline-block">
              Refills in 24 hours
            </div>
          </div>
          
          <div className="text-gray-300 text-sm mb-4">
            Create and explore ideas with Chatly
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-300">1 of 3 messages used</span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-2">
              <div className="bg-orange-500 h-2 rounded-full" style={{ width: '33%' }}></div>
            </div>
          </div>
          
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            👑 Unlock more
          </Button>
        </div>
      </div>
    </>
  );
};
