import React from 'react';
import { User, Bell, Settings, HelpCircle } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white p-4 h-full">
      <h2 className="text-xl font-bold mb-6">Sidebar</h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <User size={20} />
          <span>Profile</span>
        </div>
        <div className="flex items-center space-x-2">
          <Bell size={20} />
          <span>Notifications</span>
        </div>
        <div className="flex items-center space-x-2">
          <Settings size={20} />
          <span>Settings</span>
        </div>
        <div className="flex items-center space-x-2">
          <HelpCircle size={20} />
          <span>Help</span>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <ul className="space-y-2">
          <li>User logged in</li>
          <li>New victim detected</li>
          <li>Data request completed</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

