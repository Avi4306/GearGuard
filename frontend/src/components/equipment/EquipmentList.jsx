import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import EquipmentCard from './EquipmentCard';

const EquipmentList = ({ equipment, requests, onCreateEquipment, onEditEquipment }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEquipment = equipment.filter(eq =>
    eq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    eq.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRequestCount = (equipmentId) => {
    return requests.filter(r => r.equipmentId === equipmentId && r.stage !== 'Repaired' && r.stage !== 'Scrap').length;
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Equipment</h2>
        <button
          onClick={onCreateEquipment}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus size={20} />
          Add Equipment
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search equipment..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEquipment.map(eq => (
          <EquipmentCard
            key={eq.id}
            equipment={eq}
            onEdit={() => onEditEquipment(eq)}
            requestCount={getRequestCount(eq.id)}
          />
        ))}
      </div>

      {filteredEquipment.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No equipment found
        </div>
      )}
    </div>
  );
};

export default EquipmentList;