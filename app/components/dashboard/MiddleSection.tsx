import { FaClipboardList } from 'react-icons/fa';

export default function MiddleSection() {
  return (
    <div className="flex-1 bg-white rounded-lg shadow w-[500px] sm:w-[530px] p-6">
      {/* Header */}
      <div className="mb-6 flex-col flex sm:flex-row items-center justify-between">
        <h2 className="text-2xl font-semibold mb-2">Performance</h2>
        <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
         
          <select className="rounded px-3 py-2 text-sm">
            <option>Subject</option>
          </select>
          <select className="rounded px-3 py-2 text-sm">
            <option>Tutors Name</option>
          </select>
          <select className="rounded px-3 py-2 text-sm">
            <option>Month</option>
          </select>
        </div>
      </div>
      <span className="text-gray-500 font-medium">January</span>

      {/* Empty State */}
      <div className="flex justify-center items-center h-64 bg-gray-50 rounded-lg">
        <div className="text-center">
          <FaClipboardList className="text-blue-400 text-4xl mb-4" />
          <p className="text-gray-500 font-medium text-lg">No updates yet</p>
          <p className="text-gray-400 text-sm">
            The statistics of your performance appear here
          </p>
        </div>
      </div>
    </div>
  );
}
