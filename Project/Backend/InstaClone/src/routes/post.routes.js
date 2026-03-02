const express = require("express");
const postController = require("../controllers/post.controller");
const postRouter = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
postRouter.post(
    "/",
    upload.single("hello"),
    postController.createPostController,
);
postRouter.get("/", postController.getAllPostController);
// return all detail about specific post with the id. also check whether the post belongs to user that the request come from
postRouter.get("/details/:postId", postController.getPostDetails)
module.exports = postRouter;
