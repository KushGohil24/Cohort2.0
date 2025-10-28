// Js assignment 27-oct-2025


// Introduction to JavaScript

//1 Open any website → right-click → Inspect → Console → type: document.title: completed
// 2. Try: alert(“Hello from Sheryians!”)
//alert("Hello from Kush Gohil!");
// 3. Write one line in your own words: “If HTML is skeleton, CSS is clothes — what
// is JS?”
// "If HTML is skeleton, CSS is clothes, JavaScript is the soul or brain of a web page."
//4. Write one example of where you’ve seen JS being used (like popup,
// animation, etc.)
// Example: Form validation on websites before submission(Empty form will not be submitted it will give error because of js).


//Running JS in Browser Console

// 1. Open console and type: 2 + 2
// 2. Type: alert(“Hi”)
// 3. Try: prompt(“Your name?”)
// 4. Type: let city = “Bhopal”; city
//Done!


// Variables and Keywords (var, let, const)

// 1. Declare your name using all three: var a = “Harsh”; let b = “Sheryians”; const c
// = “School”
var a = "Kush";
let b = "A.";
const c = "Gohil";
// 2. Try reassigning them: a = “Updated”; b = “Updated”; c = “Updated”
a = "Updated";
b = "Updated";
// c = "Updated"; //This will give an error because 'c' is a constant and cannot be reassigned.
// 3. Create a variable inside curly braces using let and log it outside.
{
  let city = "New York";
}
// 4. Predict output before running.
// console.log(city); // This will give an error because 'city' is not defined outside the block
// 5. Write 3 examples where const is useful (like PI, baseURL, etc.)
// Examples where const is useful:
// i. PI (Mathematical constant)
// ii. API base URL (e.g., const BASE_URL = "https://api.example.com";)
// iii. Configuration settings that should not change during runtime


// Logging and Interaction (console, alert, prompt)

// 1. Log name, age, and city using console.log, console.info, console.warn.
let name = "Kush Gohil";
let age = 19;
let city = "Bhavnagar";

console.log("Name:", name);
console.info("Age:", age);
console.warn("City:", city);
//2. Use prompt to take user’s name → alert a welcome message.
// let userName = prompt("Enter your name:");
// alert("Welcome, " + userName + "!");
// 3. Log typeof of user’s input.
console.log("Type of user input:", typeof userName);
// 4. Try: let age = prompt(“Enter age:”); console.log(age + 5); observe what happens.
// let userAge = prompt("Enter age:");
// console.log("Age plus 5:", userAge + 5);


// Working with Strings
// 1. 
let msg = "I love Sheryians";
// 2. Try msg.slice(2, 6) and predict the result.
msg.slice(2, 6); //"love"
// 3. Try msg.split(” “) and count words.
msg.split(" "); //["I", "love", "Sheryians"] // Word count: 3
// 4. Try msg.replace(“love”, “study at”).
msg.replace("love", "study at"); //"I study at Sheryians"
// 5. Template string example: let name = “Harsh”; console.log(Hey ${name},
// welcome to JS!)
let name1 = "Kush";
console.log(`Hey ${name1}, welcome to JS!`);
// 6. Check if msg.includes(“love”)
console.log(msg.includes("love")); // true


// Statements and Semicolons
// 1. Remove semicolon and check if code still runs.
console.log("This works without a semicolon")
// 2. Combine two statements in one line and see if it breaks.
console.log("First statement"); console.log("Second statement");
// 3. Write 3 console.log statements without semicolons and predict output.
console.log("Statement one")
console.log("Statement two")
console.log("Statement three")
// Output will be:
// Statement one
// Statement two
// Statement three

// Comments
// 1. Write your name as a single-line comment.
// Kush Gohil
// 2. Write a 3-line comment explaining what your code does.
/*
This code demonstrates basic JavaScript concepts including:
- Variable declaration using var, let, and const
- Logging information to the console
- String manipulation methods
- User interaction through prompt and alert
*/
// 3. Hide one console.log using comment and check output.
// console.log("This will be hidden");
console.log("This will be visible");

// Expressions vs Statements
// 1. Type 5 + 10 (expression).
5 + 10;
// 2. Type let x = 10; (statement).
let x = 10;
// 3. Which one gives a value immediately?
// The expression (5 + 10) gives a value immediately, while the statement (let x = 10;) does not return a value.
// 4. Try: let y = (5 + 10) * 2; console.log(y)
let y = (5 + 10) * 2;
console.log(y); // Output: 30
// 5. Write one line explaining the difference between both.
// An expression produces a value, while a statement performs an action but does not return a value.

// Data Types
// 1. let age = 25; let name = “Harsh”; let isStudent = true; let skills = [“JS”,
// “HTML”]; let user = { city: “Bhopal” }; let x = null; let y; let z = Symbol(“id”)
let age2 = 25;
let name2 = "Kush";
let isStudent2 = true;
let skills2 = ["JS", "HTML", "CSS", "React", "Node.js", "Express", "MongoDB"];
let user2 = { city: "Bhavnagar" };
let x2 = null;
let y2;
let z2 = Symbol("id");

// 2. Log typeof each variable.
console.log(typeof age2); // number
console.log(typeof name2); // string
console.log(typeof isStudent2); // boolean
console.log(typeof skills2); // object (arrays are of type object)
console.log(typeof user2); // object
console.log(typeof x2); // object (this is a known quirk in JavaScript)
console.log(typeof y2); // undefined
console.log(typeof z2); // symbol
// 3. Change one value and recheck typeof.
age2 = "Twenty Five";
console.log(typeof age2); // string
// 4. Try adding a number and string together.
let result = 10 + "5";
console.log(result); // "105" (string concatenation)


// Special Values

// 1. Log 1 / 0, 0 / 0, Number(“abc”), undefined + 1
// 2. Write what appears (Infinity, NaN, etc.)
console.log(1 / 0); // Infinity
console.log(0 / 0); // NaN
console.log(Number("abc")); // NaN
console.log(undefined + 1); // NaN

// 3. Write one line explaining when to use null vs undefined.
// Use null to represent an intentional absence of any object value, while undefined indicates that a variable has been declared but not yet assigned a value.


// Primitive vs Reference

// 1. let x = 5; let y = x; y = 10; console.log(x, y)
let x3 = 5;
let y3 = x3;
y3 = 10;
console.log(x3, y3); // Output: 5 10
// 2. let obj1 = { name: “Harsh” }; let obj2 = obj1; obj2.name = “Sheryians”;
let obj1 = { name: "Kush" };
let obj2 = obj1;
obj2.name = "Gohil";
// console.log(obj1.name)
console.log(obj1.name); // Output: "Gohil"
// 3. Observe which one changes together.
// In the first example, x3 remains 5 while y3 changes to 10, showing that primitive values are copied by value. In the second example, changing obj2 also changes obj1, showing that objects are copied by reference.
// 4. Draw memory boxes on paper to visualize difference.
// Done!

