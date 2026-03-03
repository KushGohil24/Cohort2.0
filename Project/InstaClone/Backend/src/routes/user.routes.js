const express = require('express');
const userController = require('../controllers/user.controller');
const { identifyUser } = require('../middlewares/auth.middleware');
const userRouter = express.Router();

/**
 * @route POST /api/users/follow/:userid
 * @description Follow a user
 * @access Private
 */

userRouter.post("/follow/:username", identifyUser, userController.followUserController);

/**
 * @route POST /api/users/unfollow/:userid
 * @description Unfollow a user
 * @access Private
 */
userRouter.post("/unfollow/:username", identifyUser, userController.unfollowUserController);

/**
 * @route POST /api/users/accept-follow/:username
 * @description Accept a follow request
 * @access Private
 */
userRouter.post("/accept-follow/:username", identifyUser, userController.acceptFollowRequestController);

/**
 * @route POST /api/users/reject-follow/:username
 * @description Reject a follow request
 * @access Private
 */
userRouter.post("/reject-follow/:username", identifyUser, userController.rejectFollowRequestController);
module.exports = userRouter;