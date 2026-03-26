import React from 'react';

const TopNavBar = ({ onSearch, onAddClick }) => {
  return (
    <header className="fixed top-0 right-0 left-60 h-16 z-40 bg-slate-950/80 backdrop-blur-xl dark:bg-[#0b1326]/80 flex items-center justify-between px-8 w-[calc(100%-15rem)] gap-4 font-headline text-sm">
      <div className="flex items-center flex-1 max-w-2xl gap-6">
        {/* Search Bar */}
        <div className="relative flex-1 group">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors">search</span>
          <input 
            className="w-full bg-surface-container-lowest border-none rounded-xl pl-11 pr-4 py-2.5 text-on-surface placeholder-slate-500 focus:ring-1 focus:ring-indigo-500/30 transition-all outline-none" 
            placeholder="Search your second brain..." 
            type="text"
            onChange={(e) => onSearch && onSearch(e.target.value)}
          />
        </div>

        {/* Navigation Links/Filter Chips */}
        <div className="hidden lg:flex items-center gap-1">
          <button className="px-4 py-1.5 text-indigo-300 border-b-2 border-indigo-500 font-medium">All</button>
          <button className="px-4 py-1.5 text-slate-400 hover:text-indigo-200 transition-all">Recent</button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-3 py-1.5 bg-surface-container-high rounded-lg text-on-surface-variant hover:bg-surface-container-highest transition-colors">
          <span className="material-symbols-outlined text-sm">sort</span>
          <span>Newest</span>
        </button>
        <button 
          onClick={onAddClick}
          className="flex items-center gap-2 px-3 py-1.5 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors shrink-0"
        >
          <span className="material-symbols-outlined text-sm font-bold">add</span>
          <span className="font-bold">Add Item</span>
        </button>
      </div>
    </header>
  );
};

export default TopNavBar;
