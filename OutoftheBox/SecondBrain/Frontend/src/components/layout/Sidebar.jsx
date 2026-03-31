import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const navLinks = [
    { name: 'All Items', icon: 'inventory_2', path: '/' },
    { name: 'Articles', icon: 'description', path: '/type/article' },
    { name: 'YouTube', icon: 'play_circle', path: '/type/youtube' },
    { name: 'Tweets', icon: 'chat', path: '/type/tweet' },
    { name: 'PDFs', icon: 'picture_as_pdf', path: '/type/pdf' },
    { name: 'Images', icon: 'image', path: '/type/image' },
    { name: 'Notes', icon: 'edit_note', path: '/type/note' },
    { name: 'Collections', icon: 'folder_open', path: '/collections' },
    { name: 'Favorites', icon: 'grade', path: '/favorites' },
  ];

  return (
    <aside className="h-screen w-60 fixed left-0 top-0 bg-slate-900/50 dark:bg-[#0b1326] flex flex-col p-4 space-y-2 font-headline font-semibold tracking-tight z-50">
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-2 py-6 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-container flex items-center justify-center shadow-lg shadow-primary/20">
          <span className="material-symbols-outlined text-on-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tighter text-indigo-100">Second Brain</h1>
          <p className="text-[10px] uppercase tracking-widest text-indigo-400/60 font-bold">Cognitive Sanctuary</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1 overflow-y-auto">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${
                isActive
                  ? 'bg-indigo-500/10 text-indigo-300 dark:text-[#d0bcff] font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 dark:hover:bg-white/5'
              }`}
            >
              <span className={`material-symbols-outlined group-active:scale-95 duration-150 ${isActive ? 'text-indigo-400' : ''}`}>
                {link.icon}
              </span>
              <span className="text-sm">{link.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className="pt-4 border-t border-white/5 space-y-1">
        <div className="flex items-center gap-3 px-3 py-2.5 text-slate-400 rounded-lg group">
          <div className="w-6 h-6 rounded-full bg-primary/20 text-primary border border-primary/30 flex items-center justify-center overflow-hidden shrink-0">
             <span className="text-xs font-bold">{user?.user?.name?.charAt(0) || 'U'}</span>
          </div>
          <div className="flex flex-col flex-1 overflow-hidden">
            <span className="text-sm font-bold text-slate-200 truncate">{user?.user?.name || 'User'}</span>
            <span className="text-[10px] text-slate-500 truncate">{user?.user?.email}</span>
          </div>
        </div>
        <button 
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-error hover:text-error/80 hover:bg-error-container/10 rounded-lg transition-colors group mt-2"
        >
          <span className="material-symbols-outlined group-active:scale-95 duration-150">logout</span>
          <span className="text-sm font-bold">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
