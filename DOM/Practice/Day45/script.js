const button = document.body.querySelector("button");
var grow = 0;
var inner = document.body.querySelector(".inner");
var h2 = document.body.querySelector("h2");

button.addEventListener("click", function() {
    console.log("clicked");
    button.style.pointerEvents = "none";
    button.style.opacity = "0.7";
    button.innerText = "Downloading...";

    var num = 50 + Math.floor(Math.random() * 50);
    console.log(num);
    var downMessage = document.createElement("h3");
    downMessage.innerHTML = "Your file will be downloaded in <span>" + num/10 + "</span> seconds.";
    document.body.querySelector(".card").appendChild(downMessage);
    downMessage.style.marginTop = "20px";
    var int = setInterval(function() {
        grow++;
        inner.style.width = grow + "%";
        h2.innerText = grow + "%";
    }, num);
    setTimeout(function() {
        clearInterval(int);
        button.style.backgroundColor = "limegreen";
        button.innerText = "Downloaded";
        button.opacity = "0.7";
    }, num * 100);
});