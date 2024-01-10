const displayableBtn = document.querySelectorAll(".btn");
const numberBtn = [...document.querySelectorAll(".number")].map((el) => el.id);
const operatorBtn = [...document.querySelectorAll(".operator")].map((el) => el.id);
const userInput = document.querySelector("#user-input");
const dotBtn = [document.querySelector(".dot")].map((el) => el.id);
const equalsBtn = document.querySelector(".btnEqual");
const clearBtn = document.querySelector(".clear");
const backspaceBtn = document.querySelector(".backspace");
let numbersDisplayed = [];
let numberIndexes = [];
let operatorIndexes = [];
let operatorsDisplayed = [];

displayableBtn.forEach((btn) =>
  btn.addEventListener("mousedown", () => {
    displayValue(btn.id);
    if (operatorBtn.includes(btn.id)) {
      operatorIndexes = [];
      operatorsDisplayed = [];
      findOperatorValuesAndIndexes(userInput.value);
    }
    if (numberBtn.includes(btn.id)) {
      numbersDisplayed = [];
      numberIndexes = [];
      getEachNumSplitted(userInput.value);
    }
  })
);
function displayValue(clickedBtn) {
  let expression = userInput.value;
  if (
    //length of each num max 10 digits from begin to first operator no dot included
    expression.slice(0, operatorIndexes[0]).length >= 10 &&
    numberBtn.includes(clickedBtn) &&
    operatorIndexes.length < 1
  ) {
    userInput.value;
  } else if (
    //length of each num max 10 digits from first operator to end no dot included
    expression.slice(operatorIndexes[0]).length >= 10 &&
    numberBtn.includes(clickedBtn) &&
    operatorIndexes.length >= 1
  ) {
    userInput.value;
  } else if (
    //if first digit is operator don't display it except '-'
    operatorBtn.includes(clickedBtn) &&
    expression.length < 1 &&
    numbersDisplayed.length < 1
  ) {
    if (clickedBtn === "-" && expression.length < 1) {
      userInput.value += clickedBtn;
    } else {
      userInput.value;
    }
  } else if (
    //first digit is '-'.. and clickedBtn = operator, don't change anything
    expression.charAt(0) === "-" &&
    expression.length <= 1 &&
    operatorBtn.includes(clickedBtn)
  ) {
    userInput.value;
  } else if (dotBtn.includes(clickedBtn)) {
    if (dotBtn.includes(expression.charAt(expression.length - 1))) {
      stopDoubleOperatorOrDot(clickedBtn);
    } else if (
      expression.substring(0, operatorIndexes[0]).includes(".") &&
      operatorIndexes.length < 1
    ) {
      allowOnlyOneDot();
    } else if (
      expression
        .substring(operatorIndexes[operatorIndexes.length - 1])
        .includes(".") &&
      operatorIndexes.length >= 1
    ) {
      allowOnlyOneDot();
    } else {
      userInput.value += clickedBtn;
    }
  } else if (
    operatorBtn.includes(clickedBtn) &&
    operatorBtn.includes(expression.charAt(expression.length - 1))
  ) {
    stopDoubleOperatorOrDot(clickedBtn);
  } else if (
    //if first digit is '-' and already 2 operators in expression, and btn clicked is operator--> calculate numbers
    //this calculates always the first 2 numbers.. 3rd number can't be displayed
    operatorBtn.includes(clickedBtn) &&
    numbersDisplayed.length >= 2 &&
    operatorIndexes.length >= 2 &&
    userInput.value.charAt(0) === "-"
  ) {
    operate(numbersDisplayed[0], numbersDisplayed[1], operatorsDisplayed[1]);
    userInput.value += clickedBtn;
  } else if (
    //if there are already 2 operators in expression, and btn clicked is operator--> calculate numbers
    //this calculates always the first 2 numbers.. 3rd number can't be displayed
    operatorBtn.includes(clickedBtn) &&
    operatorIndexes.length >= 1 &&
    userInput.value.charAt(0) !== "-"
  ) {
    operate(numbersDisplayed[0], numbersDisplayed[1], operatorsDisplayed[0]);
    userInput.value += clickedBtn;
  } else {
    userInput.value += clickedBtn;
  }
}

function allowOnlyOneDot() {
  userInput.value = userInput.value.substring(0, userInput.value.length);
}

function stopDoubleOperatorOrDot(clickedBtn) {
  userInput.value =
    userInput.value.substring(0, userInput.value.length - 1) + clickedBtn;
}

