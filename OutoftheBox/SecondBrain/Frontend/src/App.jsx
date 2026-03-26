import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import SaveItemModal from './components/items/SaveItemModal';
import { createItem } from './services/api';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  if (user) return <Navigate to="/" replace />;
  return children;
};

function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleAddClick = () => {
    setModalOpen(true);
  };

  const handleSaveItem = async (itemData) => {
    try {
      await createItem(itemData);
      setRefreshTrigger(prev => prev + 1); // trigger list refresh
    } catch (err) {
      console.error("Failed to save item:", err);
    }
  };

  return (
    <BrowserRouter>
      <SaveItemModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} onSave={handleSaveItem} />
      
      <Routes>
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/register" element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />
        
        <Route path="/" element={
          <ProtectedRoute>
            <Layout onAddClick={handleAddClick} />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard refreshTrigger={refreshTrigger} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
