import { useState } from 'react';
import { Smartphone, Tag, ExternalLink, ChevronDown, ChevronRight } from 'lucide-react';

const NFCRedirectComponent = () => {
  const [activeTab, setActiveTab] = useState('scan');
  const [showInstructions, setShowInstructions] = useState(false);
  
  // This would be replaced with your actual site URL
  const siteUrl = "https://yoursite.com";
  
  const handleCopyUrl = () => {
    navigator.clipboard.writeText(siteUrl);
    alert("URL copied to clipboard!");
  };

  return (
    <div className="w-full bg-white rounded-lg shadow">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">NFC Tag Redirector</h1>
        
        <div className="mb-6">
          <div className="flex border-b border-gray-200">
            <button 
              className={`px-4 py-2 font-medium text-sm ${activeTab === 'scan' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('scan')}
            >
              Scan NFC Tag
            </button>
            <button 
              className={`px-4 py-2 font-medium text-sm ${activeTab === 'create' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('create')}
            >
              Create NFC Tag
            </button>
          </div>
        </div>
        
        {activeTab === 'scan' && (
          <div className="space-y-6">
            <div className="text-center py-8 px-4 bg-blue-50 rounded-lg">
              <Smartphone size={64} className="mx-auto text-blue-600 mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Scan NFC Tag to Visit Our Site</h2>
              <p className="text-gray-600 mb-4">Simply hold your phone near an NFC tag to be redirected to our website.</p>
              
              <div className="flex justify-center space-x-4 mb-6">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                    <span className="font-semibold text-blue-700">1</span>
                  </div>
                  <p className="text-sm text-gray-600">Enable NFC</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                    <span className="font-semibold text-blue-700">2</span>
                  </div>
                  <p className="text-sm text-gray-600">Hold Phone Near Tag</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                    <span className="font-semibold text-blue-700">3</span>
                  </div>
                  <p className="text-sm text-gray-600">Get Redirected</p>
                </div>
              </div>
              
              <div className="flex justify-center">
                <a href={siteUrl} className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                  <ExternalLink size={16} className="mr-2" />
                  Visit Our Site Manually
                </a>
              </div>
            </div>
            
            <div>
              <button 
                className="flex items-center w-full justify-between p-4 bg-gray-50 rounded-md text-left text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={() => setShowInstructions(!showInstructions)}
              >
                <span className="font-medium">Troubleshooting NFC Scanning</span>
                {showInstructions ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
              </button>
              
              {showInstructions && (
                <div className="p-4 border border-gray-200 rounded-md mt-2 text-sm text-gray-600 space-y-2">
                  <p>• Make sure NFC is enabled in your phone settings</p>
                  <p>• Hold the phone close to the NFC tag (within 4cm/1.5 inches)</p>
                  <p>• Try different positions if the tag isn't scanning immediately</p>
                  <p>• Remove your phone case if it's very thick or contains metal</p>
                  <p>• For iPhone users: make sure "NFC Tag Reading" is enabled</p>
                </div>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'create' && (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Create Your Own NFC Tag</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Website URL to Encode</label>
                <div className="flex">
                  <input
                    type="text"
                    value={siteUrl}
                    className="flex-1 p-2 border border-gray-300 rounded-l-md text-gray-900"
                    readOnly
                  />
                  <button
                    onClick={handleCopyUrl}
                    className="bg-gray-200 px-4 py-2 rounded-r-md hover:bg-gray-300 transition-colors"
                  >
                    Copy
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Use this URL when programming your NFC tags</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-md p-4">
                  <h3 className="font-medium text-gray-800 mb-2">What You'll Need</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Blank NFC tags (NTAG213/215/216 recommended)</li>
                    <li>• Smartphone with NFC capabilities</li>
                    <li>• NFC Writer app (NFC Tools recommended)</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-md p-4">
                  <h3 className="font-medium text-gray-800 mb-2">Programming Steps</h3>
                  <ol className="text-sm text-gray-600 space-y-1 list-decimal pl-4">
                    <li>Install an NFC Writer app</li>
                    <li>Select "Write" or "Add record"</li>
                    <li>Choose "URL/URI" option</li>
                    <li>Paste the URL shown above</li>
                    <li>Hold tag to back of phone to write</li>
                  </ol>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start">
                <Tag size={40} className="text-blue-600 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">NFC Tag Placement Ideas</h3>
                  <p className="text-sm text-gray-600 mb-2">Place your programmed NFC tags in strategic locations:</p>
                  <ul className="text-sm text-gray-600 grid grid-cols-2 gap-x-4 gap-y-1">
                    <li>• Business cards</li>
                    <li>• Store entrance</li>
                    <li>• Product packaging</li>
                    <li>• Event badges</li>
                    <li>• Posters/flyers</li>
                    <li>• Reception desk</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NFCRedirectComponent;