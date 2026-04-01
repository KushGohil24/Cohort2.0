import React from 'react';
import toast from 'react-hot-toast';

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const ItemCard = ({ item, onDelete, onUpdate }) => {
  const handleShare = (e) => {
    e.stopPropagation();
    const link = item.url || item.fileUrl;
    if (link) {
      navigator.clipboard.writeText(link);
      toast.success('Link copied! 📋✨', {
        style: {
          background: '#0b1326',
          color: '#fff',
          border: '1px solid rgba(99, 102, 241, 0.2)'
        }
      });
    } else {
      toast.error('No source link available');
    }
  };
  // Utility for hover actions
  const renderHoverActions = () => (
    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
      <button onClick={(e) => { e.stopPropagation(); onUpdate && onUpdate(item._id, { isFavorite: !item.isFavorite }); }} className={`w-10 h-10 rounded-full bg-white/10 backdrop-blur-md transition-all ${item.isFavorite ? 'bg-primary text-on-primary shadow-lg shadow-primary/40' : 'text-white hover:bg-primary hover:text-on-primary'}`}>
        <span className="material-symbols-outlined text-lg" style={item.isFavorite ? {fontVariationSettings: "'FILL' 1"} : {}}>grade</span>
      </button>
      <button onClick={handleShare} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-primary hover:text-on-primary transition-all">
        <span className="material-symbols-outlined text-lg">link</span>
      </button>
      <button onClick={(e) => { e.stopPropagation(); onDelete(item._id); }} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-error hover:text-on-error transition-all">
        <span className="material-symbols-outlined text-lg">delete</span>
      </button>
    </div>
  );

  const renderProcessingOverlay = () => {
    if (item.status === 'completed' || !item.status) return null;
    return (
      <div className="absolute inset-0 z-10 bg-slate-950/60 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center">
        <div className="flex gap-1 mb-3">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
        </div>
        <p className="text-xs font-bold text-white uppercase tracking-widest">AI Enrichment</p>
        <p className="text-[10px] text-slate-400 mt-1">Deep analysis in progress...</p>
      </div>
    );
  };

  const renderTags = () => (
    <div className="mt-auto flex flex-wrap gap-2 mb-4 pt-4">
      {item.tags?.map((tag) => (
        <span key={tag} className="px-2 py-0.5 bg-secondary-container/20 text-secondary text-[10px] font-semibold rounded-md">
          #{tag}
        </span>
      ))}
      {item.aiTags?.map((tag) => (
        <span key={tag} className="px-2 py-0.5 bg-primary-container/20 text-primary text-[10px] font-semibold rounded-md flex items-center gap-1">
          <span className="material-symbols-outlined text-[10px]" style={{fontVariationSettings: "'FILL' 1"}}>auto_awesome</span>
          {tag}
        </span>
      ))}
    </div>
  );

  // Different renderings based on item type
  switch (item.type) {
    case 'article':
      return (
        <div className="group relative bg-surface-container-low rounded-xl overflow-hidden transition-all duration-300 hover:bg-surface-container-high hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-950/50 flex flex-col h-full border border-white/5">
          {renderProcessingOverlay()}
          <div className="aspect-video w-full overflow-hidden relative shrink-0">
            <img 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              alt={item.title} 
              src={item.thumbnail || "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
            />
            <div className="absolute top-3 left-3 px-2 py-1 bg-primary-container/90 backdrop-blur-md rounded-md text-[10px] font-bold text-on-primary-container uppercase tracking-wider">
              Article
            </div>
            {renderHoverActions()}
          </div>
          <div className="p-5 flex flex-col flex-1">
            <div className="flex items-center gap-2 mb-3">
              {item.favicon && <img className="w-4 h-4 rounded-sm" alt="favicon" src={item.favicon} />}
              <span className="text-[10px] text-slate-500 font-medium">{item.domain || "website"}</span>
            </div>
            <h3 className="text-lg font-headline font-bold leading-snug text-slate-100 line-clamp-2 mb-2 group-hover:text-primary transition-colors">
              {item.title}
            </h3>
            <p className="text-sm text-slate-400 font-body line-clamp-3 mb-4 leading-relaxed">
              {item.description || item.rawText?.substring(0, 150) + "..."}
            </p>
            {renderTags()}
            <div className="flex items-center justify-between mt-auto text-[10px] text-slate-500 font-medium">
              <span>Added {formatDate(item.createdAt)}</span>
              <span onClick={(e) => e.stopPropagation()} className="material-symbols-outlined text-sm cursor-pointer">more_horiz</span>
            </div>
          </div>
        </div>
      );

    case 'youtube':
      return (
        <div className="group relative bg-surface-container-low rounded-xl overflow-hidden transition-all duration-300 hover:bg-surface-container-high hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-950/50 flex flex-col h-full border border-white/5">
          {renderProcessingOverlay()}
          <div className="aspect-video w-full overflow-hidden relative shrink-0">
            <img 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              alt={item.title} 
              src={item.thumbnail || `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`}
            />
            <div className="absolute top-3 left-3 px-2 py-1 bg-error/90 backdrop-blur-md rounded-md text-[10px] font-bold text-on-error uppercase tracking-wider">
              YouTube
            </div>
            {renderHoverActions()}
          </div>
          <div className="p-5 flex flex-col flex-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-error text-sm" style={{fontVariationSettings: "'FILL' 1"}}>play_circle</span>
              <span className="text-[10px] text-slate-500 font-medium">youtube.com</span>
            </div>
            <h3 className="text-lg font-headline font-bold leading-snug text-slate-100 line-clamp-2 mb-2 group-hover:text-primary transition-colors">
              {item.title}
            </h3>
            {renderTags()}
            <div className="flex items-center justify-between mt-auto text-[10px] text-slate-500 font-medium">
              <span>Added {formatDate(item.createdAt)}</span>
              <span onClick={(e) => e.stopPropagation()} className="material-symbols-outlined text-sm cursor-pointer">more_horiz</span>
            </div>
          </div>
        </div>
      );

    case 'tweet':
      return (
        <div className="group relative bg-surface-container-low rounded-xl overflow-hidden transition-all duration-300 hover:bg-surface-container-high hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-950/50 flex flex-col h-full">
          <div className="p-5 flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  {item.title.charAt(0)}
                </div>
                <div>
                  <p className="text-[12px] font-bold text-slate-100 leading-tight">{item.title}</p>
                  <p className="text-[10px] text-slate-500">{item.domain || "twitter.com"}</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#1DA1F2] text-xl">chat</span>
            </div>
            <p className="text-sm text-slate-200 font-body mb-4 leading-relaxed">
              "{item.description || item.rawText}"
            </p>
            {renderTags()}
            <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500 font-medium">
              <span>Added {formatDate(item.createdAt)}</span>
              <div className="flex gap-2">
                <span onClick={(e) => { e.stopPropagation(); onUpdate && onUpdate(item._id, { isFavorite: !item.isFavorite }); }} className={`material-symbols-outlined text-sm cursor-pointer ${item.isFavorite ? 'text-primary' : 'hover:text-white'}`} style={item.isFavorite ? {fontVariationSettings: "'FILL' 1"} : {}}>favorite</span>
                <span onClick={handleShare} className="material-symbols-outlined text-sm cursor-pointer hover:text-white">share</span>
                <span onClick={(e) => { e.stopPropagation(); onDelete(item._id); }} className="material-symbols-outlined text-sm cursor-pointer hover:text-error">delete</span>
              </div>
            </div>
          </div>
        </div>
      );

    case 'pdf':
      return (
        <div className="group relative bg-surface-container-low rounded-xl overflow-hidden transition-all duration-300 hover:bg-surface-container-high hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-950/50 flex flex-col h-full">
          <div className="p-5 flex flex-col h-full bg-gradient-to-br from-surface-container-low to-surface-container-high">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-14 bg-error-container/20 rounded-md flex items-center justify-center border border-error/20">
                <span className="material-symbols-outlined text-error text-3xl">picture_as_pdf</span>
              </div>
              <div>
                <p className="text-[10px] text-error font-bold uppercase tracking-widest">Document</p>
                <h3 className="text-sm font-headline font-bold text-slate-100 leading-tight break-all">{item.title}</h3>
              </div>
            </div>
            <p className="text-sm text-slate-400 font-body line-clamp-3 mb-6 italic leading-relaxed">
              {item.description || "PDF Document"}
            </p>
            {renderTags()}
            <div className="mt-auto flex items-center justify-between text-[10px] text-slate-500 font-medium">
              <div className="flex gap-2">
                {item.fileSize && <span className="px-2 py-0.5 bg-surface-container-highest text-slate-300 rounded">{Math.round(item.fileSize/1024)} KB</span>}
              </div>
              <div className="flex gap-2 items-center">
                <span>{formatDate(item.createdAt)}</span>
                <span onClick={(e) => { e.stopPropagation(); onDelete(item._id); }} className="material-symbols-outlined text-sm cursor-pointer hover:text-error opacity-0 group-hover:opacity-100 transition-opacity">delete</span>
              </div>
            </div>
          </div>
        </div>
      );

    case 'image':
      return (
        <div className="group relative bg-surface-container-low rounded-xl overflow-hidden transition-all duration-300 hover:bg-surface-container-high hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-950/50 flex flex-col h-full border border-white/5">
          {renderProcessingOverlay()}
          <div className="relative overflow-hidden group flex-1 h-full min-h-[240px]">
            <img 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              alt={item.title} 
              src={item.url || item.fileUrl}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
            <div className="absolute bottom-4 left-4">
              <span className="px-2 py-1 bg-white/10 backdrop-blur-md rounded-md text-[10px] font-bold text-white uppercase tracking-wider">Reference Image</span>
              <h3 className="text-white font-headline font-bold mt-2">{item.title}</h3>
            </div>
            <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <button onClick={handleShare} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-primary hover:text-on-primary transition-all">
                <span className="material-symbols-outlined text-lg">download</span>
              </button>
              <button onClick={(e) => { e.stopPropagation(); onUpdate && onUpdate(item._id, { isFavorite: !item.isFavorite }); }} className={`w-10 h-10 rounded-full bg-white/10 backdrop-blur-md transition-all ${item.isFavorite ? 'bg-primary text-on-primary' : 'text-white hover:bg-primary hover:text-on-primary'}`}>
                <span className="material-symbols-outlined text-lg" style={item.isFavorite ? {fontVariationSettings: "'FILL' 1"} : {}}>grade</span>
              </button>
              <button onClick={(e) => { e.stopPropagation(); onDelete(item._id); }} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-error hover:text-on-error transition-all">
                <span className="material-symbols-outlined text-lg">delete</span>
              </button>
            </div>
          </div>
        </div>
      );

    case 'note':
    default:
      return (
        <div className="group relative bg-surface-container-low rounded-xl overflow-hidden transition-all duration-300 hover:bg-surface-container-high hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-950/50 flex flex-col h-full">
          <div className="p-5 flex flex-col h-full border-t-4 border-primary/40">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-primary text-sm">edit_note</span>
              <span className="text-[10px] text-slate-500 font-medium">Local Sanctuary</span>
            </div>
            <h3 className="text-lg font-headline font-bold leading-snug text-slate-100 line-clamp-2 mb-2 group-hover:text-primary transition-colors">
              {item.title}
            </h3>
            <p className="text-sm text-slate-400 font-body line-clamp-3 mb-4 leading-relaxed">
              {item.description || item.rawText}
            </p>
            {renderTags()}
            <div className="flex items-center justify-between mt-auto text-[10px] text-slate-500 font-medium">
              <span>Added {formatDate(item.createdAt)}</span>
              <div className="flex gap-2">
                <button onClick={(e) => { e.stopPropagation(); onUpdate && onUpdate(item._id, { isFavorite: !item.isFavorite }); }} className={`transition-opacity ${item.isFavorite ? 'text-primary opacity-100' : 'text-slate-400 hover:text-primary opacity-0 group-hover:opacity-100'}`}>
                  <span className="material-symbols-outlined text-sm" style={item.isFavorite ? {fontVariationSettings: "'FILL' 1"} : {}}>grade</span>
                </button>
                <button onClick={(e) => { e.stopPropagation(); onDelete(item._id); }} className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-error"><span className="material-symbols-outlined text-sm">delete</span></button>
              </div>
            </div>
          </div>
        </div>
      );
  }
};

export default ItemCard;