function getEachNumSplitted(toCalculate) {
  //if number starts with -, than push first num with a '-' attached to it.
  const negativeNum = toCalculate.charAt(0);
  if (negativeNum === "-") {
    let startsWithNegative = toCalculate.slice(1).split(/[+\-*/]/);
    for (let i = 0; i < startsWithNegative.length; i++) {
      //only first number gets '-'
      if (i === 0) {
        numbersDisplayed.push(parseFloat(-startsWithNegative[i]));
      } else {
        numbersDisplayed.push(parseFloat(startsWithNegative[i]));
        numberIndexes.push(parseFloat(i));
      }
    }
  } else {
    //if number isn't negative
    const splittedExpression = toCalculate.split(/[+\-*/]/);
    splittedExpression.forEach((num, i) => {
      numbersDisplayed.push(parseFloat(num));
      numberIndexes.push(parseFloat(i));
    });
  }
}

function findOperatorValuesAndIndexes(expression) {
  expression.split("").forEach((digit, index) => {
    if (operatorBtn.includes(digit)) {
      operatorIndexes.push(index);
      operatorsDisplayed.push(digit);
    }
  });
}

function emptyArrays() {
  numbersDisplayed = [];
  numberIndexes = [];
  operatorIndexes = [];
  operatorsDisplayed = [];
}

function calculate(firstNum, nextNum, operator) {
  if (operator === "+") return firstNum + nextNum;
  if (operator === "-") return firstNum - nextNum;
  if (operator === "*") return firstNum * nextNum;
  if (operator === "/") return firstNum / nextNum;
}

equalsBtn.addEventListener("mouseup", () => {
  if (userInput.value.charAt(0) === "-") {
    operate(numbersDisplayed[0], numbersDisplayed[1], operatorsDisplayed[1]);
  } else if (numbersDisplayed.length < 2 || operatorIndexes.length < 1) {
    return;
  } else {
    operate(numbersDisplayed[0], numbersDisplayed[1], operatorsDisplayed[0]);
  }
});
function operate(firstNum, nextNum, operator) {
  //if endResult is Integer return endResult, else only 2 digits after decimal point allowed
  let endResult = calculate(firstNum, nextNum, operator);
  if (
    (operator === "/" && firstNum === 0) ||
    (operator === "/" && nextNum === 0) ||
    (operator === "*" && firstNum === 0) ||
    (operator === "*" && nextNum === 0)
  ) {
    prompt("Math Error: don't divide or multiply by 0");
    userInput.value = userInput.value.slice(0, userInput.value.length - 1);
  } else {
    userInput.value = Number.isInteger(endResult)
      ? endResult
      : endResult.toFixed(2);
  }
  emptyArrays();
}

clearBtn.addEventListener("click", () => clear());
function clear() {
  userInput.value = 0;
}

backspaceBtn.addEventListener("click", () => deleteDigit());
function deleteDigit() {
  userInput.value = userInput.value.substring(0, userInput.value.length - 1);
}
//KEYBOARD EVENT
userInput.addEventListener("keydown", (event) => {
  //preventDefault used to stop double keys being displayed
  event.preventDefault();
  const allowedKeys = /([0-9+\-\/*\.])\d?/;
  const operatorKeys = /([+\-*\/])\d?/;
  const numberKeys = /([0-9])\d?/;
  const pressedKey = event.key;
  if (allowedKeys.test(pressedKey)) displayValue(event.key);
  if (operatorKeys.test(pressedKey)) {
    operatorIndexes = [];
    operatorsDisplayed = [];
    findOperatorValuesAndIndexes(userInput.value);
    console.log("operator pressed");
  }
  if (numberKeys.test(pressedKey)) {
    numbersDisplayed = [];
    numberIndexes = [];
    getEachNumSplitted(userInput.value);
    console.log("num pressed");
  }
  if (event.key === "Backspace") deleteDigit();
});

userInput.addEventListener("keyup", (event) => {
  const pressedKey = event.key;
  if (pressedKey === "=" || pressedKey === "Enter") {
    if (userInput.value.charAt(0) === "-") {
      operate(numbersDisplayed[0], numbersDisplayed[1], operatorsDisplayed[1]);
    } else if (numbersDisplayed.length < 2 || operatorIndexes.length < 1) {
      return;
    } else {
      operate(numbersDisplayed[0], numbersDisplayed[1], operatorsDisplayed[0]);
    }
  }
});
