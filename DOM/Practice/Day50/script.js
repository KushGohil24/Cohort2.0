const reels = [
  {
    username: "travel_with_arya",
    isFollowed: true,
    isLiked: true,
    likeCount: 12800,
    commentCount: 340,
    shareCount: 120,
    caption: "Sunset vibes hit different 🌅✨",
    video: "./reels/video1.mp4",
    userprofile: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"
  },
  {
    username: "foodie_journey",
    isFollowed: false,
    isLiked: false,
    likeCount: 8900,
    commentCount: 210,
    shareCount: 95,
    caption: "Street food exploration 🌮🔥",
    video: "./reels/video2.mp4",
    userprofile: "https://images.unsplash.com/photo-1527980965255-d3b416303d12"
  },
  {
    username: "fitness_guru_raj",
    isFollowed: true,
    isLiked: true,
    likeCount: 15700,
    commentCount: 420,
    shareCount: 160,
    caption: "Morning workout grind 💪✨",
    video: "./reels/video3.mp4",
    userprofile: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
  },
  {
    username: "code_with_me",
    isFollowed: false,
    isLiked: false,
    likeCount: 6400,
    commentCount: 180,
    shareCount: 70,
    caption: "JavaScript tricks you should know 💡💻",
    video: "./reels/video4.mp4",
    userprofile: "https://images.unsplash.com/photo-1511367461989-f85a21fda167"
  },
  {
    username: "urban_clicks",
    isFollowed: true,
    isLiked: true,
    likeCount: 11200,
    commentCount: 300,
    shareCount: 140,
    caption: "City lights and long nights 🌃✨",
    video: "./reels/video5.mp4",
    userprofile: "https://images.unsplash.com/photo-1544005313-94ddf0286df2"
  },
  {
    username: "nature_diary",
    isFollowed: false,
    isLiked: false,
    likeCount: 9800,
    commentCount: 260,
    shareCount: 90,
    caption: "Deep into the forest 🍃🌿",
    video: "./reels/video6.mp4",
    userprofile: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
  },
  {
    username: "music_by_kavi",
    isFollowed: true,
    isLiked: true,
    likeCount: 17500,
    commentCount: 510,
    shareCount: 220,
    caption: "New tune dropping soon 🎧🎶",
    video: "./reels/video7.mp4",
    userprofile: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df"
  },
  {
    username: "pet_world_cute",
    isFollowed: false,
    isLiked: false,
    likeCount: 20400,
    commentCount: 640,
    shareCount: 310,
    caption: "Puppy happiness overload 🐶💛",
    video: "./reels/video8.mp4",
    userprofile: "https://images.unsplash.com/photo-1508672019048-805c876b67e2"
  },
  {
    username: "fashion_life_sia",
    isFollowed: true,
    isLiked: true,
    likeCount: 14300,
    commentCount: 390,
    shareCount: 130,
    caption: "Today’s outfit inspiration 👗✨",
    video: "./reels/video9.mp4",
    userprofile: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7"
  },
  {
    username: "tech_world_xyz",
    isFollowed: false,
    isLiked: false,
    likeCount: 7200,
    commentCount: 175,
    shareCount: 80,
    caption: "Smart gadgets you must check out ⚙️📱",
    video: "./reels/video10.mp4",
    userprofile: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
  }
];

var sum = '';
reels.forEach(function(reel) {
    sum += `
        <div class="reel">
                    <video src="${reel.video}" autoplay muted loop></video>
                    <div class="bottom">
                        <div class="user">
                            <img src="${reel.userprofile}" alt="">
                            <h4>${reel.username}</h4>
                            <button class="${reel.isFollowed ? 'followed' : ''}">${reel.isFollowed ? 'Unfollow' : 'Follow'}</button>
                        </div>
                        <h3>${reel.caption}</h3>
                    </div>
                    <div class="right">
                        <div class="like">
                            <h4 class="like-icon icon">${reel.isLiked ? '<i class="ri-heart-3-fill love"></i>' : '<i class="ri-heart-3-line"></i>'}</h4>
                            <h6>${reel.likeCount}</h6>
                        </div>
                        <div class="comment">
                            <h4 class="comment-icon icon"><i class="ri-chat-3-line"></i></h4>
                            <h6>${reel.commentCount}</h6>
                        </div>
                        <div class="share">
                            <h4 class="share-icon icon"><i class="ri-share-forward-line"></i></h4>
                            <h6>${reel.shareCount}</h6>
                        </div>
                        <div class="menu">
                            <h4 class="menu-icon icon"><i class="ri-more-2-fill"></i></h4>
                        </div>
                    </div>
                </div>
    `
});
var allReels = document.querySelector('.all-reels');
allReels.innerHTML = sum