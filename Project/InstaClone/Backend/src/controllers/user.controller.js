const followModel = require('../models/follow.model');
const userModel = require('../models/user.model');

async function followUserController(req, res){
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;
    
    if(followerUsername === followeeUsername){
        return res.status(400).json({
            message: "You cannot follow yourself"
        })
    }
    const isFolloweeExists = await userModel.findOne({
        username: followeeUsername
    })
    if (!isFolloweeExists) {
        return res.status(404).json({
            message: "User you are trying to follow does not exist"
        })
    }
    const isAlreadyFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })
    if(isAlreadyFollowing){
        return res.status(200).json({
            message: `You are already following ${followeeUsername}`,
            follow: isAlreadyFollowing
        })
    }
    const followRecord = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername,
        status: "pending"
    })
    res.status(201).json({
        message: `Follow request sent to ${followeeUsername}`,
        follow: followRecord
    })
}

async function unfollowUserController(req, res){
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;

    if(followerUsername === followeeUsername){
        return res.status(400).json({
            message: "You cannot unfollow yourself"
        })
    }
    const isFolloweeExists = await userModel.findOne({
        username: followeeUsername
    })
    if (!isFolloweeExists) {
        return res.status(404).json({
            message: "User you are trying to unfollow does not exist"
        })
    }
    const isUserFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })
    if(!isUserFollowing){
        return res.status(400).json({
            message: `You are not following ${followeeUsername}`
        })
    }
    const unfollow = await followModel.findOneAndDelete({
        follower: followerUsername,
        followee: followeeUsername
    })
    res.status(200).json({
        message: `You have unfollowed ${followeeUsername}`,
        unfollow
    })
}

async function acceptFollowRequestController(req, res){
    const followerUsername = req.user.username;
    const  followeeUsername = req.params.username;
    const followRecord = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername,
        status: "pending"
    })
    if(!followRecord){
        return res.status(404).json({
            message: "Follow request not found"
        })
    }
    const updatedFollowRecord = await followModel.findByIdAndUpdate(followRecord._id, {
        status: "accepted"
    }, { new: true })
    res.status(200).json({
        message: "Follow request accepted",
        updatedFollowRecord
    })
}

async function rejectFollowRequestController(req, res){
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;
    const followRecord = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername,
        status: "pending"
    })
    if(!followRecord){
        return res.status(404).json({
            message: "Follow request not found"
        })
    }
    const updatedFollowRecord = await followModel.findByIdAndUpdate(followRecord._id, {
        status: "rejected"
    }, { new: true })
    res.status(200).json({
        message: "Follow request rejected",
        updatedFollowRecord
    })
}

module.exports = {
    followUserController,
    unfollowUserController,
    acceptFollowRequestController,
    rejectFollowRequestController
}