import React from 'react';
import { Settings, Wrench, Users } from 'lucide-react';

const Dashboard = ({ equipment, requests, teams, stages, getRequestsByStage }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Equipment</p>
              <p className="text-3xl font-bold text-gray-800">{equipment.length}</p>
            </div>
            <Settings className="text-blue-500" size={40} />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Active Requests</p>
              <p className="text-3xl font-bold text-gray-800">
                {requests.filter(r => r.stage !== 'Repaired' && r.stage !== 'Scrap').length}
              </p>
            </div>
            <Wrench className="text-orange-500" size={40} />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Teams</p>
              <p className="text-3xl font-bold text-gray-800">{teams.length}</p>
            </div>
            <Users className="text-green-500" size={40} />
          </div>
        </div>
      </div>

      {/* Requests by Stage Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-bold text-lg mb-4">Requests by Stage</h3>
        <div className="space-y-3">
          {stages.map(stage => (
            <div key={stage} className="flex items-center justify-between">
              <span className="text-gray-700">{stage}</span>
              <div className="flex items-center gap-2">
                <div className="w-48 bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${
                      stage === 'New' ? 'bg-blue-500' :
                      stage === 'In Progress' ? 'bg-yellow-500' :
                      stage === 'Repaired' ? 'bg-green-500' : 'bg-red-500'
                    }`}
                    style={{ 
                      width: `${requests.length > 0 ? (getRequestsByStage(stage).length / requests.length) * 100 : 0}%` 
                    }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-600 w-8">
                  {getRequestsByStage(stage).length}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;