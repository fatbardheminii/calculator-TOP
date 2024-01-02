const allBtn = document.querySelectorAll('button');
const displayableBtn = document.querySelectorAll('.btn');
//const numberBtn = document.querySelectorAll('.number');
//const operatorBtn = document.querySelectorAll('.operator');
const userInput = document.querySelector('#user-input');
const dotBtn = document.querySelector('.dot');
const equalsBtn = document.querySelector('.btnEqual');
const clearBtn = document.querySelector('.clear');
const backspaceBtn = document.querySelector('.backspace');
let expression = userInput.value;

displayableBtn.forEach((btn) => btn.addEventListener("click", () => displayValue(btn)));

function displayValue(clickedBtn){
    userInput.value += clickedBtn.id;
    console.log(expression);
    return expression;
}

clearBtn.addEventListener("click", () => clear());

function clear() {
    userInput.value = 0;
}

backspaceBtn.addEventListener("click", () => deleteDigit())

function deleteDigit(){
    userInput.value = userInput.value.substring(0, userInput.value.length - 1);
}