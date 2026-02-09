const mouseFollower = document.querySelector('.mouse-follower');

let x=0, y=0;
addEventListener("mousemove", (e)=>{
    const {clientX, clientY} = e;
    x=clientX;
    y=clientY;
})
function follow(){
    mouseFollower.style.transform = `translate(${x}px, ${y}px)`;
    mouseFollower.style.transition = "transform 0.1s ease-out";
    mouseFollower.style.transform += "translate(-50%, -50%)";
    requestAnimationFrame(follow);
}
follow();