import React from 'react';
import './PlaylistPanel.scss';

const PlaylistPanel = ({ songs = [], currentSong, onPlaySong }) => {
    return (
        <aside className="aura-playlist-panel">
            <div className="playlist-header">
                <div>
                    <h3>Mood Playlist</h3>
                    <p>{songs.length} tracks tailored for your mood</p>
                </div>
                <div className="mood-badge">
                    Happy Mix
                </div>
            </div>

            <div className="playlist-tracks">
                {songs.map((song, i) => (
                    <div 
                        key={song._id || i} 
                        className={`track-item ${currentSong?._id === song._id ? 'active' : ''}`}
                        onClick={() => onPlaySong(song)}
                    >
                        <img src={song.posterUrl} alt={song.title} className="track-poster" />
                        <div className="track-info">
                            <h4 className="track-title">{song.title}</h4>
                            <p className="track-artist">Artist Name</p> {/* If available */}
                        </div>
                        <span className="track-duration">3:45</span>
                    </div>
                ))}
                {songs.length === 0 && (
                    <div className="empty-state">
                        <p>No songs found for this mood.</p>
                    </div>
                )}
            </div>

            <div className="playlist-footer">
                <button className="view-full-btn">VIEW FULL PLAYLIST</button>
            </div>
        </aside>
    );
};

export default PlaylistPanel;
