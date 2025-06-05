import { useState } from 'react';
import { Menu, Binary as Binoculars } from 'lucide-react';

interface HeaderProps {
  pad_line_items_id: number;
  setStep: (id: number) => void;
  updateStatus: (pad_line_items_id: number) => void;
}

function Header({setStep, updateStatus, pad_line_items_id} : HeaderProps) {
  
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  

  const continueSetup = async () => {
    await updateStatus(pad_line_items_id);
    await setStep(3);
  }

  return (
    <div className="border-b border-gray-200 top-0 z-10">
      <div className="px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">Artwork Manager</h1>
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
            {/* <button
              onClick={continueSetup}
              // disabled={!(nameIconStep == 3)}
              className={`px-4 py-2 rounded-md text-white ${
                // nameIconStep == 3
                  'bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600'
                  // : 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
              }`}
            >
              Continue
            </button> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header;