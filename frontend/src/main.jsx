import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import rootReducer from './reducers/index.js'
import { AuthProvider, useAuth } from './context/AuthContext'
import Login from './components/auth/login.jsx'
import LoadingScreen from './components/common/LoadingScreen'
import ProtectedRoute from './components/auth/ProtectedRoute'

const store = configureStore({
  reducer: rootReducer,
});

function AppWrapper() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <App />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={isAuthenticated ? <App /> : <Navigate to="/login" />} />
    </Routes>
  );
}

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <AuthProvider>
        <StrictMode>
          <AppWrapper />
        </StrictMode>
      </AuthProvider>
    </Router>
  </Provider>
)