// # Day 63 — Project Scenarios

// API example (OpenWeatherMap):

// `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`

// ---

// ## Scenario 1 — Weather Dashboard with Error Handling

// Build a small weather dashboard that fetches current weather data from a public weather API (e.g., OpenWeatherMap).

// ### Requirements

// - Make the API request asynchronously using `fetch` with `async/await`.
// - Handle API request failures (for example, invalid city name) using `try/catch`.
// - Create and throw custom errors based on weather conditions (e.g., extremely high or low temperature) and handle them appropriately.

// ### Suggested tasks

// - Build a simple UI to input a city name and display the result.
// - Show user-friendly error messages for network errors, invalid input, or API errors.
// - Demonstrate at least one custom thrown error (e.g., `ExtremeTemperatureError`) and handle it in the UI.

// ---
const apikey = WEATHER_API_KEY;
async function getWeather(city){
    try {
        let rawData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`);
        if(!rawData.ok){
            throw new Error("Invalid city name or something went wrong!");
        }
        let realData = await rawData.json();
        if(realData.main.temp<0){
            console.warn(`It's too cold out there : ${realData.main.temp}`);
        }else if(realData.main.temp>30){
            console.warn(`It's too hot out there : ${realData.main.temp}`);
        }else{
            console.log(`Temperature : ${realData.main.temp}`)
        }
    } catch (err) {
        console.error(err.message);
    }
    
}
getWeather("Goa");

//------------
// ## Scenario 2 — Bulk Email Sending Simulation with Parallel Promises and Error Handling

// Simulate sending bulk emails to 5 users. Treat each email-sending operation as a `Promise` (simulate delays with `setTimeout`).

// ### Requirements

// - Send all emails in parallel using `Promise.all`.
// - If any email fails (e.g., due to a simulated random failure), catch the error and clearly indicate which specific email failed.
// - Use a `finally` block to display a message indicating that the "Email process is complete." (regardless of success/failure).

// ### Suggested tasks

// - Create an array of 5 mock email tasks that resolve or reject based on a random condition.
// - Call `Promise.all` and handle success and failure cases. Show a breakdown of which emails succeeded and which failed.
// - Ensure the `finally` block runs to update the UI or console indicating completion.

// ---

// Optional: combine both scenarios into a small dashboard that fetches weather and then attempts to send a report-email, demonstrating error handling across both network and simulated async operations.
// const users = ["test@gmail.com", "example@gmail.com", "test1@gmail.com", "example1@gmail.com", "example2@gmail.com"];

// function sendEmail(email){
//     return new Promise((resolve, reject) =>{
//         let time = Math.floor(Math.random()*5);
//         setTimeout(()=>{
//             let probability = Math.floor(Math.random()*10);
//             if(probability<5) resolve("Email sent successfully.");
//             else reject("Email not sent");
//         }, time*1000);
//     })
// }
// async function sendEmails(userlist){
//     console.log("Sending mails...")
//     let allResponses = userlist.map((email)=>{
//         return sendEmail(email)
//         .then((data)=>{
//             return data;
//         })
//         .catch((data)=>{
//             return data;
//         })
//     });
//     let ans = await Promise.all(allResponses);
//     ans.forEach((status)=>{
//         console.log(status);
//     })
// }
// sendEmails(users);