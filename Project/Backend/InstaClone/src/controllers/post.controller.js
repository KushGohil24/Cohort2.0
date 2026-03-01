const postModel = require("../models/post.model");
const {ImageKit, toFile } = require('@imagekit/nodejs');
const jwt = require("jsonwebtoken");

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})
async function createPostController(req, res){
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message: "Token not provided, Unauthorized access"
        })
    }
    let decoded = null;
    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    }catch(err){
        return res.status(401).json({
            message: "user not authorized"
        })
    }
    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "hello",
        folder: "cohort-2-instaClone-posts"
    });
    
    const post = await postModel.create({
        caption: req.body.caption,
        imageUrl: file.url,
        user: decoded.id
    })
    res.status(201).json({
        message: "Post created successfully",
        post
    });
}

module.exports = {
    createPostController
}