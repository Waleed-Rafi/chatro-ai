
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

interface ChatHistoryProps {
  onClose: () => void;
}

export const ChatHistory = ({ onClose }: ChatHistoryProps) => {
  return (
    <div className="w-80 bg-[#0d0d0d] border-l border-[#333] flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-[#333] flex items-center justify-between">
        <h3 className="text-white font-medium">History</h3>
        <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white">
          <X size={16} />
        </Button>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search..."
            className="bg-[#1a1a1a] border-[#333] text-white placeholder-gray-500 pl-10"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        <div className="text-center">
          <div className="text-gray-400 mb-2">Today</div>
          <div className="text-sm text-gray-500">General Chat and Greetings</div>
        </div>
      </div>
    </div>
  );
};
