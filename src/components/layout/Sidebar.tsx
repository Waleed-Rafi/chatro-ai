
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, MessageSquare, Image, Search, HelpCircle, BarChart, Settings, CreditCard, ChevronLeft, ChevronRight } from "lucide-react";

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onOpenPricing: () => void;
}

export const Sidebar = ({ isCollapsed, onToggleCollapse, onOpenPricing }: SidebarProps) => {
  return (
    <div className={`bg-[#0d0d0d] border-r border-[#333] transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    } flex flex-col`}>
      {/* Header */}
      <div className="p-3 border-b border-[#333]">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold">C</span>
              </div>
              <span className="text-white font-semibold">Chatly</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="text-gray-400 hover:text-white p-1"
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </Button>
        </div>
      </div>

      {/* Start New Button */}
      <div className="p-3">
        <Button 
          className="w-full bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#333] text-white justify-start"
          variant="outline"
        >
          <Plus size={16} className="mr-2" />
          {!isCollapsed && "Start New"}
        </Button>
      </div>

      {/* Tools Section */}
      <div className="flex-1 px-3">
        {!isCollapsed && (
          <div className="text-xs text-gray-400 mb-2 px-2">Tools</div>
        )}
        
        <div className="space-y-1">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-white bg-[#1a1a1a] hover:bg-[#2a2a2a]"
          >
            <MessageSquare size={16} className="mr-3" />
            {!isCollapsed && "AI Chat"}
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start text-gray-400 hover:text-white hover:bg-[#1a1a1a]"
          >
            <Image size={16} className="mr-3" />
            {!isCollapsed && "Image Generation"}
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start text-gray-400 hover:text-white hover:bg-[#1a1a1a]"
          >
            <Search size={16} className="mr-3" />
            {!isCollapsed && "AI Search Engine"}
            {!isCollapsed && <span className="ml-auto text-xs bg-blue-600 px-1.5 py-0.5 rounded">BETA</span>}
          </Button>
        </div>

        {!isCollapsed && (
          <div className="text-xs text-gray-400 mb-2 px-2 mt-6">Others</div>
        )}
        
        <div className="space-y-1">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-gray-400 hover:text-white hover:bg-[#1a1a1a]"
          >
            <HelpCircle size={16} className="mr-3" />
            {!isCollapsed && "Support"}
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start text-gray-400 hover:text-white hover:bg-[#1a1a1a]"
            onClick={onOpenPricing}
          >
            <CreditCard size={16} className="mr-3" />
            {!isCollapsed && "Pricing Plans"}
          </Button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="p-3 border-t border-[#333]">
        {!isCollapsed && (
          <div className="mb-3">
            <div className="text-xs text-gray-400 mb-2">Unlock all premium features</div>
            <div className="text-xs text-gray-500 mb-3">Supercharge your productivity with Chatly Pro</div>
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={onOpenPricing}
            >
              ⬆ Upgrade
            </Button>
          </div>
        )}
        
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
            <span className="text-xs">WR</span>
          </div>
          {!isCollapsed && (
            <div className="flex-1">
              <div className="text-sm text-white">Waleed Rafi</div>
            </div>
          )}
          {!isCollapsed && <ChevronRight size={16} className="text-gray-400" />}
        </div>
      </div>
    </div>
  );
};
