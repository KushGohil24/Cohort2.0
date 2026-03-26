import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNavBar from './TopNavBar';

const Layout = ({ onAddClick }) => {
  return (
    <div className="min-h-screen bg-surface text-on-surface selection:bg-primary/30 font-body flex">
      <Sidebar />
      <div className="flex-1 flex flex-col relative w-full">
        <TopNavBar onAddClick={onAddClick} />
        {/* Main Content Canvas */}
        <main className="ml-60 pt-24 px-8 pb-12 min-h-screen">
          <Outlet />
        </main>
      </div>
      
      {/* Floating Action Button */}
      <button 
        onClick={onAddClick}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-primary to-primary-container text-on-primary-container rounded-xl shadow-2xl shadow-primary/30 flex items-center justify-center hover:scale-110 active:scale-95 transition-all group z-50 text-white"
      >
        <span className="material-symbols-outlined text-3xl group-hover:rotate-90 transition-transform duration-300">add</span>
      </button>

      {/* Optional Status Toast */}
      {/* <div className="fixed bottom-8 left-72 px-4 py-2 bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-lg flex items-center gap-3 text-xs text-slate-400 z-40">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
        <span>Sanctuary Synced</span>
      </div> */}
    </div>
  );
};

export default Layout;
