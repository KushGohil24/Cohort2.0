import React, { useEffect, useState } from 'react';
import ItemCard from '../components/items/ItemCard';
import ItemDetailDrawer from '../components/items/ItemDetailDrawer';
import { getItems, deleteItem, updateItem } from '../services/api';

const Dashboard = ({ refreshTrigger }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getItems();
        setItems(data);
      } catch (err) {
        console.error("Failed to fetch items", err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [refreshTrigger]);

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
      />

      <div className="mb-8">
        <h2 className="text-3xl font-bold font-headline tracking-tight text-white mb-1">Knowledge Garden</h2>
        <p className="text-slate-400 font-body">Harvested thoughts and curated insights from your digital journey.</p>
      </div>

      {items.length === 0 ? (
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
