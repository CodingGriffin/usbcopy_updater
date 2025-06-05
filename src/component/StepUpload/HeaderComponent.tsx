interface HeaderProps {
  activeTab: string;
  continueSetup: () => void;
}

function Header({activeTab, continueSetup}: HeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold mb-1 dark:text-white">Partition #1</h1>
          <div className="group relative">
            <button className="text-gray-400 hover:text-gray-300">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <div className="absolute left-1/2 top-full mt-2 w-64 -translate-x-1/2 hidden group-hover:block">
              <div className="bg-gray-900 text-sm text-gray-300 rounded-lg p-3 shadow-lg">
                USB drives require at least one partition to function. Most users only need a single partition for optimal performance and ease of use.
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-green-500/10 text-green-500 text-xs px-2 py-1 rounded-full">No Write-Protection</span>
          <a href="#" className="text-xs text-blue-400 hover:text-blue-300">Contact Sales</a>
        </div>
      </div>
      <div className="text-center flex justify-end">
        <button 
              className={`${activeTab !== 'advanced' ? 'hidden': ''} inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600`}
              >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Partition
        </button>
        <button
          onClick={continueSetup}
          // disabled={!(nameIconStep == 3)}
          className={`ml-4 px-4 py-2 rounded-md ${
            // nameIconStep == 3
              // ? 'bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600'
              'border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm text-gray-800 font-medium dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  )
}

export default Header;