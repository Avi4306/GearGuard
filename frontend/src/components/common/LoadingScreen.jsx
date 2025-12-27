import React from 'react';
import { Loader } from 'lucide-react';

export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader className="text-white animate-spin" size={48} />
        <p className="text-white text-lg">Loading GearGuard...</p>
      </div>
    </div>
  );
}