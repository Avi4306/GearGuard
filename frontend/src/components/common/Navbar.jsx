import React from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = ({ sidebarOpen, setSidebarOpen, navigation, currentPage }) => {
  return (
    <div className="bg-white shadow-sm p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden text-gray-600 hover:text-gray-900"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <h2 className="text-xl font-semibold text-gray-800">
          {navigation.find((n) => n.id === currentPage)?.name}
        </h2>
      </div>
      <div className="text-sm text-gray-600">
        {new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </div>
    </div>
  );
};

export default Navbar;