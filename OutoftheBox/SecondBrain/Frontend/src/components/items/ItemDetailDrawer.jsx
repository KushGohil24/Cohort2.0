import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../../services/api';

const ItemDetailDrawer = ({ item, isOpen, onClose, onDelete, onUpdate, onSelectItem }) => {
  const [relatedItems, setRelatedItems] = useState([]);
  const [loadingRelated, setLoadingRelated] = useState(false);
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    if (isOpen && item?._id) {
      const fetchRelated = async () => {
        setLoadingRelated(true);
        try {
          const { data } = await api.get(`/items/${item._id}/related`);
          setRelatedItems(data);
        } catch (err) {
          console.error("Failed to fetch related items", err);
        } finally {
          setLoadingRelated(false);
        }
      };
      fetchRelated();
    } else {
      setRelatedItems([]);
    }
  }, [isOpen, item?._id]);

  if (!isOpen || !item) return null;

  const handleShare = () => {
    const link = item.url || item.fileUrl;
    if (link) {
      navigator.clipboard.writeText(link);
      toast.success('Link copied to clipboard!');
    } else {
      toast.error('No link available to share');
    }
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && newTag.trim()) {
      const updatedTags = [...(item.tags || []), newTag.trim()];
      onUpdate(item._id, { tags: updatedTags });
      setNewTag('');
      setIsAddingTag(false);
      toast.success('Tag added');
    }
  };

  const removeTag = (tagToRemove) => {
    const updatedTags = item.tags.filter(t => t !== tagToRemove);
    onUpdate(item._id, { tags: updatedTags });
    toast.success('Tag removed');
  };

  return (
    <>
      {/* Overlay Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Item Detail Drawer */}
      <aside className="fixed inset-y-0 right-0 w-[500px] max-w-[100vw] z-50 bg-slate-900 dark:bg-slate-950 flex flex-col h-full border-l border-white/5 font-headline shadow-2xl shadow-indigo-950/50 transform transition-transform duration-300">
        
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 shrink-0">
          <div className="flex flex-col">
            <h2 className="text-lg font-bold text-indigo-400 dark:text-[#d0bcff]">Item Details</h2>
            <span className="text-xs text-slate-500 font-medium tracking-widest uppercase">Knowledge Node</span>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 text-slate-400 transition-all"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Full Thumbnail */}
          <div className="w-full aspect-video overflow-hidden relative group shrink-0">
            <img 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              alt={item.title} 
              src={item.thumbnail || item.url || "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800&q=80"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
            <div className="absolute bottom-4 left-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md text-primary text-[10px] font-bold uppercase tracking-wider border border-primary/20">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                {item.type}
              </span>
            </div>
          </div>

          {/* Content Header */}
          <div className="px-8 pt-8 pb-6 border-b border-white/5">
            <div className="flex items-center gap-2 mb-3 text-slate-400 text-sm">
              {item.type === 'youtube' ? (
                <span className="material-symbols-outlined text-error text-sm" style={{fontVariationSettings: "'FILL' 1"}}>play_circle</span>
              ) : item.type === 'tweet' ? (
                <span className="material-symbols-outlined text-[#1DA1F2] text-sm">chat</span>
              ) : item.favicon ? (
                <img alt="Favicon" className="w-4 h-4 rounded-sm bg-white" src={item.favicon} />
              ) : (
                <span className="material-symbols-outlined text-sm">public</span>
              )}
              <span className="font-medium">{item.type === 'youtube' ? 'youtube.com' : item.domain || "Local Note"}</span>
            </div>
            <h1 className="text-2xl font-bold text-white leading-tight mb-4 selection:bg-primary-container">
              {item.title}
            </h1>

            {/* Tag Chips */}
            <div className="flex flex-wrap gap-2 mb-8">
              {item.tags?.map((tag) => (
                <span key={tag} className="px-3 py-1.5 rounded-lg bg-surface-container-high text-slate-300 text-xs font-medium flex items-center gap-2 hover:bg-white/10 cursor-pointer transition-colors group">
                  #{tag}
                  <span onClick={(e) => { e.stopPropagation(); removeTag(tag); }} className="material-symbols-outlined text-[14px] opacity-0 group-hover:opacity-100 transition-opacity hover:text-error">close</span>
                </span>
              ))}
              {item.aiTags?.map((tag) => (
                <span key={tag} className="px-3 py-1.5 rounded-lg bg-primary-container/20 text-primary text-xs font-bold flex items-center gap-2 border border-primary/20 cursor-default">
                  <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>auto_awesome</span>
                  {tag}
                </span>
              ))}
              
              {isAddingTag ? (
                <input
                  autoFocus
                  className="px-3 py-1.5 rounded-lg bg-surface-container-lowest border border-primary/50 text-white text-xs outline-none w-24"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={handleAddTag}
                  onBlur={() => setIsAddingTag(false)}
                  placeholder="Tag..."
                />
              ) : (
                <button 
                  onClick={() => setIsAddingTag(true)}
                  className="p-1.5 rounded-lg border border-dashed border-slate-700 text-slate-500 hover:text-indigo-400 hover:border-indigo-400/50 transition-all flex items-center justify-center"
                >
                  <span className="material-symbols-outlined text-[18px]">add</span>
                </button>
              )}
            </div>

            {/* Action Grid */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {item.url && (
                <a href={item.url} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-br from-primary to-primary-container text-on-primary-container font-bold text-sm shadow-lg shadow-primary/10 hover:opacity-90 transition-all active:scale-95">
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                  Open Original
                </a>
              )}
              <button onClick={() => onUpdate && onUpdate(item._id, { isFavorite: !item.isFavorite })} className="flex items-center justify-center gap-2 py-3 rounded-xl bg-surface-container-highest text-primary font-bold text-sm hover:bg-white/10 transition-all active:scale-95">
                <span className="material-symbols-outlined text-sm" style={item.isFavorite ? {fontVariationSettings: "'FILL' 1"} : {}}>grade</span>
                {item.isFavorite ? 'Unfavorite' : 'Favorite'}
              </button>
            </div>

            {/* AI Insight Section */}
            {item.aiSummary && (
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 mb-8 mt-2 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-50 transition-opacity">
                  <span className="material-symbols-outlined text-4xl text-primary" style={{fontVariationSettings: "'FILL' 1"}}>auto_awesome</span>
                </div>
                <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>auto_awesome</span>
                  AI Semantic Insight
                </h3>
                <p className="text-sm text-slate-100 leading-relaxed font-headline italic">
                  "{item.aiSummary}"
                </p>
              </div>
            )}

            {/* Description */}
            <div className="space-y-4 mb-10">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Original Context</h3>
              <div className="p-4 rounded-xl bg-slate-950/30 border border-white/5">
                <p className="text-slate-400 leading-relaxed font-body whitespace-pre-wrap text-sm line-clamp-[10] hover:line-clamp-none transition-all">
                  {item.description || item.rawText || "No additional context available."}
                </p>
              </div>
            </div>

            {/* Related Concepts / Items Section */}
            <div className="space-y-4 border-t border-white/5 pt-8 mb-8">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">hub</span>
                Related Concepts
              </h3>
              
              {loadingRelated ? (
                <div className="flex gap-4 overflow-x-auto pb-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-40 h-24 shrink-0 rounded-xl bg-white/5 animate-pulse"></div>
                  ))}
                </div>
              ) : relatedItems.length > 0 ? (
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                  {relatedItems.map(related => (
                    <div 
                      key={related._id}
                      onClick={() => onSelectItem && onSelectItem(related)}
                      className="w-48 shrink-0 p-3 rounded-xl bg-surface-container-high border border-white/5 hover:border-primary/30 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-[14px] text-slate-500">
                          {related.type === 'youtube' ? 'play_circle' : 'article'}
                        </span>
                        <span className="text-[9px] text-slate-500 font-bold uppercase truncate">{related.type}</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-200 line-clamp-2 group-hover:text-primary transition-colors">
                        {related.name || related.title}
                      </h4>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[10px] text-slate-600 italic">No semantic relatives discovered yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="px-6 py-5 bg-slate-900/50 backdrop-blur-md border-t border-white/5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <button onClick={() => onUpdate && onUpdate(item._id, { isArchived: !item.isArchived })} className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all ${item.isArchived ? 'bg-indigo-500/20 text-indigo-400' : 'bg-surface-container-high text-slate-400 hover:text-indigo-400'}`} title={item.isArchived ? "Unarchive" : "Archive"}>
              <span className="material-symbols-outlined" style={item.isArchived ? {fontVariationSettings: "'FILL' 1"} : {}}>archive</span>
            </button>
            <button onClick={handleShare} className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface-container-high text-slate-400 hover:text-indigo-400 transition-all" title="Share">
              <span className="material-symbols-outlined">share</span>
            </button>
          </div>
          <button onClick={() => { onDelete && onDelete(item._id); onClose(); }} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-error-container/20 text-error font-bold text-sm hover:bg-error-container/40 transition-all">
            <span className="material-symbols-outlined text-sm">delete</span>
            Delete Node
          </button>
        </div>
      </aside>
    </>
  );
};

export default ItemDetailDrawer;
