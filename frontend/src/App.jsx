import React, { useState } from 'react';
import { Wrench, Calendar, Settings, Users, BarChart3 } from 'lucide-react';
import Sidebar from './components/common/Sidebar';
import Navbar from './components/common/Navbar';
import KanbanBoard from './components/requests/KanbanBoard';
import RequestForm from './components/requests/RequestForm';
import EquipmentList from './components/equipment/EquipmentList';
import EquipmentForm from './components/equipment/EquipmentForm';
import CalendarView from './components/calendar/CalendarView';
import TeamList from './components/teams/TeamList';
import Dashboard from './components/dashboard/Dashboard';
import { useAuth } from './context/AuthContext';

// Mock Data
const mockData = {
  equipment: [
    { id: 1, name: 'CNC Machine 01', serialNumber: 'CNC-2024-001', department: 'Production', assignedTo: 'John Doe', team: 'Mechanics', location: 'Factory Floor A', purchaseDate: '2023-01-15', warranty: '2025-01-15', category: 'Machinery' },
    { id: 2, name: 'Laptop Dell XPS', serialNumber: 'LT-2024-045', department: 'IT', assignedTo: 'Jane Smith', team: 'IT Support', location: 'Office 3rd Floor', purchaseDate: '2023-06-20', warranty: '2026-06-20', category: 'Computer' },
    { id: 3, name: 'Forklift Toyota', serialNumber: 'FK-2023-012', department: 'Warehouse', assignedTo: 'Mike Johnson', team: 'Mechanics', location: 'Warehouse B', purchaseDate: '2022-11-10', warranty: '2024-11-10', category: 'Vehicle' }
  ],
  requests: [
    { id: 1, subject: 'Leaking Oil', equipmentId: 1, equipmentName: 'CNC Machine 01', type: 'Corrective', stage: 'New', scheduledDate: '2024-12-20', duration: null, assignedTo: null, teamId: 1, team: 'Mechanics' },
    { id: 2, subject: 'Routine Checkup', equipmentId: 2, equipmentName: 'Laptop Dell XPS', type: 'Preventive', stage: 'In Progress', scheduledDate: '2024-12-28', duration: 1, assignedTo: 'Jane Smith', teamId: 2, team: 'IT Support' },
    { id: 3, subject: 'Battery Replacement', equipmentId: 3, equipmentName: 'Forklift Toyota', type: 'Corrective', stage: 'Repaired', scheduledDate: '2024-12-15', duration: 3, assignedTo: 'Mike Johnson', teamId: 1, team: 'Mechanics' }
  ],
  teams: [
    { id: 1, name: 'Mechanics', members: ['John Doe', 'Mike Johnson'] },
    { id: 2, name: 'IT Support', members: ['Jane Smith', 'Bob Wilson'] },
    { id: 3, name: 'Electricians', members: ['Tom Brown'] }
  ]
};

