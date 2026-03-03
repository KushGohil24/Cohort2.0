const postModel = require("../models/post.model");
const {ImageKit, toFile } = require('@imagekit/nodejs/index.js');
const jwt = require("jsonwebtoken");
const likeModel = require("../models/like.model");

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})
async function createPostController(req, res){
    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "hello",
        folder: "cohort-2-instaClone-posts"
    });
    
    const post = await postModel.create({
        caption: req.body.caption,
        imageUrl: file.url,
        user: res.user.id
    })
    res.status(201).json({
        message: "Post created successfully",
        post
    });
}
async function getAllPostController(req, res){
    const userId = req.user.id;
    const allPosts = await postModel.find({
        user: userId
    });
    res.status(200).json({
        message: "Posts fetched successfully.",
        allPosts
    })
}
async function getPostDetails(req, res){
    const postId = req.params.postId;
    const userId = req.user.id;
    const post = await postModel.findById(postId);

    if(!post){
        return res.status(404).json({
            message: "Post not found."
        })
    }
    const isValidUser = post.user.toString() === userId;
    if(!isValidUser){
        return res.status(403).json({
            message: "Forbidden Content"
        })
    }
    return res.status(200).json({
        message: "Post details fetched successfully",
        post
    })
}
async function likePostController(req, res){
    const username = req.user.username;
    const postId = req.params.postId;
    const post = await postModel.findById(postId);
    if(!post){
        return res.status(404).json({
            message: "Post not found."
        })
    }
    const isAlreadyLiked = await likeModel.findOne({
        post: postId,
        user: username
    })
    if(isAlreadyLiked){
        return res.status(400).json({
            message: "You have already liked this post"
        })
    }
    const like = await likeModel.create({
        post: postId,
        user: username
    })
    res.status(201).json({
        message: "Post liked successfully",
        like
    })
}
module.exports = {
    createPostController,
    getAllPostController,
    getPostDetails,
    likePostController
}