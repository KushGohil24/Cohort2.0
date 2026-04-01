import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { createCollection } from '../../services/api';

const CreateCollectionModal = ({ isOpen, onClose, onCollectionCreated }) => {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('📁');
  const [color, setColor] = useState('#6366f1');
  const [loading, setLoading] = useState(false);

  const colors = ['#6366f1', '#ec4899', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#06b6d4'];
  const icons = ['📁', '📚', '💡', '🎬', '🎧', '🔬', '🎨', '✈️'];

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.error('Please enter a collection name');
    
    setLoading(true);
    try {
      const newCollection = await createCollection({ name, icon, color });
      toast.success(`Collection "${name}" created!`);
      onCollectionCreated(newCollection);
      onClose();
      setName('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create collection');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-surface-container-low border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-xl font-bold font-headline text-white">Create Collection</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-400">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Name</label>
            <input 
              autoFocus
              className="w-full bg-surface-container-lowest border border-white/5 rounded-xl px-4 py-3 text-white outline-none focus:ring-1 focus:ring-primary/50 transition-all"
              placeholder="e.g., Reading List, Travel Ideas..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Icon</label>
              <div className="flex flex-wrap gap-2">
                {icons.map(i => (
                  <button 
                    key={i}
                    type="button"
                    onClick={() => setIcon(i)}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-all ${icon === i ? 'bg-primary text-white scale-110 shadow-lg' : 'bg-white/5 hover:bg-white/10'}`}
                  >
                    {i}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Color</label>
              <div className="flex flex-wrap gap-2">
                {colors.map(c => (
                  <button 
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className={`w-6 h-6 rounded-full transition-all border-2 ${color === c ? 'border-white scale-125 shadow-lg' : 'border-transparent'}`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-surface-container-highest text-white font-bold rounded-xl hover:bg-white/10 transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={loading}
              className="flex-1 py-3 bg-primary text-on-primary font-bold rounded-xl shadow-lg shadow-primary/20 hover:opacity-90 transition-all flex items-center justify-center gap-2"
            >
              {loading ? <span className="w-5 h-5 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin"></span> : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCollectionModal;
