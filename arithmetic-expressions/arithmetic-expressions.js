'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
  console.log('end');
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the arithmeticExpressions function below.
function arithmeticExpressions(arr) {
  const operations = new Array(100);

  const firstValue = arr[0];
  const secondValue = arr[1];

  // store calculated values
  const calculated = {
    added: firstValue + secondValue,
    subtracted: firstValue - secondValue,
    multiplied: firstValue * secondValue,
  };

  for (let key in calculated) {
    const value = calculated[key];

    // if the value is negative, ignore it
    if (value < 0) continue;

    // get remainder of 101. if the value is negative, ignore it
    if (value > 0) {
      calculated[key].remainderOf101 = getRemainderOf101(value);
    } else {
      calculated[key].remainderOf101 = -1;
    }

    if (value >= 101) {
      // check if the remainder is zero which means we reach the answer
      const remainder = calculated[key].remainderOf101;
      if (remainder === 0) {
        console.log('answer');
      }
    }
  }

}

function addOperation(operationArray, remainder, newOperation) {
  // validation
  if (typeof remainder !== 'number' || remainder !== Number.isInteger || remainder <= 0 || remainder > 100) {
    console.error('Invalid remainder value', remainder);
    process.exit();
  }
  if (newOperation !== '+' || newOperation !== '-' || newOperation !== '*') {
    console.error('Invalid newOperation character', newOperation);
    process.exit();
  }

  // add operator character to the array at the index of (remainder - 1)
  const index = remainder - 1;
  operationArray[index].push(newOperation);
}

function getRemainderOf101(value) {

}

function main() {
    process.env.OUTPUT_PATH = __dirname + '/output.log';

    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    let result = arithmeticExpressions(arr);

    ws.write(result + "\n");

    ws.end();
}
