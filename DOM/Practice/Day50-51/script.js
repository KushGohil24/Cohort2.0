const reels = [
  {
    username: "ezExplains",
    isFollowed: true,
    isLiked: true,
    isMuted: true,
    likeCount: 12800,
    commentCount: 340,
    shareCount: 120,
    caption: "BytePe 🆚 Flipkart 🆚 Apple - Best place to buy iPhone 🔥",
    video: "./reels/video1.mp4",
    userprofile: "https://yt3.googleusercontent.com/RGCRMIe2NYhB3tzWDlqMZ4yDoOIjX6fJGtI3QKrSuMAi9lt7B_eT4AfSew8P2ZayFFIKWXH11g=s160-c-k-c0x00ffffff-no-rj"
  },
  {
    username: "foodie_journey",
    isFollowed: false,
    isLiked: false,
    isMuted: true,
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
    isMuted: true,
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
    isMuted: true,
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
    isMuted: true,
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
    isMuted: true,
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
    isMuted: true,
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
    isMuted: true,
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
    isMuted: true,
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
    isMuted: true,
    likeCount: 7200,
    commentCount: 175,
    shareCount: 80,
    caption: "Smart gadgets you must check out ⚙️📱",
    video: "./reels/video10.mp4",
    userprofile: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
  }
];

var allReels = document.querySelector('.all-reels');

function addData(){
    var sum = '';
    reels.forEach(function(reel, idx) {
        sum += `
            <div class="reel">

                <div class="mute-btn" data-index="${idx}">
                    <i class="${reel.isMuted ? 'ri-volume-mute-fill' : 'ri-volume-up-fill'}" data-index="${idx}"></i>
                </div>

                <video data-index="${idx}" src="${reel.video}" autoplay ${reel.isMuted ? "muted" : ""} loop></video>

                <div class="bottom">
                    <div class="user">
                        <img src="${reel.userprofile}" alt="">
                        <h4>${reel.username}</h4>
                        <button id=${idx} class="${reel.isFollowed ? 'followed' : 'follow'}">
                            ${reel.isFollowed ? 'Unfollow' : 'Follow'}
                        </button>
                    </div>
                    <h3>${reel.caption}</h3>
                </div>

                <div class="right">
                    <div id=${idx} class="like">
                        <h4 class="like-icon icon">
                            ${reel.isLiked ? '<i class="ri-heart-3-fill love"></i>' : '<i class="ri-heart-3-line"></i>'}
                        </h4>
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
        `;
    });
    allReels.innerHTML = sum;
}
addData();
allReels.addEventListener('click', function(e){
    console.log(e.target);
    if(e.target.tagName === "VIDEO"){
        if(e.target.paused) e.target.play();
        else e.target.pause();
    }

    else if (e.target.classList.contains("mute-btn") || 
         e.target.tagName === "I") {

    let btn = e.target.classList.contains("mute-btn")
        ? e.target
        : e.target.parentElement;

    let idx = btn.getAttribute("data-index");
    let video = document.querySelector(`video[data-index="${idx}"]`);

    reels[idx].isMuted = !reels[idx].isMuted;
    video.muted = reels[idx].isMuted;

    let icon = btn.querySelector("i");

    icon.className = reels[idx].isMuted
        ? "ri-volume-mute-fill"
        : "ri-volume-up-fill";
}

    else if(e.target.className === "like"){
        reels[e.target.id].isLiked = !reels[e.target.id].isLiked;

        reels[e.target.id].likeCount += reels[e.target.id].isLiked ? 1 : -1;

        addData();
    }

    else if(e.target.className === 'follow' || e.target.className === 'followed'){
        reels[e.target.id].isFollowed = !reels[e.target.id].isFollowed;
        addData();
    }

});