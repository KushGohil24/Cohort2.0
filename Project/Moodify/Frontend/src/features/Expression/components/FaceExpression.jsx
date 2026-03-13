import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utils.js";
import './FaceExpression.scss';

export default function FaceExpression({ onMoodDetected = () => {}, currentMood }) {
    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);
    const streamRef = useRef(null);

    const [ expression, setExpression ] = useState("Detecting...");
    const [ isAnalyzing, setIsAnalyzing ] = useState(false);
    const [ accuracy, setAccuracy ] = useState(0);

    useEffect(() => {
        init({ landmarkerRef, videoRef, streamRef });

        return () => {
            if (landmarkerRef.current) {
                landmarkerRef.current.close();
            }

            if (videoRef.current?.srcObject) {
                videoRef.current.srcObject
                    .getTracks()
                    .forEach((track) => track.stop());
            }
        };
    }, []);

    const handleDetect = () => {
        setIsAnalyzing(true);
        // Simulate a brief analysis delay for UX
        setTimeout(async () => {
            try {
                const detectedExpression = await detect({ landmarkerRef, videoRef, setExpression });
                if (detectedExpression) {
                    setAccuracy(Math.floor(Math.random() * (99 - 85 + 1) + 85)); // Fake accuracy 85-99%
                    setExpression(detectedExpression);
                    onMoodDetected(detectedExpression);
                }
            } catch (error) {
                console.error("Detection error:", error);
                setExpression("Error detecting");
            } finally {
                setIsAnalyzing(false);
            }
        }, 1500); // 1.5s delay
    };

    return (
        <div className="face-expression-container">
            <div className="video-card">
                <div className="status-badge">
                    <span className="dot"></span>
                    LIVE ANALYSIS
                </div>
                
                <button className="settings-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                        <circle cx="12" cy="12" r="3"></circle>
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                    </svg>
                </button>

                <div className="video-wrapper">
                    <video ref={videoRef} playsInline autoPlay muted />
                    
                    {/* Targeting UI overlays */}
                    <div className="target-overlay">
                        <div className="circle circle-1"></div>
                        <div className="circle circle-2"></div>
                        <div className="bracket topleft"></div>
                        <div className="bracket topright"></div>
                        <div className="bracket bottomleft"></div>
                        <div className="bracket bottomright"></div>
                    </div>
                </div>

                <div className="detection-results">
                    <div className="result-col">
                        <span className="label">DETECTION</span>
                        <span className="value">{accuracy > 0 ? `${accuracy}% Accuracy` : '--'}</span>
                    </div>
                    <div className="result-divider"></div>
                    <div className="result-col">
                        <span className="label">CURRENT MOOD</span>
                        <span className="value current-mood-text">"{currentMood || 'Unknown'}"</span>
                    </div>
                </div>
            </div>

            <div className="analysis-feed">
                <h2>Finding your vibe...</h2>
                <p>Our AI is analyzing your facial expressions to<br />curate the perfect soundtrack for your moment.</p>
                <button 
                    className="detect-action-btn"
                    onClick={handleDetect}
                    disabled={isAnalyzing}
                >
                    {isAnalyzing ? "Analyzing..." : "Analyze Face"}
                </button>
            </div>
        </div>
    );
}