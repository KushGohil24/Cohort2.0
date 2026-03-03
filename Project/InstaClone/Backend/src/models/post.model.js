const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        default: ""
    },
    imageUrl: {
        type: String,
        required: [true, "imgUrl is required for creating a post."]
    },
    user: {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "userId is required to create a post"]
    }
})

const postModel = mongoose.model("posts", postSchema);
module.exports = postModel;