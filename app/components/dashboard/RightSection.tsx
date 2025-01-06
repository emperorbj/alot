import { FaBellSlash, FaHistory } from 'react-icons/fa';

export default function RightSection() {
  return (
    <div className="space-y-6 lg:p-0 md:p-8">
      {/* Notification Card */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-4">
          <FaBellSlash className="text-gray-400 text-xl mr-3" />
          <h3 className="text-lg font-semibold text-gray-800">Notification</h3>
        </div>
        <div className="text-center text-gray-500">
          <p className="text-sm font-medium">No updates yet</p>
          <p className="text-xs">Your update notification will appear here.</p>
        </div>
      </div>

      {/* Transaction History Card */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-4">
          <FaHistory className="text-gray-400 text-xl mr-3" />
          <h3 className="text-lg font-semibold text-gray-800">Transaction History</h3>
        </div>
        <div className="text-center text-gray-500">
          <p className="text-sm font-medium">No updates yet</p>
          <p className="text-xs">Your update notification will appear here.</p>
        </div>
      </div>
    </div>
  );
}
