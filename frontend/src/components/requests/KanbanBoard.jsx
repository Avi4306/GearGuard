import React from 'react';
import { Plus } from 'lucide-react';
import RequestCard from './RequestCard';

const KanbanBoard = ({
  requests,
  stages,
  onCreateRequest,
  onEditRequest,
  draggedRequest,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
  getRequestsByStage,
  getStageColor
}) => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Maintenance Requests</h2>
        <button
          onClick={onCreateRequest}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus size={20} />
          New Request
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stages.map(stage => (
          <div key={stage} className="flex flex-col">
            <div className={`p-3 rounded-t-lg border-2 ${getStageColor(stage)}`}>
              <h3 className="font-semibold text-gray-800">
                {stage}
                <span className="ml-2 text-sm text-gray-600">
                  ({getRequestsByStage(stage).length})
                </span>
              </h3>
            </div>

            <div
              onDragOver={onDragOver}
              onDrop={(e) => onDrop(e, stage)}
              className={`flex-1 p-2 border-2 border-t-0 rounded-b-lg min-h-[500px] transition-colors ${
                draggedRequest && draggedRequest.stage !== stage ? 'bg-blue-50' : 'bg-gray-50'
              }`}
            >
              {getRequestsByStage(stage).map(request => (
                <RequestCard
                  key={request.id}
                  request={request}
                  onClick={() => onEditRequest(request)}
                  onDragStart={() => onDragStart(request)}
                  onDragEnd={onDragEnd}
                  isDragging={draggedRequest?.id === request.id}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;