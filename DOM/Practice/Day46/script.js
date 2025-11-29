var img = document.body.querySelector("img");
var love = document.body.querySelector("#love");

img.addEventListener("dblclick", function () {
    console.log("Image double clicked");
    love.style.opacity = 1;
    love.style.transform = "translate(-50%, -50%) scale(1) rotate(0deg)";

    setTimeout(function () {
        love.style.transform = "translate(-50%, -300%) scale(1) rotate(-45deg)";
    }, 800);
    setTimeout(function () {
        love.style.opacity = 0;
    }, 1000);
    setTimeout(function () {
        love.style.transform = "translate(-50%, -50%) scale(0) rotate(60deg)";
    }, 1200);
});