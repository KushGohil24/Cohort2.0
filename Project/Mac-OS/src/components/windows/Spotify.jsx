import React from "react";
import MacWindow from "./MacWindow";
import "./spotify.scss"

const Spotify = () => {
    return (
        <MacWindow width="40vw">
            <div className="spotify-window">
                <iframe data-testid="embed-iframe" style={{borderRadius:"12px"}} src="https://open.spotify.com/embed/playlist/37i9dQZEVXbMWDif5SCBJq?utm_source=generator&theme=0&si=1ef9f0f30bca4629" width="100%" height="352" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
            </div>
        </MacWindow>
    )
}
export default Spotify