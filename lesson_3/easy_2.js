// 1
// let advice =
//   "Few things in life are as important as house training your pet dinosaur.";
// console.log(advice.replace("important", "urgent"));

// 2
// let numbers = [1, 2, 3, 4, 5];
// let reversedArray = numbers.slice().reverse();
// console.log(numbers);

// numbers = [1, 2, 3, 4, 5];
// let sortedArray = [...numbers].sort((num1, num2) => num2 - num1);
// console.log(numbers);

// 3
// let numbers = [1, 2, 3, 4, 5, 15, 16, 17, 95, 96, 99];

// let number1 = 8; // false
// let number2 = 95; // true

// numbers.includes(number1);
// numbers.includes(number2);

// 4
// let famousWords = "seven years ago...";
// "Four score and " + famousWords;
// "Four score and ".concat(famousWords);

// 5
// let arr = [1, 2, 3, 4, 5];
// arr.splice(2, 1);
// console.log(arr);

// 6
// let flintstones = ["Fred", "Wilma"];
// flintstones.push(["Barney", "Betty"]);
// flintstones.push(["Bambam", "Pebbles"]);

// let arr = [];
// flintstones.forEach((el) => {
//   arr = arr.concat(el);
// });
// console.log(arr);

// 7
// let flintstones = {
//   Fred: 0,
//   Wilma: 1,
//   Barney: 2,
//   Betty: 3,
//   Bambam: 4,
//   Pebbles: 5,
// };
// console.log(Object.entries(flintstones).find((arr) => arr[0] === "Barney"));

// 8
// let numbers = [1, 2, 3, 4]; // true
// let table = { field1: 1, field2: 2, field3: 3, field4: 4 }; // false

// Array.isArray(numbers);
// Array.isArray(table);

// 9
// let title = "Flintstone Family Members";
// let padding = Math.floor((40 - title.length) / 2);

// title.padStart(padding + title.length);

// 10
// let statement1 = "The Flintstones Rock!";
// let statement2 = "Easy come, easy go.";

// console.log(statement1.split("").filter((char) => char === "t").length);
// console.log(statement2.split("").filter((char) => char === "t").length);
