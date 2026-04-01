import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Collections from './pages/Collections';
import Login from './pages/Login';
import Register from './pages/Register';
import SaveItemModal from './components/items/SaveItemModal';
import { createItem } from './services/api';
import { UIProvider } from './context/UIContext';
import { Toaster } from 'react-hot-toast';

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
    <UIProvider>
      <BrowserRouter>
        <Toaster position="bottom-right" />
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
            <Route path="type/:type" element={<Dashboard refreshTrigger={refreshTrigger} />} />
            <Route path="collections" element={<Collections />} />
            <Route path="collection/:collectionId" element={<Dashboard refreshTrigger={refreshTrigger} />} />
            <Route path="favorites" element={<Dashboard refreshTrigger={refreshTrigger} filterFavorites={true} />} />
            <Route path="archive" element={<Dashboard refreshTrigger={refreshTrigger} isArchived={true} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UIProvider>
  );
}

export default App;
