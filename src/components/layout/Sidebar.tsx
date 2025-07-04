
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, MessageSquare, Image, Search, HelpCircle, BarChart, Settings, CreditCard, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { SettingsModal } from "@/components/modals/SettingsModal";

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onOpenPricing: () => void;
}

export const Sidebar = ({ isCollapsed, onToggleCollapse, onOpenPricing }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile Overlay Sidebar */}
      {isMobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-50 md:hidden animate-fade-in" 
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed left-0 top-0 bottom-0 w-80 bg-sidebar z-50 md:hidden flex flex-col animate-slide-in">
            {/* Header */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold">C</span>
                </div>
                <span className="text-white font-semibold">Chatro</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </Button>
            </div>

            {/* Start New Button */}
            <div className="px-4 mb-4">
              <Button 
                className="w-full bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white justify-start"
                variant="outline"
                onClick={() => {
                  navigate('/');
                  setIsMobileMenuOpen(false);
                }}
              >
                <Plus size={16} className="mr-2" />
                Start New
              </Button>
            </div>

            {/* Tools Section */}
            <div className="flex-1 px-4">
              <div className="text-xs text-gray-400 mb-2 px-2">Tools</div>
              <div className="space-y-1 mb-6">
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start ${
                    isActive('/') 
                      ? 'text-white bg-[#1a1a1a]' 
                      : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]'
                  }`}
                  onClick={() => {
                    navigate('/');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <MessageSquare size={16} className="mr-3" />
                  AI Chat
                </Button>
                
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start ${
                    isActive('/image-generation') 
                      ? 'text-white bg-[#1a1a1a]' 
                      : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]'
                  }`}
                  onClick={() => {
                    navigate('/image-generation');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Image size={16} className="mr-3" />
                  Image Generation
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-gray-400 hover:text-white hover:bg-[#1a1a1a]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Search size={16} className="mr-3" />
                  AI Search Engine
                  <span className="ml-auto text-xs bg-blue-600 px-1.5 py-0.5 rounded">BETA</span>
                </Button>
              </div>

              <div className="text-xs text-gray-400 mb-2 px-2">Others</div>
              <div className="space-y-1">
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start ${
                    isActive('/support') 
                      ? 'text-white bg-[#1a1a1a]' 
                      : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]'
                  }`}
                  onClick={() => {
                    navigate('/support');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <HelpCircle size={16} className="mr-3" />
                  Support
                </Button>
                
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start ${
                    isActive('/pricing') 
                      ? 'text-white bg-[#1a1a1a]' 
                      : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]'
                  }`}
                  onClick={() => {
                    navigate('/pricing');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <CreditCard size={16} className="mr-3" />
                  Pricing Plans
                </Button>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="p-4">
              {isLoggedIn && (
                <div className="mb-4">
                  <div className="text-xs text-gray-400 mb-2">Unlock all premium features</div>
                  <div className="text-xs text-gray-500 mb-3">Supercharge your productivity with Chatro Pro</div>
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => {
                      onOpenPricing();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    👑 Upgrade
                  </Button>
                </div>
              )}
              
              {/* Profile Section */}
              {isLoggedIn && (
                <div className="relative">
                  <div 
                    className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-[#1a1a1a]"
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                  >
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                      <span className="text-xs">WR</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-white">Waleed Rafi</div>
                    </div>
                    {isProfileOpen ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                  </div>

                  {isProfileOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setIsProfileOpen(false)}
                      />
                      <div className="absolute bottom-full left-0 mb-2 w-full bg-[#2a2a2a] rounded-lg shadow-lg z-50 p-2">
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-white hover:bg-[#333] p-3"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <Settings size={16} className="mr-3" />
                          Settings
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-white hover:bg-[#333] p-3"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <span className="mr-3">↗</span>
                          Log out
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Desktop Sidebar */}
      <div className={`bg-sidebar transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      } flex flex-col fixed h-full z-40 hidden md:flex border-r border-sidebar-border`}>
        {/* Header */}
        <div className="p-3">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold">C</span>
                </div>
                <span className="text-sidebar-foreground font-semibold">Chatro</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleCollapse}
              className="text-sidebar-foreground/60 hover:text-sidebar-foreground p-1"
            >
              {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </Button>
          </div>
        </div>

        <div className="p-3">
          <Button 
            className="w-full bg-sidebar-accent hover:bg-sidebar-accent/80 text-sidebar-foreground justify-start"
            variant="outline"
            onClick={() => navigate('/')}
          >
            <Plus size={16} className="mr-2" />
            {!isCollapsed && "Start New"}
          </Button>
        </div>

        <div className="flex-1 px-3">
          {!isCollapsed && (
            <div className="text-xs text-sidebar-foreground/60 mb-2 px-2">Tools</div>
          )}
          
          <div className="space-y-1">
            <Button 
              variant="ghost" 
              className={`w-full justify-start ${
                isActive('/') 
                  ? 'text-sidebar-foreground bg-sidebar-accent' 
                  : 'text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent'
              }`}
              onClick={() => navigate('/')}
            >
              <MessageSquare size={16} className="mr-3" />
              {!isCollapsed && "AI Chat"}
            </Button>
            
            <Button 
              variant="ghost" 
              className={`w-full justify-start ${
                isActive('/image-generation') 
                  ? 'text-sidebar-foreground bg-sidebar-accent' 
                  : 'text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent'
              }`}
              onClick={() => navigate('/image-generation')}
            >
              <Image size={16} className="mr-3" />
              {!isCollapsed && "Image Generation"}
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <Search size={16} className="mr-3" />
              {!isCollapsed && "AI Search Engine"}
              {!isCollapsed && <span className="ml-auto text-xs bg-blue-600 px-1.5 py-0.5 rounded">BETA</span>}
            </Button>
          </div>

          {!isCollapsed && (
            <div className="text-xs text-sidebar-foreground/60 mb-2 px-2 mt-6">Others</div>
          )}
          
          <div className="space-y-1">
            <Button 
              variant="ghost" 
              className={`w-full justify-start ${
                isActive('/support') 
                  ? 'text-sidebar-foreground bg-sidebar-accent' 
                  : 'text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent'
              }`}
              onClick={() => navigate('/support')}
            >
              <HelpCircle size={16} className="mr-3" />
              {!isCollapsed && "Support"}
            </Button>
            
            <Button 
              variant="ghost" 
              className={`w-full justify-start ${
                isActive('/pricing') 
                  ? 'text-sidebar-foreground bg-sidebar-accent' 
                  : 'text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent'
              }`}
              onClick={() => navigate('/pricing')}
            >
              <CreditCard size={16} className="mr-3" />
              {!isCollapsed && "Pricing Plans"}
            </Button>
          </div>
        </div>

        <div className="p-3">
          {isLoggedIn && !isCollapsed && (
            <div className="mb-3">
              <div className="text-xs text-sidebar-foreground/60 mb-2">Unlock all premium features</div>
              <div className="text-xs text-sidebar-foreground/50 mb-3">Supercharge your productivity with Chatro Pro</div>
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                onClick={onOpenPricing}
              >
                👑 Upgrade
              </Button>
            </div>
          )}
          
          {isLoggedIn && (
            <div className="relative">
              <div 
                className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-sidebar-accent"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-xs">WR</span>
                </div>
                {!isCollapsed && (
                  <>
                    <div className="flex-1">
                      <div className="text-sm text-sidebar-foreground">Waleed Rafi</div>
                    </div>
                    {isProfileOpen ? <ChevronUp size={16} className="text-sidebar-foreground/60" /> : <ChevronDown size={16} className="text-sidebar-foreground/60" />}
                  </>
                )}
              </div>

              {isProfileOpen && !isCollapsed && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsProfileOpen(false)}
                  />
                  <div className="absolute bottom-full left-0 mb-2 w-full bg-sidebar-accent rounded-lg shadow-lg z-50 p-2 animate-fade-in">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/80 p-3"
                      onClick={() => {
                        setIsSettingsOpen(true);
                        setIsProfileOpen(false);
                      }}
                    >
                      <Settings size={16} className="mr-3" />
                      Settings
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 bg-background p-4 flex items-center justify-between z-30 md:hidden border-b border-border">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(true)}
            className="text-foreground/60 hover:text-foreground p-1"
          >
            <ChevronRight size={20} />
          </Button>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold">C</span>
            </div>
            <span className="text-foreground font-semibold">Chatro</span>
          </div>
        </div>
      </div>

      <SettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </>
  );
};
