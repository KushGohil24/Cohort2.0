const para = document.querySelector('p');
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const text = para.innerText;
let iteration = 0;

para.addEventListener('mouseenter', ()=>{
    let effect = setInterval(()=>{
        const str = text.split('').map((char, index)=>{
            if(index<iteration){
                return char;
            }
            return characters[Math.floor(Math.random() * characters.length)];
        }).join('');
        para.innerText = str;
        iteration += 0.4;
    }, 30)
    setTimeout(()=>{
        clearInterval(effect);
        para.innerText = text;
        iteration = 0;
    }, 3000);
})