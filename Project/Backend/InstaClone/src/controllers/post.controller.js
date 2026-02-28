const postModel = require("../models/post.model");

async function createPostController(req, res){
    console.log(req.body, req.file);
    res.json({
        message: "OK"
    })
}

module.exports = {
    createPostController
}