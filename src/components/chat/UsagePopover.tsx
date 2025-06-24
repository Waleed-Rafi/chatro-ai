
interface UsagePopoverProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UsagePopover = ({ isOpen, onClose }: UsagePopoverProps) => {
  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 z-40" 
        onClick={onClose}
      />
      <div className="absolute top-16 right-20 z-50 w-80 bg-[#1a1a1a] rounded-lg shadow-lg p-6">
        <h3 className="text-white font-medium mb-4">Usage</h3>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400 text-sm">Messages</span>
              <span className="text-white text-sm">15 / 50</span>
            </div>
            <div className="w-full bg-[#333] rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '30%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400 text-sm">GPT-4 Messages</span>
              <span className="text-white text-sm">5 / 10</span>
            </div>
            <div className="w-full bg-[#333] rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full" style={{ width: '50%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400 text-sm">Image Generation</span>
              <span className="text-white text-sm">2 / 5</span>
            </div>
            <div className="w-full bg-[#333] rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '40%' }}></div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-3 bg-[#0d0d0d] rounded-lg">
          <p className="text-gray-400 text-sm">
            Upgrade to Pro for unlimited usage and premium features.
          </p>
        </div>
      </div>
    </>
  );
};
