//### Destructuring :
//# Array :
const arr = [10, 20, 30];

const [a, b, c] = arr;

console.log(a); // 10
console.log(b); // 20
console.log(c); // 30
//#Object
const user = {
  name: "Kush",
  age: 19,
  role: "Developer"
};

// const { name, role } = user;

// console.log(name); // Kush
// console.log(role);  // Developer

const user1 = {
  name: "Kush",
  address: {
    city: "Bhavnagar",
    pincode: 800001
  }
};

const {
  address: { city }
} = user1;

console.log(city);

//### Spread operator (...)
//#In Array : 
const arr1 = [1, 2, 3];
const arr2 = [...arr1];

console.log(arr2); // shallow copy of arr1

//#In Object : 
const userObj = { name: "Kush", age: 19 };

const copy = { ...userObj };

console.log(copy);

//### Rest operator (...)
//#In Array : 
const [first, ...rest] = [10, 20, 30, 40];

console.log(first); // 10
console.log(rest);  // [20,30,40]

//#In Object : 
const { name, ...others } = user;
console.log(name, others);

//### Import/Export (test.js)
import goat, { appUser } from './test.js' //can import with any name for default export
//have to use same name and {} (brackets)
console.log(goat, appUser);