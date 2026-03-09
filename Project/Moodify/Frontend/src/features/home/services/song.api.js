import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/songs",
    withCredentials: true
})

export async function getSong({mood}){
    const response = await api.get("?mood="+mood);
    return response.data;
}