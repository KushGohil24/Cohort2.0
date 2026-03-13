import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/songs",
    withCredentials: true
})

export async function getSong({mood}){
    const response = await api.get("?mood="+mood);
    return response.data;
}

export async function searchSongs(q) {
    const response = await api.get(`/search?q=${encodeURIComponent(q)}`);
    return response.data;
}

export async function toggleLike(songId) {
    const response = await api.post(`/${songId}/like`);
    return response.data;
}

export async function getLikedSongs() {
    const response = await api.get('/liked');
    return response.data;
}