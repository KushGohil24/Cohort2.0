let main = document.body.querySelector("main");
let button = document.body.querySelector("button");
let newsHeadlines = ['Market Hits All-Time High', 'Local Team Wins Championship', 'Heavy Rain Expected Tomorrow', 'New Smartphone Released Today', 'How to Stay Fit During Winter', 'https://media.istockphoto.com/id/2211404017/photo/close-up-the-hand-of-a-businessman-who-is-stopping-or-preventing-a-falling-block.webp?a=1&b=1&s=612x612&w=0&k=20&c=Ri6uVizt6SLVha-Wgxlmkevj094Vg5O3y3W2fAXui20=', 'https://images.unsplash.com/photo-1567367975896-5a54e8542ddb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c21hcnRwaG9uZXxlbnwwfHwwfHx8MA%3D%3D', 'https://plus.unsplash.com/premium_photo-1719318343040-3b1b6373fbd6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjV8fHNwb3J0c3xlbnwwfHwwfHx8MA%3D%3D'];
button.addEventListener("click", function() {
    console.log("Button Clicked");
    let randomIndex = Math.floor(Math.random() * newsHeadlines.length);
    let newItem;
    if(newsHeadlines[randomIndex].includes("http")){
        newItem = document.createElement("img");
        newItem.src = newsHeadlines[randomIndex];
    }else{
        newItem = document.createElement("h1");
    }
    
    let leftPosition = Math.floor(Math.random()*100);
    let topPosition = Math.floor(Math.random()*100);
    let scale = Math.random() * 1.5;
    if(newItem.tagName === "IMG"){
        newItem.style.maxWidth = "300px";
    }else{
        let randomDegree = Math.floor(Math.random() * 360);
        newItem.style.transform = `rotate(${randomDegree}deg)`;
    }
    newItem.style.position = "absolute";
    newItem.style.left = `${leftPosition}%`;
    newItem.style.top = `${topPosition}%`;
    newItem.style.transform += ` scale(${scale})`;
    console.log(newItem)
    newItem.textContent = newsHeadlines[randomIndex];
    main.appendChild(newItem);
})