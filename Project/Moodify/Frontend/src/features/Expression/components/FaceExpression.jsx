import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utils.js";


export default function FaceExpression({ onClick = () => { } }) {
    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);
    const streamRef = useRef(null);

    const [ expression, setExpression ] = useState("Detecting...");

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

    async function handleClick() {
        const expression = detect({ landmarkerRef, videoRef, setExpression })
        console.log(expression)
        onClick(expression)
    }


    return (
        <div className="face-expression-container">
            <video
                ref={videoRef}
                playsInline
            />
            <h2>{expression}</h2>
            <button
                onClick={handleClick}
                className="button"
            >
                Detect expression
            </button>
        </div>
    );
}