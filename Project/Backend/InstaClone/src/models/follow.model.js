const mongoose = require('mongoose');

const followSchema = new mongoose.Schema({
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "Follower id is required to create a follow relationship"]
    },
    following: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "Following id is required to create a follow relationship"]
    }
}, {timestamps: true});

const followModel = mongoose.model("follows", followSchema);
module.exports = followModel;