let keys = document.querySelectorAll(".key");

for (let i = 0; i < keys.length; i++) {
  keys[i].addEventListener("click", function () {
    let audio = new Audio(`notes/note1.mp3`);
    audio.play();
  });
}
document.body.addEventListener("keydown", function (event) {
  if (event.key === "a") {
    let audio = new Audio(`notes/note1.mp3`);
    audio.play();
  } else if (event.key === "s") {
    let audio = new Audio(`notes/note2.mp3`);
    audio.play();
  } else if (event.key === "d") {
    let audio = new Audio(`notes/note3.mp3`);
    audio.play();
  } else if (event.key === "f") {
    let audio = new Audio(`notes/note4.mp3`);
    audio.play();
  } else if (event.key === "g") {
    let audio = new Audio(`notes/note5.mp3`);
    audio.play();
  } else if (event.key === "h") {
    let audio = new Audio(`notes/note6.mp3`);
    audio.play();
  } else if (event.key === "j") {
    let audio = new Audio(`notes/note7.mp3`);
    audio.play();
  } else if (event.key === "k") {
    let audio = new Audio(`notes/note8.mp3`);
    audio.play();
  }
});