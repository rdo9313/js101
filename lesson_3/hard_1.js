// 1
// No. The first function will return an object with the prop1 property, while the second function will return undefined.

// 2
// let object = { first: [1] };
// let numArray = object["first"];
// numArray.push(2);

// console.log(numArray); //  => "[1, 2]"
// console.log(object); // => { first: [1, 2] }

// 3
// function messWithVars(one, two, three) {
//   one = two;
//   two = three;
//   three = one;
// }

// let one = ["one"];
// let two = ["two"];
// let three = ["three"];

// messWithVars(one, two, three);

// console.log(`one is: ${one}`); // => "one"
// console.log(`two is: ${two}`); // => "two"
// console.log(`three is: ${three}`); // => "three"

// function messWithVars(one, two, three) {
//   one = ["two"];
//   two = ["three"];
//   three = ["one"];
// }

// let one = ["one"];
// let two = ["two"];
// let three = ["three"];

// messWithVars(one, two, three);

// console.log(`one is: ${one}`); // => "one"
// console.log(`two is: ${two}`); // => "two"
// console.log(`three is: ${three}`); // => "three"

// function messWithVars(one, two, three) {
//   one.splice(0, 1, "two");
//   two.splice(0, 1, "three");
//   three.splice(0, 1, "one");
// }

// let one = ["one"];
// let two = ["two"];
// let three = ["three"];

// messWithVars(one, two, three);

// console.log(`one is: ${one}`); // => "two"
// console.log(`two is: ${two}`); // => "three"
// console.log(`three is: ${three}`); // => "one"

// 4
function isDotSeparatedIpAddress(inputString) {
  let dotSeparatedWords = inputString.split(".");

  if (dotSeparatedWords.length !== 4) {
    return false;
  }

  while (dotSeparatedWords.length > 0) {
    let word = dotSeparatedWords.pop();
    if (!isAnIpNumber(word)) {
      return false;
    }
  }

  return true;
}

function isAnIpNumber(str) {
  if (/^\d+$/.test(str)) {
    let number = Number(str);
    return number >= 0 && number <= 255;
  }

  return false;
}
