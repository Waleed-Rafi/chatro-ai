
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
          <div className="fixed left-0 top-0 bottom-0 w-80 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 z-50 md:hidden flex flex-col animate-slide-in border-r border-gray-200 dark:border-gray-700">
            {/* Header */}
            <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">C</span>
                </div>
                <span className="text-gray-900 dark:text-white font-semibold">Chatly</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X size={20} />
              </Button>
            </div>

            {/* Start New Button */}
            <div className="px-4 pt-4 mb-4">
              <Button 
                className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white justify-start border border-gray-200 dark:border-gray-700"
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
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-3 px-2 font-medium">Tools</div>
              <div className="space-y-1 mb-6">
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start ${
                    isActive('/') 
                      ? 'text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
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
                      ? 'text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
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
                  className="w-full justify-start text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Search size={16} className="mr-3" />
                  AI Search Engine
                  <span className="ml-auto text-xs bg-blue-600 px-1.5 py-0.5 rounded text-white">BETA</span>
                </Button>
              </div>

              <div className="text-xs text-gray-500 dark:text-gray-400 mb-3 px-2 font-medium">Others</div>
              <div className="space-y-1">
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start ${
                    isActive('/support') 
                      ? 'text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
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
                      ? 'text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
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
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              {isLoggedIn && (
                <div className="mb-4">
                  <div className="text-xs text-gray-600 dark:text-gray-400 mb-2 font-medium">Unlock all premium features</div>
                  <div className="text-xs text-gray-500 dark:text-gray-500 mb-3">Supercharge your productivity with Chatly Pro</div>
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
                    className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                  >
                    <div className="w-8 h-8 bg-gray-400 dark:bg-gray-600 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white">WR</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-900 dark:text-white">Waleed Rafi</div>
                    </div>
                    {isProfileOpen ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                  </div>

                  {isProfileOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setIsProfileOpen(false)}
                      />
                      <div className="absolute bottom-full left-0 mb-2 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50 p-2 border border-gray-200 dark:border-gray-700">
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 p-3"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <Settings size={16} className="mr-3" />
                          Settings
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 p-3"
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
      <div className={`bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      } flex flex-col fixed h-full z-40 hidden md:flex border-r border-gray-200 dark:border-gray-700`}>
        {/* Header */}
        <div className="p-3 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">C</span>
                </div>
                <span className="text-gray-900 dark:text-white font-semibold">Chatly</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleCollapse}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white p-1"
            >
              {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </Button>
          </div>
        </div>

        <div className="p-3">
          <Button 
            className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white justify-start border border-gray-200 dark:border-gray-700"
            variant="outline"
            onClick={() => navigate('/')}
          >
            <Plus size={16} className="mr-2" />
            {!isCollapsed && "Start New"}
          </Button>
        </div>

        <div className="flex-1 px-3">
          {!isCollapsed && (
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-3 px-2 font-medium">Tools</div>
          )}
          
          <div className="space-y-1">
            <Button 
              variant="ghost" 
              className={`w-full justify-start ${
                isActive('/') 
                  ? 'text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
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
                  ? 'text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
              onClick={() => navigate('/image-generation')}
            >
              <Image size={16} className="mr-3" />
              {!isCollapsed && "Image Generation"}
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <Search size={16} className="mr-3" />
              {!isCollapsed && "AI Search Engine"}
              {!isCollapsed && <span className="ml-auto text-xs bg-blue-600 px-1.5 py-0.5 rounded text-white">BETA</span>}
            </Button>
          </div>

          {!isCollapsed && (
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-3 px-2 mt-6 font-medium">Others</div>
          )}
          
          <div className="space-y-1">
            <Button 
              variant="ghost" 
              className={`w-full justify-start ${
                isActive('/support') 
                  ? 'text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
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
                  ? 'text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
              onClick={() => navigate('/pricing')}
            >
              <CreditCard size={16} className="mr-3" />
              {!isCollapsed && "Pricing Plans"}
            </Button>
          </div>
        </div>

        <div className="p-3 border-t border-gray-200 dark:border-gray-700">
          {isLoggedIn && !isCollapsed && (
            <div className="mb-3">
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-2 font-medium">Unlock all premium features</div>
              <div className="text-xs text-gray-500 dark:text-gray-500 mb-3">Supercharge your productivity with Chatly Pro</div>
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
                className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <div className="w-8 h-8 bg-gray-400 dark:bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white">WR</span>
                </div>
                {!isCollapsed && (
                  <>
                    <div className="flex-1">
                      <div className="text-sm text-gray-900 dark:text-white">Waleed Rafi</div>
                    </div>
                    {isProfileOpen ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                  </>
                )}
              </div>

              {isProfileOpen && !isCollapsed && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsProfileOpen(false)}
                  />
                  <div className="absolute bottom-full left-0 mb-2 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50 p-2 animate-fade-in border border-gray-200 dark:border-gray-700">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 p-3"
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
              <span className="text-xs font-bold text-white">C</span>
            </div>
            <span className="text-foreground font-semibold">Chatly</span>
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
