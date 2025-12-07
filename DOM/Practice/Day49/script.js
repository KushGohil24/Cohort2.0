var allBtn = document.querySelectorAll("button");

allBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (btn.innerText === "Follow") {
            btn.innerText = "Unfollow";
            btn.style.backgroundColor = "red";
        } else {
            btn.innerText = "Follow";
            btn.style.backgroundColor = "#00adb5";
        }
    });
});