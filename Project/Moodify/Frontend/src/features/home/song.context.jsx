import { useState } from "react";

const { createContext } = require("react");

export const SongContext = createContext()

export const songContextProvider = ({children}) => {
    const [song, setSong] = useState({
        "url": "https://ik.imagekit.io/9fnunjs8l/cohort-2/moodify/songs/Jatt_Mehkma__RiskyjaTT.CoM__UjOoxcGfR",
        "posterUrl": "https://ik.imagekit.io/9fnunjs8l/cohort-2/moodify/posters/Jatt_Mehkma__RiskyjaTT.CoM__Tbk8_3tCk.jpeg",
        "title": "Jatt Mehkma (RiskyjaTT.CoM)",
        "mood": "happy",
    })
    const [loading, setLoading] = useState(false)

    return (
        <SongContext.Provider 
            value={{ loading, setLoading, song, setSong }}
        >
        {children}
        </SongContext.Provider>
    )
}