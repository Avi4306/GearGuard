import React from 'react';
import { Clock, AlertCircle, Wrench } from 'lucide-react';

const RequestCard = ({ request, onClick, onDragStart, onDragEnd, isDragging }) => {
  const isOverdue = request.scheduledDate && new Date(request.scheduledDate) < new Date() && request.stage !== 'Repaired';
  const getTypeColor = (type) => type === 'Preventive' ? 'bg-blue-500' : 'bg-orange-500';
  const getInitials = (name) => name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : '?';

  return (
    <div
      onClick={onClick}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.effectAllowed = 'move';
        onDragStart();
      }}
      onDragEnd={onDragEnd}
      className={`bg-white rounded-lg shadow-md p-4 mb-3 cursor-move hover:shadow-lg transition-shadow ${
        isOverdue ? 'border-l-4 border-red-500' : ''
      } ${isDragging ? 'opacity-50 scale-95' : ''}`}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-semibold text-gray-800 flex-1 pr-2">{request.subject}</h4>
        <span className={`text-xs text-white px-2 py-1 rounded ${getTypeColor(request.type)}`}>
          {request.type}
        </span>
      </div>

      {/* Equipment */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
        <Wrench size={14} />
        <span>{request.equipmentName || 'No Equipment'}</span>
      </div>

      {/* Date */}
      {request.scheduledDate && (
        <div className="flex items-center gap-2 text-sm mb-2">
          <Clock size={14} className={isOverdue ? 'text-red-500' : 'text-gray-500'} />
          <span className={isOverdue ? 'text-red-600 font-medium' : 'text-gray-600'}>
            {new Date(request.scheduledDate).toLocaleDateString()}
          </span>
          {isOverdue && <AlertCircle size={14} className="text-red-500" />}
        </div>
      )}

      {/* Duration */}
      {request.duration && (
        <div className="text-sm text-gray-600 mb-2">
          Duration: {request.duration} hours
        </div>
      )}

      {/* Assigned Technician */}
      {request.assignedTo && (
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-200">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-semibold">
            {getInitials(request.assignedTo)}
          </div>
          <span className="text-sm text-gray-700">{request.assignedTo}</span>
        </div>
      )}
    </div>
  );
};

export default RequestCard;