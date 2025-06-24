
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface HistoryPopoverProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HistoryPopover = ({ isOpen, onClose }: HistoryPopoverProps) => {
  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 z-40" 
        onClick={onClose}
      />
      <div className="absolute top-16 right-4 z-50 w-80 bg-[#1a1a1a] rounded-lg shadow-lg">
        {/* Header */}
        <div className="p-4">
          <h3 className="text-white font-medium mb-4">History</h3>
          
          {/* Search */}
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search..."
              className="bg-[#0d0d0d] text-white placeholder-gray-500 pl-10"
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-4 pt-0 max-h-80 overflow-y-auto">
          <div className="text-center py-8">
            <div className="text-gray-400 mb-2">Today</div>
            <div className="text-sm text-gray-500">General Chat and Greetings</div>
          </div>
        </div>
      </div>
    </>
  );
};