function App() {
  const [currentPage, setCurrentPage] = useState('kanban');
  const [equipment, setEquipment] = useState(mockData.equipment);
  const [requests, setRequests] = useState(mockData.requests);
  const [teams, setTeams] = useState(mockData.teams);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showEquipmentForm, setShowEquipmentForm] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [draggedRequest, setDraggedRequest] = useState(null);

  const stages = ['New', 'In Progress', 'Repaired', 'Scrap'];

  const navigation = [
    { id: 'kanban', name: 'Requests', icon: Wrench },
    { id: 'calendar', name: 'Calendar', icon: Calendar },
    { id: 'equipment', name: 'Equipment', icon: Settings },
    { id: 'teams', name: 'Teams', icon: Users },
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
  ];

  // Request Handlers
  const handleSaveRequest = (requestData) => {
    if (requestData.id && requests.find(r => r.id === requestData.id)) {
      setRequests(requests.map(r => r.id === requestData.id ? requestData : r));
    } else {
      setRequests([...requests, requestData]);
    }
    setShowRequestForm(false);
    setSelectedRequest(null);
  };

  const handleCreateRequest = () => {
    setSelectedRequest(null);
    setShowRequestForm(true);
  };

  const handleEditRequest = (request) => {
    setSelectedRequest(request);
    setShowRequestForm(true);
  };

  // Equipment Handlers
  const handleSaveEquipment = (equipmentData) => {
    if (equipmentData.id && equipment.find(e => e.id === equipmentData.id)) {
      setEquipment(equipment.map(e => e.id === equipmentData.id ? equipmentData : e));
    } else {
      setEquipment([...equipment, equipmentData]);
    }
    setShowEquipmentForm(false);
    setSelectedEquipment(null);
  };

  const handleCreateEquipment = () => {
    setSelectedEquipment(null);
    setShowEquipmentForm(true);
  };

  const handleEditEquipment = (eq) => {
    setSelectedEquipment(eq);
    setShowEquipmentForm(true);
  };

  // Drag and Drop Handlers
  const handleDragStart = (request) => {
    setDraggedRequest(request);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, stage) => {
    e.preventDefault();
    if (draggedRequest && draggedRequest.stage !== stage) {
      setRequests(requests.map(r => 
        r.id === draggedRequest.id ? { ...r, stage } : r
      ));
    }
    setDraggedRequest(null);
  };

  const handleDragEnd = () => {
    setDraggedRequest(null);
  };

  // Utility Functions
  const getRequestsByStage = (stage) => {
    return requests.filter(r => r.stage === stage);
  };

  const getStageColor = (stage) => {
    const colors = {
      'New': 'bg-blue-100 border-blue-300',
      'In Progress': 'bg-yellow-100 border-yellow-300',
      'Repaired': 'bg-green-100 border-green-300',
      'Scrap': 'bg-red-100 border-red-300',
    };
    return colors[stage] || 'bg-gray-100 border-gray-300';
  };

  // Render Page Content
  const renderPage = () => {
    switch (currentPage) {
      case 'kanban':
        return (
          <KanbanBoard
            requests={requests}
            stages={stages}
            onCreateRequest={handleCreateRequest}
            onEditRequest={handleEditRequest}
            draggedRequest={draggedRequest}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            getRequestsByStage={getRequestsByStage}
            getStageColor={getStageColor}
          />
        );
      case 'equipment':
        return (
          <EquipmentList
            equipment={equipment}
            requests={requests}
            onCreateEquipment={handleCreateEquipment}
            onEditEquipment={handleEditEquipment}
          />
        );
      case 'calendar':
        return <CalendarView requests={requests} />;
      case 'teams':
        return <TeamList teams={teams} />;
      case 'dashboard':
        return (
          <Dashboard
            equipment={equipment}
            requests={requests}
            teams={teams}
            stages={stages}
            getRequestsByStage={getRequestsByStage}
          />
        );
      default:
        return (
          <KanbanBoard
            requests={requests}
            stages={stages}
            onCreateRequest={handleCreateRequest}
            onEditRequest={handleEditRequest}
            draggedRequest={draggedRequest}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            getRequestsByStage={getRequestsByStage}
            getStageColor={getStageColor}
          />
        );
    }
  };
  const { logout } = useAuth();
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        navigation={navigation}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Navbar */}
        <Navbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          navigation={navigation}
          currentPage={currentPage}
          onLogout={logout}
        />

        {/* Page Content */}
        {renderPage()}
      </div>

      {/* Modals */}
      {showRequestForm && (
        <RequestForm
          request={selectedRequest}
          equipment={equipment}
          teams={teams}
          onClose={() => {
            setShowRequestForm(false);
            setSelectedRequest(null);
          }}
          onSave={handleSaveRequest}
        />
      )}

      {showEquipmentForm && (
        <EquipmentForm
          equipment={selectedEquipment}
          teams={teams}
          onClose={() => {
            setShowEquipmentForm(false);
            setSelectedEquipment(null);
          }}
          onSave={handleSaveEquipment}
        />
      )}
    </div>
  );
}

export default App;