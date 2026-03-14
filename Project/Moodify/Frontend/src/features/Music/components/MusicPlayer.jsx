import React, { useRef, useState, useEffect } from 'react';
import { toggleLike } from '../../home/services/song.api';
import './MusicPlayer.scss';

const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
};

const parseSongTitle = (fullTitle) => {
    if (!fullTitle) return { title: 'Unknown', from: 'Unknown' };
    const match = fullTitle.match(/(.*?)\s*(?:-?\s*\(?\[?\bfrom\b\s*([^)|\]]*))/i);
    if (match) {
        return {
            title: match[1].trim() || fullTitle,
            from: match[2] ? match[2].trim() : 'Unknown'
        };
    }
    return { title: fullTitle, from: 'Unknown' };
};

const MusicPlayer = ({ 
    song, 
    onNext, 
    onPrev, 
    isEdgeLightEnabled, 
    onToggleEdgeLight, 
    audioRef,
    likedSongs = [],
    onLikeToggle
}) => {
    const progressRef = useRef(null);
    const fallbackAudioRef = useRef(null);
    const activeAudioRef = audioRef || fallbackAudioRef;

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [isShuffling, setIsShuffling] = useState(false);

    useEffect(() => {
        if (activeAudioRef.current && song?.url) {
            activeAudioRef.current.load();
            setCurrentTime(0);
            
            const playPromise = activeAudioRef.current.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    setIsPlaying(true);
                }).catch(e => {
                    console.log("Auto-play prevented", e);
                    setIsPlaying(false); // Fix: Revert to play button if blocked
                });
            } else {
                setIsPlaying(true); // Fallback for browsers that don't return promise
            }
        }
    }, [song, activeAudioRef]);

    useEffect(() => {
        if (activeAudioRef.current) {
            activeAudioRef.current.volume = isMuted ? 0 : volume;
            activeAudioRef.current.muted = isMuted;
            activeAudioRef.current.loop = isLooping;
        }
    }, [volume, isMuted, isLooping, activeAudioRef]);

    const togglePlay = () => {
        const audio = activeAudioRef.current;
        if (!audio || !song) return;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        if (activeAudioRef.current) {
            setCurrentTime(activeAudioRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (activeAudioRef.current) {
            setDuration(activeAudioRef.current.duration);
        }
    };

    const handleProgressClick = (e) => {
        if (!song || !duration) return;
        const bar = progressRef.current;
        const rect = bar.getBoundingClientRect();
        const ratio = (e.clientX - rect.left) / rect.width;
        const newTime = ratio * duration;
        if (activeAudioRef.current) {
            activeAudioRef.current.currentTime = newTime;
        }
        setCurrentTime(newTime);
    };

    const handleVolume = (e) => {
        const val = parseFloat(e.target.value);
        setVolume(val);
        if (activeAudioRef.current) {
            activeAudioRef.current.volume = val;
        }
        setIsMuted(val === 0);
    };

    const toggleMute = () => {
        const audio = activeAudioRef.current;
        if (!audio) return;
        if (isMuted) {
            const newVol = volume || 0.5;
            audio.volume = newVol;
            setVolume(newVol);
            setIsMuted(false);
        } else {
            audio.volume = 0;
            setIsMuted(true);
        }
    };

    const handleSongEnd = () => {
        // If looping, the audio element handles it natively because we set `loop={true}`.
        // It won't fire the `onEnded` event if looping.
        setIsPlaying(false);
        setCurrentTime(0);

        if (onNext) {
            onNext(isShuffling); 
        }
    };

    const handleLikeClick = async () => {
        if (!song) return;
        try {
            const data = await toggleLike(song._id);
            if (onLikeToggle) {
                onLikeToggle(data.likedSongs);
            }
        } catch (error) {
            console.error("Failed to toggle like", error);
        }
    };

    const progress = duration ? (currentTime / duration) * 100 : 0;
    const isLiked = song ? likedSongs.includes(song._id) : false;
    const parsedSong = song ? parseSongTitle(song.title) : null;

    return (
        <div className="aura-music-player">
            {song && (
                <audio
                    ref={activeAudioRef}
                    src={song.url}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={handleSongEnd}
                    crossOrigin="anonymous"
                />
            )}

            {/* Left Section: Info */}
            <div className="player-left">
                {song ? (
                    <>
                        <img className="player-poster" src={song.posterUrl} alt={parsedSong.title} />
                        <div className="player-meta">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                <p className="player-title" style={{ marginBottom: 0 }}>{parsedSong.title}</p>
                                <button 
                                    className={`like-btn ${isLiked ? 'liked' : ''}`} 
                                    onClick={handleLikeClick}
                                    style={{ 
                                        color: isLiked ? '#ec4899' : 'var(--text-secondary)', 
                                        background: 'transparent', 
                                        border: 'none', 
                                        cursor: 'pointer',
                                        padding: 0,
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                >
                                    <i className={isLiked ? "ri-heart-3-fill" : "ri-heart-3-line"} style={{ fontSize: '16px' }}></i>
                                </button>
                            </div>
                            <span className="player-artist">{parsedSong.from !== 'Unknown' ? `From: ${parsedSong.from}` : 'Unknown'}</span>
                            <span className="player-mood-badge">{song.mood}</span>
                        </div>
                    </>
                ) : (
                     <div className="player-meta">
                        <p className="player-title" style={{color: 'var(--text-muted)'}}>No song selected</p>
                    </div>
                )}
            </div>

            {/* Center Section: Controls & Progress */}
            <div className="player-center">
                <div className="player-controls-main">
                    <button 
                        className={`ctrl-btn shuffle ${isShuffling ? 'active' : ''}`} 
                        onClick={() => setIsShuffling(!isShuffling)}
                        title="Shuffle"
                        style={{ color: isShuffling ? 'var(--accent-primary)' : '' }}
                    >
                        <i className="ri-shuffle-line" style={{ fontSize: '20px' }}></i>
                    </button>
                    <button className="ctrl-btn skip-prev" onClick={onPrev} title="Previous">
                        <i className="ri-skip-back-fill" style={{ fontSize: '24px' }}></i>
                    </button>
                    <button className="ctrl-btn play-pause" onClick={togglePlay} title={isPlaying ? 'Pause' : 'Play'}>
                        {isPlaying ? (
                            <i className="ri-pause-circle-fill" style={{ fontSize: '36px' }}></i>
                        ) : (
                            <i className="ri-play-circle-fill" style={{ fontSize: '36px' }}></i>
                        )}
                    </button>
                    <button className="ctrl-btn skip-next" onClick={() => onNext && onNext(isShuffling)} title="Next">
                        <i className="ri-skip-forward-fill" style={{ fontSize: '24px' }}></i>
                    </button>
                    <button 
                        className={`ctrl-btn repeat ${isLooping ? 'active' : ''}`} 
                        onClick={() => setIsLooping(!isLooping)}
                        title="Repeat"
                        style={{ color: isLooping ? 'var(--accent-primary)' : '' }}
                    >
                        <i className="ri-repeat-2-line" style={{ fontSize: '20px' }}></i>
                    </button>
                </div>
                
                <div className="player-progress-container">
                    <span className="time">{formatTime(currentTime)}</span>
                    <div 
                        className="progress-bar-wrap"
                        ref={progressRef}
                        onClick={handleProgressClick}
                    >
                        <div className="progress-bar-bg"></div>
                        <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
                        <div className="progress-bar-thumb" style={{ left: `${progress}%` }}></div>
                    </div>
                    <span className="time">{formatTime(duration)}</span>
                </div>
            </div>

            {/* Right Section: Volume & Effects */}
            <div className="player-right">
                <button 
                    className={`edge-light-toggle ${isEdgeLightEnabled ? 'active' : ''}`} 
                    onClick={onToggleEdgeLight}
                    title="Toggle Edge Light Visualizer"
                >
                    <i className="ri-pulse-line" style={{ fontSize: '20px' }}></i>
                </button>
                <button className="ctrl-btn volume-btn" onClick={toggleMute} title="Mute">
                    {isMuted || volume === 0 ? (
                        <i className="ri-volume-mute-fill" style={{ fontSize: '20px' }}></i>
                    ) : (
                        <i className="ri-volume-up-fill" style={{ fontSize: '20px' }}></i>
                    )}
                </button>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolume}
                    className="volume-slider"
                />
            </div>
        </div>
    );
};

export default MusicPlayer;
