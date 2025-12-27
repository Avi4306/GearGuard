import React from 'react';

const CalendarView = ({ requests }) => {
  const preventiveRequests = requests.filter(r => r.type === 'Preventive');

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Calendar View</h2>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600 mb-4">Preventive Maintenance Schedule</p>
        <div className="space-y-2">
          {preventiveRequests.length > 0 ? (
            preventiveRequests.map(req => (
              <div key={req.id} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{req.subject}</p>
                    <p className="text-sm text-gray-600">{req.equipmentName}</p>
                  </div>
                  <span className="text-sm text-gray-700">
                    {new Date(req.scheduledDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-8">No preventive maintenance scheduled</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;