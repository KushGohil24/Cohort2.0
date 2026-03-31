import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getUploadAuth, extractUrl, getCollections } from '../../services/api';
import toast from 'react-hot-toast';


const SaveItemModal = ({ isOpen, onClose, onSave }) => {
  const [activeTab, setActiveTab] = useState('url'); // 'url' or 'file'
  const [url, setUrl] = useState('');
  const [file, setFile] = useState(null);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [collection, setCollection] = useState('');
  
  const [thumbnail, setThumbnail] = useState(null);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    if (isOpen) {
      const fetchCollections = async () => {
        try {
          const data = await getCollections();
          setCollections(data);
          if (data.length > 0) setCollection(data[0]._id);
        } catch (err) {
          console.error("Failed to fetch collections", err);
        }
      };
      fetchCollections();
    }
  }, [isOpen]);



  if (!isOpen) return null;

  const handlePreview = async () => {
    if (!url) {
      toast.error("Please enter a URL first");
      return;
    }
    setIsExtracting(true);
    try {
      const data = await extractUrl(url);
      setTitle(data.title || "");
      setDescription(data.description || "");
      setThumbnail(data.thumbnail || "");
      
      // Auto-populate tags from AI suggestions
      if (data.aiTags && data.aiTags.length > 0) {
        setTags(prev => [...new Set([...prev, ...data.aiTags])]);
      }
      
      setIsPreviewing(true);
      toast.success("Content extracted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to extract URL. Please enter details manually.");
      setIsPreviewing(true);
    } finally {
      setIsExtracting(false);
    }
  };

  const addTag = (e) => {
    if (e.key === 'Enter' && newTag.trim()) {
      e.preventDefault();
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setTitle(e.dataTransfer.files[0].name);
      setIsPreviewing(true);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setTitle(e.target.files[0].name);
      setIsPreviewing(true);
    }
  };

  const uploadToImageKit = async (selectedFile) => {
    try {
      const authData = await getUploadAuth();
      if (!authData.publicKey || authData.publicKey.includes("dummy")) {
        toast.error("ImageKit is not configured in backend .env");
        throw new Error("Missing ImageKit config");
      }

      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("publicKey", authData.publicKey);
      formData.append("signature", authData.signature);
      formData.append("expire", authData.expire);
      formData.append("token", authData.token);
      formData.append("fileName", selectedFile.name);
      formData.append("folder", "/secondbrain");

      const res = await axios.post("https://upload.imagekit.io/api/v1/files/upload", formData);
      return res.data.url;
    } catch (err) {
      console.error("ImageKit Upload failed:", err);
      throw err;
    }
  };

  const handleSave = async () => {
    try {
      if (activeTab === 'file' && file) {
        setIsUploading(true);
        const uploadedUrl = await uploadToImageKit(file);
        
        let fileType = "note";
        if (file.type.includes("pdf")) fileType = "pdf";
        if (file.type.includes("image")) fileType = "image";

        await onSave({
           type: fileType,
           title: title || file.name,
           description,
           tags,
           collectionIds: (collection && collection !== "") ? [collection] : [],
           fileUrl: uploadedUrl
        });
      } else {
        await onSave({ 
          url, 
          title: title || undefined, 
          description: description || undefined, 
          tags, 
          collectionIds: (collection && collection !== "") ? [collection] : []
        });
      }
      onClose();
    } catch (err) {
      alert("Failed to save item. Check console.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-surface-container-lowest/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 text-on-surface">
      <div className="w-full max-w-2xl bg-surface-dim/70 backdrop-blur-xl rounded-xl shadow-2xl shadow-surface-container-lowest flex flex-col overflow-hidden outline outline-1 outline-white/10">
        
        {/* Modal Header */}
        <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between">
          <div>
            <h2 className="font-headline text-2xl font-bold tracking-tight">Save New Item</h2>
            <div className="flex gap-4 mt-3">
              <button 
                onClick={() => { setActiveTab('url'); setIsPreviewing(false); }}
                className={`text-sm font-bold pb-1 transition-colors ${activeTab === 'url' ? 'text-primary border-b-2 border-primary' : 'text-slate-500 hover:text-slate-300'}`}
              >
                Web Link
              </button>
              <button 
                onClick={() => { setActiveTab('file'); setIsPreviewing(false); }}
                className={`text-sm font-bold pb-1 transition-colors ${activeTab === 'file' ? 'text-primary border-b-2 border-primary' : 'text-slate-500 hover:text-slate-300'}`}
              >
                Upload File
              </button>
            </div>
          </div>
          <button onClick={onClose} className="text-on-surface-variant hover:text-on-surface transition-colors p-2 hover:bg-white/5 rounded-lg self-start">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-8 space-y-8 overflow-y-auto max-h-[70vh]">
          
          {/* TAB: URL Input */}
          {activeTab === 'url' && (
            <div className="space-y-3 animate-in fade-in duration-300">
              <label className="font-headline text-sm font-semibold tracking-wide text-indigo-300 flex items-center gap-2">
                <span className="material-symbols-outlined text-base">link</span> SOURCE URL
              </label>
              <div className="flex gap-3">
                <input 
                  className="flex-grow bg-surface-container-lowest border border-white/10 rounded-lg px-4 py-3 placeholder:text-outline/50 focus:ring-1 focus:ring-primary/30 transition-all font-body outline-none" 
                  placeholder="Paste link here... (Article, YouTube, Tweet)" 
                  type="text" 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
                <button 
                  onClick={handlePreview}
                  disabled={isExtracting || !url}
                  className="px-6 py-3 bg-surface-container-highest text-primary font-semibold rounded-lg hover:bg-surface-bright transition-all flex items-center gap-2 whitespace-nowrap disabled:opacity-50"
                >
                  {isExtracting ? (
                    <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <span className="material-symbols-outlined text-lg">auto_awesome</span>
                  )}
                  {isExtracting ? 'Extracting...' : 'Preview'}
                </button>
              </div>
            </div>
          )}

          {/* TAB: File Upload Input */}
          {activeTab === 'file' && !file && (
            <div 
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="border-2 border-dashed border-white/10 hover:border-primary/50 rounded-xl p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-surface-container-lowest/50 group"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl">upload_file</span>
              </div>
              <h3 className="font-headline font-bold text-lg mb-1">Drag & Drop file here</h3>
              <p className="text-sm text-slate-500 mb-6">Supports PDF, JPG, PNG up to 10MB</p>
              
              <label className="px-6 py-2.5 bg-surface-container-highest text-primary font-semibold rounded-lg hover:bg-surface-bright transition-all cursor-pointer">
                Browse Files
                <input type="file" className="hidden" accept=".pdf,image/png,image/jpeg,image/webp" onChange={handleFileSelect} />
              </label>
            </div>
          )}

          {activeTab === 'file' && file && (
            <div className="flex items-center justify-between p-4 bg-surface-container-highest rounded-lg border border-primary/20 animate-in fade-in">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-3xl">{file.type.includes('pdf') ? 'picture_as_pdf' : 'image'}</span>
                <div>
                  <p className="font-bold text-sm text-slate-200 truncate max-w-xs">{file.name}</p>
                  <p className="text-xs text-slate-500">{Math.round(file.size / 1024)} KB</p>
                </div>
              </div>
              <button onClick={() => { setFile(null); setIsPreviewing(false); }} className="text-slate-400 hover:text-error transition-colors p-2">
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          )}

          {/* Extract Details Context */}
          {isPreviewing && (
            <div className="space-y-6 pt-4 border-t border-white/5 animate-in fade-in duration-500">
              <div className="flex flex-col md:flex-row gap-6">
                {activeTab === 'url' && (
                  <div className="w-full md:w-32 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-surface-container-lowest border border-white/5">
                    <img className="w-full h-full object-cover opacity-80" alt="Preview Thumbnail" src={thumbnail} />
                  </div>
                )}
                <div className="flex-grow space-y-3">
                  <input 
                    className="w-full bg-transparent border-none p-0 font-headline text-xl font-bold text-on-surface focus:ring-0 leading-tight outline-none" 
                    type="text" 
                    placeholder="Enter Title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <textarea 
                    className="w-full bg-transparent border-none p-0 text-on-surface-variant text-sm leading-relaxed resize-none focus:ring-0 h-16 outline-none" 
                    placeholder="Add a description or context..." 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>

              {/* Tags and Metadata Editor */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="font-headline text-sm font-semibold tracking-wide text-indigo-300 flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">label</span> TAGS
                  </label>
                  <div className="flex flex-wrap gap-2 p-3 bg-surface-container-lowest rounded-lg border border-white/5 min-h-[50px]">
                    {tags.map((tag, i) => (
                      <span key={i} className="bg-secondary-container/20 text-secondary text-xs font-semibold px-2 py-1 rounded-md flex items-center gap-1">
                        {tag}
                        <button onClick={() => removeTag(tag)} type="button" className="hover:text-white flex items-center">
                          <span className="material-symbols-outlined text-[14px]">close</span>
                        </button>
                      </span>
                    ))}
                    <input 
                      className="bg-transparent border-none p-0 text-xs focus:ring-0 flex-grow min-w-[60px] text-on-surface outline-none" 
                      placeholder="Add tag and press Enter..." 
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyDown={addTag}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="font-headline text-sm font-semibold tracking-wide text-indigo-300 flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">folder_open</span> COLLECTION
                  </label>
                  <div className="relative group">
                    <select 
                      className="w-full bg-surface-container-lowest border border-white/5 rounded-lg px-4 py-3 text-on-surface text-sm appearance-none focus:ring-1 focus:ring-primary/30 outline-none"
                      value={collection}
                      onChange={(e) => setCollection(e.target.value)}
                    >
                      {collections.length > 0 ? (
                        collections.map(c => (
                          <option key={c._id} value={c._id}>{c.name}</option>
                        ))
                      ) : (
                        <option value="">No Collections</option>
                      )}
                    </select>
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-outline">expand_more</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-8 py-6 bg-surface-container-low border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-sm">info</span>
            <span className="text-xs">Automatically indexed for semantic search.</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={onClose} className="px-6 py-2.5 text-on-surface-variant font-semibold hover:text-on-surface transition-colors outline-none">
              Cancel
            </button>
            <button 
              onClick={handleSave} 
              disabled={isUploading}
              className="bg-gradient-to-br from-primary to-primary-container disabled:from-surface-container-highest disabled:to-surface-container-highest disabled:text-outline px-8 py-2.5 text-on-primary-container font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all outline-none flex items-center gap-2"
            >
              {isUploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-outline border-t-white rounded-full animate-spin"></div>
                  Uploading...
                </>
              ) : (
                'Save to Brain'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveItemModal;
