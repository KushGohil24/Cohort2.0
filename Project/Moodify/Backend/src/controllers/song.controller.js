const songModel = require("../models/song.model");
const userModel = require("../models/user.model");
const id3 = require("node-id3")
const storageService = require("../services/storage.services")

async function uploadSong(req, res) {
    const songBuffer = req.file.buffer
    const {mood} = req.body;

    const tags = id3.read(songBuffer);

    const [songFile, posterFile] = await Promise.all([
        storageService.uploadFile({
            buffer: songBuffer,
            filename: tags.title,
            folder: "/cohort-2/moodify/songs"
        }),
        storageService.uploadFile({
            buffer: tags.image.imageBuffer,
            filename: tags.title + ".jpeg",
            folder: "/cohort-2/moodify/posters"
        })
    ])

    const song = await songModel.create({
        title: tags.title,
        url: songFile.url,
        posterUrl: posterFile.url,
        mood
    })

    res.status(201).json({
        message: "song uploaded successfully",
        song
    })
}

async function getSong(req, res){
    const {mood} = req.query;
    const songs = await songModel.find({ 
        mood
    })
    res.status(200).json({
        message: "songs fetched successfully",
        songs
    })
}

async function searchSongs(req, res) {
    const { q } = req.query;
    if (!q) {
        return res.status(200).json({ songs: [] });
    }
    const songs = await songModel.find({
        title: { $regex: q, $options: "i" }
    });
    res.status(200).json({
        message: "Songs found",
        songs
    });
}

async function toggleLike(req, res) {
    const songId = req.params.id;
    const userId = req.user.id;

    const user = await userModel.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const isLiked = user.likedSongs.includes(songId);
    if (isLiked) {
        user.likedSongs = user.likedSongs.filter(id => id.toString() !== songId);
    } else {
        user.likedSongs.push(songId);
    }
    
    await user.save();

    res.status(200).json({
        message: isLiked ? "Song unliked" : "Song liked",
        likedSongs: user.likedSongs
    });
}

async function getLikedSongs(req, res) {
    const userId = req.user.id;
    const user = await userModel.findById(userId).populate('likedSongs');
    
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
        message: "Liked songs fetched",
        songs: user.likedSongs
    });
}

module.exports = {
    uploadSong,
    getSong,
    searchSongs,
    toggleLike,
    getLikedSongs
}