import React, { useState, useEffect } from 'react';
import { Wrench, Calendar, Settings, Users, BarChart3 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
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
import { fetchEquipment, createEquipment, updateEquipment, deleteEquipment } from './actions/equipmentActions';
import { fetchRequests, createRequest, updateRequest, updateRequestStage, deleteRequest, assignTechnician } from './actions/requestActions';
import { fetchTeams, createTeam, updateTeam, deleteTeam } from './actions/teamActions';

function App() {
  const dispatch = useDispatch();
  const { logout } = useAuth();

  // Redux state
  const { equipment, loading: equipmentLoading } = useSelector(state => state.equipment);
  const { requests, loading: requestsLoading } = useSelector(state => state.requests);
  const { teams, loading: teamsLoading } = useSelector(state => state.teams);

  // Local state
  const [currentPage, setCurrentPage] = useState('kanban');
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showEquipmentForm, setShowEquipmentForm] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [draggedRequest, setDraggedRequest] = useState(null);

  const stages = ['new', 'in_progress', 'repaired', 'scrap'];

  const navigation = [
    { id: 'kanban', name: 'Requests', icon: Wrench },
    { id: 'calendar', name: 'Calendar', icon: Calendar },
    { id: 'equipment', name: 'Equipment', icon: Settings },
    { id: 'teams', name: 'Teams', icon: Users },
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
  ];

  // Fetch data on mount
  useEffect(() => {
    dispatch(fetchEquipment());
    dispatch(fetchRequests());
    dispatch(fetchTeams());
  }, [dispatch]);

  // Request Handlers
  const handleSaveRequest = async (requestData) => {
    try {
      if (requestData.id) {
        await dispatch(updateRequest(requestData.id, requestData));
      } else {
        await dispatch(createRequest(requestData));
      }
      setShowRequestForm(false);
      setSelectedRequest(null);
    } catch (error) {
      console.error('Error saving request:', error);
    }
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
  const handleSaveEquipment = async (equipmentData) => {
    try {
      if (equipmentData.id) {
        await dispatch(updateEquipment(equipmentData.id, equipmentData));
      } else {
        await dispatch(createEquipment(equipmentData));
      }
      setShowEquipmentForm(false);
      setSelectedEquipment(null);
    } catch (error) {
      console.error('Error saving equipment:', error);
    }
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

  const handleDrop = async (e, stage) => {
    e.preventDefault();
    if (draggedRequest && draggedRequest.status !== stage) {
      try {
        await dispatch(updateRequestStage(draggedRequest.id, stage));
      } catch (error) {
        console.error('Error updating stage:', error);
      }
    }
    setDraggedRequest(null);
  };

  const handleDragEnd = () => {
    setDraggedRequest(null);
  };

  // Utility Functions
  const getRequestsByStage = (stage) => {
    return requests.filter(r => r.status === stage);
  };

  const getStageColor = (stage) => {
    const colors = {
      'new': 'bg-blue-100 border-blue-300',
      'in_progress': 'bg-yellow-100 border-yellow-300',
      'repaired': 'bg-green-100 border-green-300',
      'scrap': 'bg-red-100 border-red-300',
    };
    return colors[stage] || 'bg-gray-100 border-gray-300';
  };

  // Render Page Content
  const renderPage = () => {
    if (equipmentLoading || requestsLoading || teamsLoading) {
      return <div className="p-6 text-center">Loading...</div>;
    }

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