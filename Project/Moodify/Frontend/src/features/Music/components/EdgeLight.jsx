import React, { useEffect, useRef } from 'react';
import './EdgeLight.scss';

const EdgeLight = ({ isEnabled, audioRef }) => {
    const canvasRef = useRef(null);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const sourceRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        if (!isEnabled || !audioRef?.current) {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            return;
        }

        const setupAudioContext = () => {
            if (!audioContextRef.current) {
                // To support older browsers, use webkitAudioContext if AudioContext is not available
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                audioContextRef.current = new AudioContext();
            }

            const ctx = audioContextRef.current;
            if (ctx.state === 'suspended') {
                ctx.resume();
            }

            if (!analyserRef.current) {
                analyserRef.current = ctx.createAnalyser();
                analyserRef.current.fftSize = 128; // 64 frequency bins for a smooth rolling curve
                analyserRef.current.smoothingTimeConstant = 0.85; // smooth transitions
            }

            if (!sourceRef.current) {
                try {
                    sourceRef.current = ctx.createMediaElementSource(audioRef.current);
                    sourceRef.current.connect(analyserRef.current);
                    analyserRef.current.connect(ctx.destination);
                } catch (e) {
                    console.error("Audio Context Connection Error:", e);
                }
            }
        };

        const drawEdgeGradient = () => {
            if (!canvasRef.current || !analyserRef.current) return;
            
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const bufferLength = analyserRef.current.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            const draw = () => {
                animationRef.current = requestAnimationFrame(draw);
                
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                if (!audioRef.current || audioRef.current.paused) {
                    return;
                }

                // Use FrequencyData for calculating total volume average
                analyserRef.current.getByteFrequencyData(dataArray);

                // Calculate average volume for pulse
                let sum = 0;
                for (let i = 0; i < bufferLength; i++) {
                    sum += dataArray[i];
                }
                const average = sum / bufferLength;
                
                // Max radius based on volume (from 0 to 1)
                const volumeScale = average / 255;
                const edgeThickness = 10 + (volumeScale * 40); // Between 10px and 50px
                const opacity = 0.2 + (volumeScale * 0.6); // Between 0.2 and 0.8

                // Draw 4 borders with gradient glow
                const w = canvas.width;
                const h = canvas.height;
                const color = `rgba(109, 40, 217, ${opacity})`;

                // Top
                let gradTop = ctx.createLinearGradient(0, 0, 0, edgeThickness);
                gradTop.addColorStop(0, color);
                gradTop.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = gradTop;
                ctx.fillRect(0, 0, w, edgeThickness);

                // Bottom
                let gradBottom = ctx.createLinearGradient(0, h, 0, h - edgeThickness);
                gradBottom.addColorStop(0, color);
                gradBottom.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = gradBottom;
                ctx.fillRect(0, h - edgeThickness, w, edgeThickness);

                // Left
                let gradLeft = ctx.createLinearGradient(0, 0, edgeThickness, 0);
                gradLeft.addColorStop(0, color);
                gradLeft.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = gradLeft;
                ctx.fillRect(0, 0, edgeThickness, h);

                // Right
                let gradRight = ctx.createLinearGradient(w, 0, w - edgeThickness, 0);
                gradRight.addColorStop(0, color);
                gradRight.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = gradRight;
                ctx.fillRect(w - edgeThickness, 0, edgeThickness, h);

            };

            draw();
        };

        // Needs to be hooked to a user interaction to start AudioContext (browser policy)
        audioRef.current.addEventListener('play', setupAudioContext);
        
        // If already playing, setup immediately
        if (!audioRef.current.paused) {
            setupAudioContext();
            drawEdgeGradient();
        } else {
            // We can still start the draw loop, it will just draw nothing until playing
            drawEdgeGradient();
        }

        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            if (audioRef.current) {
               audioRef.current.removeEventListener('play', setupAudioContext);
            }
        };
    }, [isEnabled, audioRef]);

    if (!isEnabled) return null;

    return <canvas ref={canvasRef} className="edge-light-canvas" />;
};

export default EdgeLight;
