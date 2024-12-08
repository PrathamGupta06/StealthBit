import React from 'react';
import { User, FileEdit, Check, X } from 'lucide-react';
import FriendlyDate from './FriendlyDate';

const Sidebar = ({ victim, requests, onRequestClick }) => {
  const fulfilledRequests = requests.filter(request => request.fulfilled);
  const pendingRequests = requests.filter(request => !request.fulfilled);

  const formattedDemand = (demand) => {
    switch (demand) {
      case 'camera':
        return 'Camera';
      case 'screenshot':
        return 'Screenshot';
      case 'liveAudio':
        return 'Live Audio';
      case 'logFiles':
        return 'Log Files';
      case 'browsingHistory':
        return 'Browsing History';
      default:
        return 'Unknown';
    }
  };  

  return (
    <div className="bg-gray-800 text-white p-4 h-full overflow-y-auto">
      <h2 className="text-xl font-bold mb-6">Details</h2>
      <div className="space-y-4 mb-8">
        <div className="flex items-center space-x-2 p-2 rounded">
          <User size={20} />
          <span><b>Mac Address: </b>{victim.macAddress}</span>
        </div>
        <div className="flex items-center space-x-2 p-2 rounded">
          <FileEdit size={20} />
          <span><b>Registered: </b>{<FriendlyDate date={victim.dateCreated}/>}</span>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Requests</h3>
        <h4 className="text-md font-semibold mb-2">Fulfilled</h4>
        <ul className="space-y-2 mb-4">
          {fulfilledRequests.map(request => (
            <li 
              key={request._id} 
              className="flex items-center space-x-2 cursor-pointer hover:bg-gray-700 p-2 rounded"
              onClick={() => onRequestClick(request)}
            >
              <Check size={16} className="text-green-500" />
              <span>{formattedDemand(request.demand)} - {<FriendlyDate date={request.createdAt} />}</span>
            </li>
          ))}
        </ul>
        <h4 className="text-md font-semibold mb-2">Pending</h4>
        <ul className="space-y-2">
          {pendingRequests.map(request => (
            <li key={request._id} className="flex items-center space-x-2 p-2 rounded">
              <X size={16} className="text-red-500" />
              <span>{formattedDemand(request.demand)} - {<FriendlyDate date={request.createdAt} />}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

