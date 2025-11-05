//Level 2
// 11
// const correctPassword = "kush";
// let userPassword = prompt("Enter your password:");
// let count = 1;
// while(userPassword !== correctPassword && count < 3){
//     userPassword = prompt("Incorrect password. Please try again:");
//     count++;
// }
// if(userPassword === correctPassword){
//     console.log("Access granted.");
// } else {
//     console.log("Account Blocked.");
// }

// 12
// let word = prompt("Type word : ");
// let count = 0;
// while(word !== "stop"){
//     if(word === "yes") count++;
//     word = prompt("Type word : ");
// }
// console.log(`Total ${count} times yes typed.`);

// 13
// for(let i=1;i<51;i++){
//     if(i%7 === 0){
//         console.log(i);
//     }
// }

//14
// let sum = 0;
// for(let i=1;i<31;i++){
//     if(i%2 !== 0){
//         sum += i;
//     }
// }
// console.log(`Sum of odd numbers is : ${sum}`);

//15
// let num = +prompt("Enter a number ");
// while(num%2 !== 0){
//     num = +prompt("Enter a number ");
// }

//16
// let startNum = +prompt("Enter starting num : ");
// let endNum = +prompt("Enter ending num : ");
// for(let i=startNum;i<(endNum+1);i++){
//     console.log(i);
// }

//17
// let count = 0;
// for(let i=1;i<21;i++){
//     if(count === 3) break;
//     if(i%2 !== 0){
//         console.log(i);
//         count++;
//     }
// }

//18
// let num = prompt("Enter a number : ");
// let loopCount = 1;
// let posCount = 0;
// while(loopCount<5){
//     if(num >= 0) posCount++;
//     num = prompt("Enter a number : ");
//     loopCount++;
// }
// if(num >= 0) posCount++;
// console.log(`Positive number count : ${posCount}`)

//19
let balance = 1000;
let wAmount = prompt("Enter withdrawal amount : ");
let count = 1;
while(count<3){
    if(wAmount<=balance){
        balance -= wAmount;
    }else{
        console.log("Insufficient balance");
        break;
    }
    wAmount = prompt("Enter withdrawal amount : ");
    count++;
}
if(wAmount<=balance){
        balance -= wAmount;
}else{
    console.log("Insufficient balance")
}