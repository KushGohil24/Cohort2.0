const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload.middleware");
const songController = require("../controllers/song.controller");
const { authUser } = require("../middlewares/auth.middleware");

router.post("/", upload.single("song"), songController.uploadSong)

router.get("/", songController.getSong);

router.get("/search", songController.searchSongs);
router.post("/:id/like", authUser, songController.toggleLike);
router.get("/liked", authUser, songController.getLikedSongs);

module.exports = router;