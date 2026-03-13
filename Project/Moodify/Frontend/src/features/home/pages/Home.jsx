import React, { useState, useEffect, useRef } from 'react';
import FaceExpression from '../../Expression/components/FaceExpression';
import MusicPlayer from '../../Music/components/MusicPlayer';
import Sidebar from '../../shared/components/Sidebar';
import PlaylistPanel from '../../Music/components/PlaylistPanel';
import EdgeLight from '../../Music/components/EdgeLight';
import { getSong, searchSongs, getLikedSongs } from '../services/song.api';
import { useAuth } from '../../auth/auth.context';
import './Home.scss';

const Home = () => {
    const { user, setUser } = useAuth();
    const [mood, setMood] = useState('happy');
    const [activeTab, setActiveTab] = useState('home');
    const [searchQuery, setSearchQuery] = useState('');
    const [songs, setSongs] = useState([]);
    const [currentSong, setCurrentSong] = useState(null);
    const [isEdgeLightEnabled, setIsEdgeLightEnabled] = useState(false);
    
    const audioRef = useRef(null);

    // Fetch playlist when mood, tab, or search query changes
    useEffect(() => {
        const fetchSongs = async () => {
            try {
                let fetchedSongs = [];
                if (activeTab === 'home') {
                    const data = await getSong({ mood: mood.toLowerCase() });
                    if (data?.songs && Array.isArray(data.songs)) {
                        fetchedSongs = data.songs;
                    } else if (data?.song) {
                        fetchedSongs = [data.song];
                    }
                } else if (activeTab === 'search') {
                    if (searchQuery.trim().length > 0) {
                        const data = await searchSongs(searchQuery);
                        fetchedSongs = data.songs || [];
                    } else {
                        fetchedSongs = []; // Empty search
                    }
                } else if (activeTab === 'liked') {
                    const data = await getLikedSongs();
                    fetchedSongs = data.songs || [];
                }

                setSongs(fetchedSongs);

                // Auto-select first song if changing tab/mood
                // Don't auto-select while typing a search!
                if (activeTab !== 'search' || (activeTab === 'search' && searchQuery)) {
                    // if current song is no longer in list, deselect
                    const isStillThere = fetchedSongs.find(s => s._id === currentSong?._id);
                    // maybe don't forcefully overwrite playing song if just navigating
                    if (!currentSong) {
                        setCurrentSong(fetchedSongs[0] || null);
                    }
                }
            } catch (err) {
                console.error("Failed to fetch songs", err);
                setSongs([]);
            }
        };

        // debouncer for search
        const delaySearch = setTimeout(() => {
            fetchSongs();
        }, 300);

        return () => clearTimeout(delaySearch);
    }, [mood, activeTab, searchQuery]);

    const handleSongSelect = (song) => {
        setCurrentSong(song);
    };

    const handleNext = (isShuffling = false) => {
        if (!songs.length || !currentSong) return;
        
        if (isShuffling && songs.length > 1) {
            let nextIdx;
            const currentIdx = songs.findIndex(s => s._id === currentSong._id);
            do {
                nextIdx = Math.floor(Math.random() * songs.length);
            } while (nextIdx === currentIdx);
            setCurrentSong(songs[nextIdx]);
        } else {
            const idx = songs.findIndex(s => s._id === currentSong._id);
            const nextIdx = (idx + 1) % songs.length;
            setCurrentSong(songs[nextIdx]);
        }
    };

    const handlePrev = () => {
        if (!songs.length || !currentSong) return;
        const idx = songs.findIndex(s => s._id === currentSong._id);
        const prevIdx = (idx - 1 + songs.length) % songs.length;
        setCurrentSong(songs[prevIdx]);
    };

    const handleToggleLike = (newLikedList) => {
        if(setUser) {
             setUser(prev => ({...prev, likedSongs: newLikedList}));
        }
    };

    return (
        <div className="aura-layout">
            <EdgeLight isEnabled={isEdgeLightEnabled} audioRef={audioRef} />
            
            <Sidebar 
                currentMood={mood} 
                onMoodSelect={(m) => {
                    setMood(m);
                    setActiveTab('home');
                }} 
                onRecalibrate={() => setActiveTab('home')} 
                activeTab={activeTab}
                onTabSelect={setActiveTab}
            />

            <main className="aura-main">
                {activeTab === 'home' && (
                    <FaceExpression 
                        onMoodDetected={(detected) => setMood(detected)} 
                        currentMood={mood} 
                    />
                )}
                
                {activeTab === 'search' && (
                    <div className="search-panel" style={{ width: '100%', maxWidth: '600px', margin: '0 auto', paddingTop: '40px' }}>
                        <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '24px', textAlign: 'center' }}>Search Library</h2>
                        <input
                            type="text"
                            placeholder="Search by song title..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '16px 24px',
                                borderRadius: '24px',
                                backgroundColor: 'var(--bg-surface)',
                                border: '1px solid var(--border-color)',
                                color: 'white',
                                fontSize: '16px',
                                outline: 'none'
                            }}
                        />
                    </div>
                )}

                {activeTab === 'liked' && (
                     <div className="liked-header-large" style={{ width: '100%', maxWidth: '600px', margin: '0 auto', paddingTop: '40px', textAlign: 'center' }}>
                         <div style={{ fontSize: '64px', marginBottom: '16px' }}>
                             <i className="ri-heart-3-fill" style={{ color: '#ec4899' }}></i>
                         </div>
                         <h2 style={{ fontSize: '32px', fontWeight: 'bold' }}>Liked Songs</h2>
                         <p style={{ color: 'var(--text-secondary)' }}>Your personal collection.</p>
                     </div>
                )}
            </main>

            <PlaylistPanel 
                songs={songs} 
                currentSong={currentSong} 
                onPlaySong={handleSongSelect} 
            />

            <div className="aura-player">
                <MusicPlayer 
                    song={currentSong} 
                    onNext={handleNext}
                    onPrev={handlePrev}
                    isEdgeLightEnabled={isEdgeLightEnabled}
                    onToggleEdgeLight={() => setIsEdgeLightEnabled(!isEdgeLightEnabled)}
                    audioRef={audioRef}
                    likedSongs={user?.likedSongs || []}
                    onLikeToggle={handleToggleLike}
                />
            </div>
        </div>
    );
};

export default Home;