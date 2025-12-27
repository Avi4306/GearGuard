import React from 'react';
import { Menu, X } from 'lucide-react';

const Sidebar = ({ sidebarOpen, setSidebarOpen, navigation, currentPage, setCurrentPage }) => {
  return (
    <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-900 text-white transition-all duration-300 flex flex-col`}>
      {/* Logo */}
      <div className="p-4 flex items-center justify-between border-b border-gray-700">
        {sidebarOpen && <h1 className="text-xl font-bold">GearGuard</h1>}
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-white">
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                currentPage === item.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <Icon size={20} />
              {sidebarOpen && <span>{item.name}</span>}
            </button>
          );
        })}
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
            AD
          </div>
          {sidebarOpen && (
            <div>
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-gray-400">admin@gearguard.com</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;