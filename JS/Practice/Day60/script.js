//1
// function afterDelay(time, cb){
//     setTimeout(function(){
//         cb();
//     }, time)
// }
// afterDelay(2000, function(){
//     console.log("callback executed.");
// })

//2
// function getUser(username, cb){
//     console.log("getting user details...")
//     setTimeout(function(){
//         cb({userId: 1, userName: username});
//     }, 1000)
// }
// function getUserPosts(userId, cb){
//     console.log("getting user posts for userId : "+userId);
//     setTimeout(function(){
//         cb(["xyz", "abc"]);
//     }, 1000)
// }
// getUser("kush24", function(userObj){
//     getUserPosts(userObj.userId, function(posts){
//         console.log(`Posts got for ${userObj.userName} : ${posts}`);
//     });
// })

//3
function loginUser(cb){
    console.log("User login...");
    setTimeout(()=>{
        cb({id: 1, username: "kush24"});
    }, 1000);
}
function fetchPermissions(userId, cb){
    console.log("fetching permissions...");
    setTimeout(()=>{
        cb(["read", "write", "update", "delete"]);
    }, 1000);
}
function loadDashboard(permissions, cb){
    console.log("Loading dashboard...");
    setTimeout(()=>{
        cb();
    }, 1000);
}
loginUser(function(data){
    fetchPermissions(data.id, function(permissions){
        loadDashboard(permissions, function(){
            console.log("Dashboard Loaded.");
        })
    })
})
