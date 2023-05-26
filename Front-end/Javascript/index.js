/*
function stringToBytes(str) {
    const encoder = new TextEncoder();
    return encoder.encode(str);
}

  // Example usage
const myString = "Research-Project";
const bytes = stringToBytes(myString);

console.log(bytes);

*/

function stringToBytes(str) {
    const encoder = new TextEncoder();
    const encodedBytes = encoder.encode(str);
    const bytes = Array.from(encodedBytes);
    return bytes;
  }
  
  // Example usage
  const myString = "Hello, world!";
  const bytes = stringToBytes(myString);
  console.log(bytes);
