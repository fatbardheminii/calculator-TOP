const allBtn = document.querySelectorAll('button');
const displayableBtn = document.querySelectorAll('.btn');
const numberBtn = document.querySelectorAll('.number');
const operatorBtn = [...document.querySelectorAll('.operator')].map((el) => el.id);
const userInput = document.querySelector('#user-input');
const dotBtn = document.querySelector('.dot');
const equalsBtn = document.querySelector('.btnEqual');
const clearBtn = document.querySelector('.clear');
const backspaceBtn = document.querySelector('.backspace');
let numbersDisplayed = [];
let operatorIndexes = [];
let operatorsDisplayed = [];

displayableBtn.forEach((btn) => btn.addEventListener("click", () => displayValue(btn)));
function displayValue(clickedBtn){
    userInput.value += clickedBtn.id;
}

function getEachNumSplitted(toCalculate) {
    const splittedExpression = toCalculate.split(/[+\-*/]/);
    splittedExpression.forEach(num => numbersDisplayed.push(num));
}

function add(firstNum, nextNum){
    return +firstNum + +nextNum; 
}

function subtract(firstNum, nextNum) {
  return +firstNum - +nextNum;
}

function multiply(firstNum, nextNum) {
  return +firstNum * +nextNum;
}

function divide(firstNum, nextNum) {
  return +firstNum / +nextNum;
}

equalsBtn.addEventListener("mousedown", () => {
    findOperatorValuesAndIndexes(userInput.value);
    getEachNumSplitted(userInput.value);
})

equalsBtn.addEventListener("mouseup", () => operate(numbersDisplayed[0],numbersDisplayed[1], operatorsDisplayed[0]));
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