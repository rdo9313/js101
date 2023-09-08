function capitalize() {
  return word[0].toUpperCase() + word.slice(1);
}

let word = "hello";
while (true) {
  capitalize(word);
  break;
}
