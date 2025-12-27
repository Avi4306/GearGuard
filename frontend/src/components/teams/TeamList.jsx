import React from 'react';

const TeamList = ({ teams }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Teams</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teams.map(team => (
          <div key={team.id} className="bg-white rounded-lg shadow p-5">
            <h3 className="font-bold text-lg mb-3">{team.name}</h3>
            <p className="text-sm text-gray-600 mb-2">Members:</p>
            <ul className="space-y-1">
              {team.members.map((member, idx) => (
                <li key={idx} className="text-sm text-gray-700 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
                    {member.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span>{member}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamList;