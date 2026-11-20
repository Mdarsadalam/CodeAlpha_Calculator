
let previous = document.getElementById("previous");
let current = document.getElementById("current");

let currentValue = "0";
let firstNumber = null;
let operator = null;
let shouldReset = false;

function updateDisplay() {
    current.innerText = currentValue;
}

function inputNumber(number) {

    if (currentValue === "Error") {
        currentValue = number;
    }

    else if (shouldReset) {
        currentValue = number;
        shouldReset = false;
    }

    else if (currentValue === "0") {
        currentValue = number;
    }

    else {
        currentValue += number;
    }

    updateDisplay();
}

function inputDecimal() {

    if (currentValue === "Error") {
        currentValue = "0";
    }

    if (shouldReset) {
        currentValue = "0";
        shouldReset = false;
    }

    if (!currentValue.includes(".")) {
        currentValue += ".";
    }

    updateDisplay();
}

function chooseOperator(op) {

    if (currentValue === "Error") {
        return;
    }

    firstNumber = Number(currentValue);
    operator = op;

    previous.innerText = currentValue + " " + op;

    shouldReset = true;
}


function calculate() {

    if (operator === null || currentValue === "Error") {
        return;
    }

    let secondNumber = Number(currentValue);
    let result;

    if (operator === "+") {
        result = firstNumber + secondNumber;
    }

    else if (operator === "-") {
        result = firstNumber - secondNumber;
    }

    else if (operator === "*") {
        result = firstNumber * secondNumber;
    }

    else if (operator === "/") {

        if (secondNumber === 0) {
            currentValue = "Error";
            previous.innerText = "Cannot divide by zero";

            operator = null;
            firstNumber = null;

            updateDisplay();
            shouldReset = true;
            return;
        }

        result = firstNumber / secondNumber;
    }

    // REMOVE EXTRA DECIMAL DIGITS
    currentValue = String(Number(result.toPrecision(12)));

    previous.innerText = firstNumber + " " + operator + " " + secondNumber + " =";

    operator = null;
    firstNumber = null;
    shouldReset = true;

    updateDisplay();
}


function clearCalculator() {

    currentValue = "0";
    firstNumber = null;
    operator = null;
    shouldReset = false;

    previous.innerText = "";

    updateDisplay();
}
function deleteEntry() {

    currentValue = "0";
    updateDisplay();
}

function backspace() {

    if (shouldReset) {
        return;
    }

    currentValue = currentValue.slice(0, -1);

    if (currentValue === "" || currentValue === "-") {
        currentValue = "0";
    }

    updateDisplay();
}

function changeSign() {

    if (currentValue === "0" || currentValue === "Error") {
        return;
    }

    if (currentValue.startsWith("-")) {
        currentValue = currentValue.slice(1);
    }

    else {
        currentValue = "-" + currentValue;
    }

    updateDisplay();
}



let buttons = document.querySelectorAll(".buttons button");
buttons.forEach(function(button) {

    button.addEventListener("click", function() {

        let value = button.dataset.value;
        let action = button.dataset.action;

      
        if (value !== undefined) {

            if (value >= "0" && value <= "9") {
                inputNumber(value);
            }

            else if (value === ".") {
                inputDecimal();
            }

            else {
                chooseOperator(value);
            }
        }

        
        if (action === "clear") {
            clearCalculator();
        }

        else if (action === "delete-entry") {
            deleteEntry();
        }

        else if (action === "backspace") {
            backspace();
        }

        else if (action === "sign") {
            changeSign();
        }

        else if (action === "calculate") {
            calculate();
        }

    });

});


// keyboard support in basic calculator
document.addEventListener("keydown", function(event) {

    let key = event.key;

    if (key >= "0" && key <= "9") {
        inputNumber(key);
    }

    else if (key === ".") {
        inputDecimal();
    }

    else if (["+", "-", "*", "/"].includes(key)) {
        chooseOperator(key);
    }

    else if (key === "Enter" || key === "=") {
        calculate();
    }

    else if (key === "Backspace") {
        backspace();
    }

    else if (key === "Escape") {
        clearCalculator();
    }

    else if (key === "Delete") {
        deleteEntry();
    }

    else {
        return;
    }

    event.preventDefault();

});
