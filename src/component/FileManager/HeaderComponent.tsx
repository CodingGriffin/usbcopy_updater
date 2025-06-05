import { useState } from 'react';
import { Menu, Binary as Binoculars } from 'lucide-react';

function Header() {
  
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg sm:text-xl font-semibold text-gray-800">File Manager</h1>
          <div className="flex items-center gap-4">
            <button
              disabled
              className="hidden sm:flex items-center px-3 py-2 bg-gray-100 text-gray-500 rounded-lg cursor-not-allowed text-sm"
            >
              <Binoculars className="w-4 h-4 mr-1.5" />
              <span>View Active Uploads</span>
            </button>
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="sm:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header;