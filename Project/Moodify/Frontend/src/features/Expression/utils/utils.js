import {
    FaceLandmarker,
    FilesetResolver
} from "@mediapipe/tasks-vision";


export const init = async ({ landmarkerRef, videoRef, streamRef }) => {
    const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );

    landmarkerRef.current = await FaceLandmarker.createFromOptions(
        vision,
        {
            baseOptions: {
                modelAssetPath:
                    "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task"
            },
            outputFaceBlendshapes: true,
            runningMode: "VIDEO",
            numFaces: 1
        }
    );

    streamRef.current = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = streamRef.current;
    await videoRef.current.play();
};

export const detect = ({ landmarkerRef, videoRef, setExpression }) => {
    if (!landmarkerRef.current || !videoRef.current) return;

    const results = landmarkerRef.current.detectForVideo(
        videoRef.current,
        performance.now()
    );

    if (results.faceBlendshapes?.length > 0) {
        const blendshapes = results.faceBlendshapes[ 0 ].categories;

        const getScore = (name) =>
            blendshapes.find((b) => b.categoryName === name)?.score || 0;

        const smileLeft = getScore("mouthSmileLeft");
        const smileRight = getScore("mouthSmileRight");
        const jawOpen = getScore("jawOpen");
        const browUp = getScore("browInnerUp");
        const frownLeft = getScore("mouthFrownLeft");
        const frownRight = getScore("mouthFrownRight");

        let currentExpression = "relaxed"; // Default to calm/relaxed

        // Average the smile and frown scores to account for asymmetry
        const avgSmile = (smileLeft + smileRight) / 2;
        const avgFrown = (frownLeft + frownRight) / 2;

        if (avgSmile > 0.6 || (avgSmile > 0.3 && jawOpen > 0.15)) {
            currentExpression = "energetic"; // Very big smile or moderate smile with open mouth
        } else if (avgSmile > 0.15) {
            currentExpression = "happy"; // Even a slight smile
        } else if (jawOpen > 0.1 && browUp > 0.1) {
            currentExpression = "energetic"; // "Surprised/Pumped" look
        } else if (avgFrown > 0.015 || (frownLeft > 0.01 || frownRight > 0.01)) {
            currentExpression = "sad"; // Slight frown, easily triggered
        } else {
            currentExpression = "relaxed"; // Neutral face -> Relaxed
        }

        setExpression(currentExpression);

        return currentExpression;
    }
};