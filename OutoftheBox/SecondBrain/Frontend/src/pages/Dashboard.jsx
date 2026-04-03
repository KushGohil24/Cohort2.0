import React, { useEffect, useState } from 'react';
import ItemCard from '../components/items/ItemCard';
import ItemDetailDrawer from '../components/items/ItemDetailDrawer';
import KnowledgeGraph from '../components/items/KnowledgeGraph';
import { getItems, deleteItem, updateItem, searchItems } from '../services/api';
import { useUI } from '../context/UIContext';
import { useParams } from 'react-router-dom';

const Dashboard = ({ refreshTrigger, filterFavorites, isArchived }) => {
  const { type, collectionId } = useParams();
  const { debouncedSearch, sortBy } = useUI();
  
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [view, setView] = useState('grid'); // 'grid' or 'graph'

  const fetchItems = async (isPoll = false) => {
    try {
      let data = [];
      if (debouncedSearch) {
        data = await searchItems(debouncedSearch);
      } else {
        data = await getItems(type, collectionId, isArchived);
      }

      // Client-side filtering for favorites if enabled
      if (filterFavorites) {
        data = data.filter(item => item.isFavorite);
      }

      // Client-side sorting
      data.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
      });

      setItems(data);
    } catch (err) {
      console.error("Failed to fetch items", err);
    } finally {
      if (!isPoll) setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchItems();
  }, [refreshTrigger, debouncedSearch, sortBy, type, collectionId, filterFavorites, isArchived]);

  // Polling for AI processing status
  useEffect(() => {
    const hasProcessingItems = items.some(item => 
      item.status === 'pending' || item.status === 'processing'
    );

    if (hasProcessingItems) {
      const interval = setInterval(() => {
        fetchItems(true);
      }, 3000); // Poll every 3 seconds until completed
      return () => clearInterval(interval);
    }
  }, [items]);
  
  // Keep selectedItem in sync with polling updates
  useEffect(() => {
    if (selectedItem) {
      const latest = items.find(i => i._id === selectedItem._id);
      if (latest && (latest.status !== selectedItem.status || latest.aiSummary !== selectedItem.aiSummary)) {
        setSelectedItem(latest);
      }
    }
  }, [items, selectedItem]);

  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      setItems(items.filter(item => item._id !== id));
      if (selectedItem?._id === id) setSelectedItem(null);
    } catch (err) {
      console.error("Failed to delete", err);
    }
  };

  const handleUpdate = async (id, updates) => {
    try {
      const updated = await updateItem(id, updates);
      setItems(items.map(item => item._id === id ? updated : item));
      if (selectedItem?._id === id) setSelectedItem(updated);
    } catch (err) {
      console.error("Failed to update", err);
    }
  };

  if (loading) {
    return <div className="text-white">Loading your sanctuary...</div>;
  }

  return (
    <>
      <ItemDetailDrawer 
        item={selectedItem} 
        isOpen={!!selectedItem} 
        onClose={() => setSelectedItem(null)} 
        onDelete={(id) => handleDelete(id)}
        onUpdate={(id, updates) => handleUpdate(id, updates)}
        onSelectItem={(item) => setSelectedItem(item)}
      />

      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold font-headline tracking-tight text-white mb-1">
            {debouncedSearch ? `Search: "${debouncedSearch}"` : 
             filterFavorites ? 'Favorites' :
             isArchived ? 'Archived Nodes' :
             type ? type.charAt(0).toUpperCase() + type.slice(1) + 's' :
             collectionId ? 'Collection Archive' :
             'Knowledge Garden'}
          </h2>
          <p className="text-slate-400 font-body">
            {debouncedSearch ? `Found ${items.length} relevant neural nodes` : 
             `Curating ${items.length} knowledge nodes in this ${collectionId ? 'collection' : isArchived ? 'archive' : 'sanctuary'}.`}
          </p>
        </div>
        
        <div className="flex bg-slate-900/50 p-1 rounded-xl border border-white/10 backdrop-blur-md self-start md:self-auto">
          <button 
            onClick={() => setView('grid')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold transition-all ${view === 'grid' ? 'bg-primary text-on-primary shadow-lg shadow-primary/20' : 'text-slate-400 hover:text-white'}`}
          >
            <span className="material-symbols-outlined text-lg">grid_view</span>
            Grid
          </button>
          <button 
            onClick={() => setView('graph')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold transition-all ${view === 'graph' ? 'bg-primary text-on-primary shadow-lg shadow-primary/20' : 'text-slate-400 hover:text-white'}`}
          >
            <span className="material-symbols-outlined text-lg">bubble_chart</span>
            Graph
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
        </div>
      ) : view === 'graph' ? (
        <KnowledgeGraph onNodeClick={(node) => setSelectedItem(items.find(i => String(i._id) === String(node.id)))} />
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-surface-container-low rounded-xl border border-dashed border-white/10 text-center">
          <span className="material-symbols-outlined text-4xl text-slate-500 mb-4">inbox</span>
          <h3 className="text-xl font-bold text-white mb-2">Sanctuary Empty</h3>
          <p className="text-slate-400 mb-6">You haven't added any knowledge nodes yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-max">
          {items.map(item => (
            <div key={item._id} onClick={() => setSelectedItem(item)} className="cursor-pointer h-full">
              <ItemCard 
                item={item} 
                onDelete={(id) => handleDelete(id)} 
                onUpdate={(id, updates) => handleUpdate(id, updates)}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Dashboard;
