const allBtn = document.querySelectorAll('button');
const displayableBtn = document.querySelectorAll('.btn');
const numberBtn = document.querySelectorAll('.number');
const operatorBtn = [...document.querySelectorAll('.operator')].map((el) => el.id);
const userInput = document.querySelector('#user-input');
const dotBtn = [document.querySelector('.dot')].map((el) => el.id);
const equalsBtn = document.querySelector('.btnEqual');
const clearBtn = document.querySelector('.clear');
const backspaceBtn = document.querySelector('.backspace');
let numbersDisplayed = [];
let operatorIndexes = [];
let operatorsDisplayed = [];

displayableBtn.forEach((btn) => btn.addEventListener("mousedown", () => {
    displayValue(btn);
    if(operatorBtn.includes(btn.id)){
      operatorIndexes = [];
      operatorsDisplayed = [];
    findOperatorValuesAndIndexes(userInput.value);
    }
    numbersDisplayed = [];
    getEachNumSplitted(userInput.value);
}));
function displayValue(clickedBtn){
    let expression = userInput.value;
    if (
      dotBtn.includes(clickedBtn.id)
    ) {
      if(dotBtn.includes(expression.charAt(expression.length - 1))) {
        stopDoubleOperatorOrDot(clickedBtn);
      } else if (
        expression.substring(0, operatorIndexes[0]).includes(".") &&
        operatorIndexes.length < 1
      ) {
        allowOnlyOneDot();
      } else if (
        expression.substring(operatorIndexes[operatorIndexes.length - 1]).includes(".") &&
        operatorIndexes.length >= 1
      ) {
        allowOnlyOneDot();
      } else {
        userInput.value += clickedBtn.id;
      }
    } else if (
      operatorBtn.includes(clickedBtn.id) &&
      operatorBtn.includes(expression.charAt(expression.length - 1))
    ) {
        stopDoubleOperatorOrDot(clickedBtn);
    } else {
      userInput.value += clickedBtn.id;
    }
}

function allowOnlyOneDot(){
    userInput.value = userInput.value.substring(0, userInput.value.length);
}

function stopDoubleOperatorOrDot(clickedBtn){
    userInput.value = userInput.value.substring(0, userInput.value.length - 1) + clickedBtn.id;
}

function getEachNumSplitted(toCalculate) {
    //if number starts with -, than push first num with a - attached to it. 
    const negativeNum = toCalculate.charAt(0);
    if(negativeNum === '-'){
        let startsWithNegative = toCalculate.slice(1).split(/[+\-*/]/);
        for (let i = 0; i < startsWithNegative.length; i++){
            //only first number gets '-'
            if (i === 0){
                numbersDisplayed.push(parseFloat(-startsWithNegative[i]));
            } else {
                numbersDisplayed.push(parseFloat(startsWithNegative[i]));
            }
        }
    } else {
      //if number isn't negative
      const splittedExpression = toCalculate.split(/[+\-*/]/);
      splittedExpression.forEach((num) => {
        numbersDisplayed.push(parseFloat(num));
      });
    }
}

function add(firstNum, nextNum){
    return parseFloat(firstNum + nextNum); 
}

function subtract(firstNum, nextNum) {
  return parseFloat(firstNum - nextNum);
}

function multiply(firstNum, nextNum) {
  return parseFloat(firstNum * nextNum);
}

function divide(firstNum, nextNum) {
  return parseFloat(firstNum / nextNum);
}

equalsBtn.addEventListener("mouseup", () => {
    if(userInput.value.charAt(0) === '-'){
        operate(
          numbersDisplayed[0],
          numbersDisplayed[1],
          operatorsDisplayed[1]
        );
    } else {
        operate(
          numbersDisplayed[0],
          numbersDisplayed[1],
          operatorsDisplayed[0]
        );
    }

});
function operate (firstNum,nextNum, operator){
    switch (operator) {
      case (operator = "+"):
        userInput.value = add(firstNum, nextNum);
        numbersDisplayed = [];
        operatorIndexes = [];
        operatorsDisplayed = [];
        firstNum = userInput.value;
        break;
      case (operator = "-"):
        userInput.value = subtract(firstNum, nextNum);
        numbersDisplayed = [];
        operatorIndexes = [];
        operatorsDisplayed = [];
        firstNum = userInput.value;
        break;
      case (operator = "*"):
        userInput.value = multiply(firstNum, nextNum);
        numbersDisplayed = [];
        operatorIndexes = [];
        operatorsDisplayed = [];
        firstNum = userInput.value;
        break;
      case (operator = "/"):
        userInput.value = divide(firstNum, nextNum);
        numbersDisplayed = [];
        operatorIndexes = [];
        operatorsDisplayed = [];
        firstNum = userInput.value;
        break;
    }
}

function findOperatorValuesAndIndexes(expression) {
    expression.split("").forEach((digit, index) => {
        if(operatorBtn.includes(digit)){
            operatorIndexes.push(index);
            operatorsDisplayed.push(digit);
        }
    });
}

clearBtn.addEventListener("click", () => clear());
function clear() {
    userInput.value = 0;
}

backspaceBtn.addEventListener("click", () => deleteDigit())
function deleteDigit(){
    userInput.value = userInput.value.substring(0, userInput.value.length - 1);
}