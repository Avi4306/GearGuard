import React from 'react';

const EquipmentCard = ({ equipment, onEdit, requestCount }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-bold text-lg text-gray-800">{equipment.name}</h3>
        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{equipment.category}</span>
      </div>

      <div className="space-y-2 text-sm text-gray-600 mb-4">
        <p><span className="font-medium">Serial:</span> {equipment.serialNumber}</p>
        <p><span className="font-medium">Department:</span> {equipment.department}</p>
        <p><span className="font-medium">Assigned to:</span> {equipment.assignedTo}</p>
        <p><span className="font-medium">Team:</span> {equipment.team}</p>
        <p><span className="font-medium">Location:</span> {equipment.location}</p>
      </div>

      <div className="flex gap-2 pt-3 border-t border-gray-200">
        <button
          onClick={onEdit}
          className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
        >
          Edit
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium">
          Requests {requestCount > 0 && <span className="ml-1 bg-red-500 text-white px-2 py-0.5 rounded-full text-xs">{requestCount}</span>}
        </button>
      </div>
    </div>
  );
};

export default EquipmentCard;