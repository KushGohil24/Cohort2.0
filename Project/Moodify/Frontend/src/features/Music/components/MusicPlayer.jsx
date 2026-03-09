import React, { useRef, useState, useEffect } from 'react';
import styles from './MusicPlayer.module.scss';

const MusicPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);

  // A local or remote dummy audio URL for demonstration
  // Replace with actual music URL as needed
  const defaultAudioSrc = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 5, duration);
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 5, 0);
    }
  };

  const handleSpeedChange = (e) => {
    setPlaybackRate(parseFloat(e.target.value));
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const calculateProgress = () => {
    return duration ? (currentTime / duration) * 100 : 0;
  };

  return (
    <div className={styles.playerContainer}>
      <h2 className={styles.title}>Moodify Player</h2>
      <audio
        ref={audioRef}
        src={defaultAudioSrc}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      ></audio>

      <div className={styles.progressContainer}>
        <div className={styles.progressBar} style={{ width: `${calculateProgress()}%` }}></div>
      </div>
      
      <div className={styles.timeDisplay}>
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      <div className={styles.controls}>
        <button className={styles.controlBtn} onClick={skipBackward} title="Backward 5s">
          <svg viewBox="0 0 24 24" fill="currentColor" height="24" width="24">
            <path d="M12.5 3C17.15 3 21 6.85 21 11.5C21 16.15 17.15 20 12.5 20C7.85 20 4 16.15 4 11.5H2C2 17.3 6.7 22 12.5 22C18.3 22 23 17.3 23 11.5C23 5.7 18.3 1 12.5 1V3ZM6.82 11.5H10L5.5 16L1 11.5H4.18C4.18 6.94 7.94 3.18 12.5 3.18V5.18C9.04 5.18 6.82 8.04 6.82 11.5Z"/>
            <text x="12" y="16" fontSize="8" textAnchor="middle" fill="currentColor" fontWeight="bold">-5</text>
          </svg>
        </button>

        <button className={`${styles.controlBtn} ${styles.playBtn}`} onClick={togglePlayPause}>
          {isPlaying ? (
            <svg viewBox="0 0 24 24" fill="currentColor" height="32" width="32">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" height="32" width="32">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>

        <button className={styles.controlBtn} onClick={skipForward} title="Forward 5s">
          <svg viewBox="0 0 24 24" fill="currentColor" height="24" width="24">
            <path d="M11.5 3C6.85 3 3 6.85 3 11.5C3 16.15 6.85 20 11.5 20C16.15 20 20 16.15 20 11.5H22C22 17.3 17.3 22 11.5 22C5.7 22 1 17.3 1 11.5C1 5.7 5.7 1 11.5 1V3ZM17.18 11.5H14L18.5 16L23 11.5H19.82C19.82 6.94 16.06 3.18 11.5 3.18V5.18C14.96 5.18 17.18 8.04 17.18 11.5Z"/>
            <text x="12" y="16" fontSize="8" textAnchor="middle" fill="currentColor" fontWeight="bold">+5</text>
          </svg>
        </button>
      </div>

      <div className={styles.speedControl}>
        <label htmlFor="speed">Speed: </label>
        <select id="speed" value={playbackRate} onChange={handleSpeedChange} className={styles.speedSelect}>
          <option value="0.5">0.5x</option>
          <option value="0.75">0.75x</option>
          <option value="1">1x</option>
          <option value="1.25">1.25x</option>
          <option value="1.5">1.5x</option>
          <option value="2">2x</option>
        </select>
      </div>
    </div>
  );
};

export default MusicPlayer;
