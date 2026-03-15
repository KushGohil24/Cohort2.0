import React, { useState } from 'react';
import { useAuth } from '../../auth/hooks/useAuth';
import './Sidebar.scss';

const MOODS = [
    { id: 'happy', icon: <i className="ri-emotion-happy-fill"></i>, label: 'Happy' },
    { id: 'sad', icon: <i className="ri-emotion-sad-fill"></i>, label: 'Sad' },
    { id: 'energetic', icon: <i className="ri-fire-fill"></i>, label: 'Energetic' },
    { id: 'relaxed', icon: <i className="ri-leaf-fill"></i>, label: 'Relaxed' },
];

const Sidebar = ({ currentMood, onMoodSelect, onRecalibrate, activeTab, onTabSelect }) => {
    
    const handleNavClick = (tab) => {
        onTabSelect(tab);
    };

    const { handleLogout } = useAuth();
    
    return (
        <aside className="aura-sidebar">
            <div className="sidebar-brand">
                <div className="brand-logo">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                        <path d="M13 3L4 14h7v7l9-11h-7z" />
                    </svg>
                </div>
                <h2>MOODIFY</h2>
            </div>

            <div className="sidebar-section">
                <h4 className="section-title">MANUAL SELECTION</h4>
                <ul className="mood-list">
                    {MOODS.map(mood => (
                        <li key={mood.id}>
                            <button
                                className={`mood-btn ${currentMood === mood.id ? 'active' : ''}`}
                                onClick={() => onMoodSelect(mood.id)}
                            >
                                <span className="mood-icon">{mood.icon}</span>
                                {mood.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="sidebar-section nav-section">
                <button 
                    className={`nav-btn ${activeTab === 'home' ? 'active' : ''}`}
                    onClick={() => handleNavClick('home')}
                >
                    <i className="ri-home-5-fill" style={{ fontSize: '20px' }}></i>
                    Home
                </button>
                <button 
                    className={`nav-btn ${activeTab === 'search' ? 'active' : ''}`}
                    onClick={() => handleNavClick('search')}
                >
                    <i className="ri-search-line" style={{ fontSize: '20px' }}></i>
                    Search
                </button>
                <button 
                    className={`nav-btn ${activeTab === 'liked' ? 'active' : ''}`}
                    onClick={() => handleNavClick('liked')}
                >
                    <i className="ri-heart-3-fill" style={{ fontSize: '20px' }}></i>
                    Liked Songs
                </button>
            </div>

            <div className="sidebar-footer">
                <div className="recalibrate-card">
                    <p>Done listening?</p>
                    <button onClick={handleLogout} className="recalibrate-btn">
                        LOGOUT
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
