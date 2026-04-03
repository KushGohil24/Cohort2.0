import React, { useEffect, useState } from 'react';
import { getCollections, deleteCollection } from '../services/api';
import { Link } from 'react-router-dom';
import CreateCollectionModal from '../components/collections/CreateCollectionModal';
import toast from 'react-hot-toast';

const Collections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCollections = async () => {
    try {
      const data = await getCollections();
      setCollections(data || []);
    } catch (err) {
      console.error("Failed to fetch collections", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const handleCreated = (newCollection) => {
    setCollections(prev => [newCollection, ...prev]);
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!window.confirm("Are you sure you want to dissolve this collection? The nodes will remain but the organization will be lost.")) {
      return;
    }

    try {
      await deleteCollection(id);
      setCollections(prev => prev.filter(c => c._id !== id));
      toast.success('Collection dissolved successfully 🌪️');
    } catch (err) {
      console.error("Failed to delete", err);
      toast.error('Failed to dissolve collection');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
        <div>
          <h2 className="text-4xl font-bold font-headline tracking-tight text-white mb-2">My Collections</h2>
          <p className="text-slate-400 font-body">Curation is the art of meaningful organization.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-on-primary font-bold rounded-xl shadow-lg shadow-primary/20 hover:opacity-90 transform active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined font-bold">add</span>
          Create Collection
        </button>
      </header>

      <CreateCollectionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onCollectionCreated={handleCreated} 
      />

      {collections.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-20 bg-surface-container-low rounded-2xl border border-dashed border-white/10 text-center">
          <span className="material-symbols-outlined text-6xl text-slate-600 mb-6" style={{fontVariationSettings: "'FILL' 1"}}>folder_open</span>
          <h3 className="text-xl font-bold text-slate-100 mb-2">No Collections Yet</h3>
          <p className="text-slate-500 max-w-sm">Start organizing your digital workspace by creating your first collection during item save.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {collections.map((collection) => (
            <Link 
              key={collection._id}
              to={`/collection/${collection._id}`}
              className="group relative bg-surface-container-low hover:bg-surface-container-high rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 border border-white/5 hover:border-primary/30 overflow-hidden"
            >
              <div 
                className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity"
                style={{ backgroundColor: collection.color || '#6366f1' }}
              />
              
              <div className="flex items-start justify-between mb-6">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-lg"
                  style={{ backgroundColor: `${collection.color || '#6366f1'}20`, color: collection.color || '#6366f1' }}
                >
                  {collection.icon || '📁'}
                </div>
                
                {/* Fixed Deletion Button - Absolute Position to avoid flow issues */}
                <button 
                  onClick={(e) => handleDelete(e, collection._id)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-slate-950/40 text-error hover:bg-error hover:text-on-error transition-all flex items-center justify-center opacity-0 group-hover:opacity-100 z-20 backdrop-blur-md border border-white/5 shadow-xl"
                  title="Dissolve Collection"
                >
                  <span className="material-symbols-outlined text-xl">delete</span>
                </button>
              </div>

              <h3 className="text-xl font-headline font-bold text-slate-100 group-hover:text-primary transition-colors mb-2">
                {collection.name}
              </h3>
              <p className="text-sm text-slate-400 font-body line-clamp-2 leading-relaxed">
                {collection.description || "A curated repository of your digital insights."}
              </p>

              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500 font-bold uppercase tracking-tighter">
                <div className="flex items-center gap-3">
                   <span>Created {new Date(collection.createdAt).toLocaleDateString()}</span>
                   <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                   <span className="text-primary/70">{collection.itemCount || 0} Nodes</span>
                </div>
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Collections;
