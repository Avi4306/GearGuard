import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const RequestForm = ({ request, equipment, teams, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    subject: request?.subject || '',
    equipmentId: request?.equipmentId || '',
    type: request?.type || 'Corrective',
    stage: request?.stage || 'New',
    scheduledDate: request?.scheduledDate || '',
    duration: request?.duration || '',
    description: request?.description || '',
    teamId: request?.teamId || '',
    assignedTo: request?.assignedTo || ''
  });

  const selectedEquipment = equipment.find(eq => eq.id === parseInt(formData.equipmentId));

  useEffect(() => {
    if (selectedEquipment) {
      const team = teams.find(t => t.name === selectedEquipment.team);
      setFormData(prev => ({ ...prev, teamId: team?.id || '' }));
    }
  }, [formData.equipmentId, selectedEquipment, teams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const equipmentData = equipment.find(eq => eq.id === parseInt(formData.equipmentId));
    onSave({ 
      ...request, 
      ...formData, 
      id: request?.id || Date.now(),
      equipmentName: equipmentData?.name,
      team: equipmentData?.team
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">{request?.id ? 'Edit Request' : 'New Maintenance Request'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
            <input
              type="text"
              value={formData.subject}
              onChange={e => setFormData({ ...formData, subject: e.target.value })}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Leaking Oil"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Equipment *</label>
            <select
              value={formData.equipmentId}
              onChange={e => setFormData({ ...formData, equipmentId: e.target.value })}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Equipment</option>
              {equipment.map(eq => (
                <option key={eq.id} value={eq.id}>{eq.name} - {eq.department}</option>
              ))}
            </select>
            {selectedEquipment && (
              <p className="mt-1 text-sm text-gray-500">
                Category: {selectedEquipment.category} | Team: {selectedEquipment.team}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
              <select
                value={formData.type}
                onChange={e => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="Corrective">Corrective</option>
                <option value="Preventive">Preventive</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stage</label>
              <select
                value={formData.stage}
                onChange={e => setFormData({ ...formData, stage: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="New">New</option>
                <option value="In Progress">In Progress</option>
                <option value="Repaired">Repaired</option>
                <option value="Scrap">Scrap</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Scheduled Date</label>
              <input
                type="date"
                value={formData.scheduledDate}
                onChange={e => setFormData({ ...formData, scheduledDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration (hours)</label>
              <input
                type="number"
                value={formData.duration}
                onChange={e => setFormData({ ...formData, duration: e.target.value })}
                min="0"
                step="0.5"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Describe the issue or maintenance work..."
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              {request?.id ? 'Update' : 'Create'} Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestForm;