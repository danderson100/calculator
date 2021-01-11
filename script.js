/**
 * Author: David Anderson
 * Date: Jan 11, 2021
 * 
 */


const buttons = document.querySelectorAll('button');

let firstOperand = '';
let operation = null;
let secondOperand = '';

let currOperand = 1;

//boolean to ensure we only use one decimal
let decimalUsed = false;

let equalsUsed = false;


buttons.forEach(button => button.addEventListener('click', doButtonStuff));

function doButtonStuff(e) {

    if (equalsUsed) {
        clearAll();
    }

    //here is where the numbers will be displayed
    let display = document.getElementById("display-element");
    
    let btnId = e.target.id;

    let type = document.getElementById(btnId).className;

        switch (type) {
            case 'number':
              doNumberStuff(btnId, display);
              break;
            case 'decimal':
                appendDecimal(btnId, display);
                break;
            case 'operation':
                setOperation(btnId, display);
                break;
            case 'neg':
                setNegative(display);
                break;
            case 'clear':
                doClearStuff(btnId, display);
                break;
        }

}

function setNegative(display) {
    if (currOperand == 1 && firstOperand != '') {
        firstOperand = '-' + firstOperand;
        display.textContent = firstOperand;
    } else if (currOperand == 2 && secondOperand != '') {
        secondOperand = '-' + secondOperand;
        display.textContent = secondOperand;
    }

}

function setOperation(btnId, display) {

    if (btnId == 'eq' && firstOperand != '' 
    && operation != null && secondOperand != '') {

        let result = operate();
        let roundedRes = parseFloat(result.toFixed(5));
        display.textContent = roundedRes;

        equalsUsed = true;

    } else if (firstOperand != '' 
    && operation != null && secondOperand != '') {

        let result = operate();
        let roundedRes = parseFloat(result.toFixed(5));
        display.textContent = roundedRes;

        firstOperand = roundedRes;
        secondOperand = '';
        operation = btnId;

    } else {
        operation = btnId;
    }
}

function operate() {
    switch (operation) {
        case 'divide':
            return parseFloat(firstOperand / secondOperand);
        case 'mp':
            return parseFloat(firstOperand * secondOperand);
        case 'sub':
            return parseFloat(firstOperand - secondOperand);
        case 'add':
            return parseFloat(firstOperand) + parseFloat(secondOperand);
    }
}

function appendDecimal(btnId, display) {
    if (currOperand === 1) {
        if (btnId == '.' && decimalUsed) {
            //just ignore it because we can't have multiple decimals
            return;
        } else {
            firstOperand += '.';
            display.textContent = firstOperand;
            decimalUsed = true;
        }
    } else {
        if (btnId == '.' && decimalUsed) {
            //just ignore it because we can't have multiple decimals
            return;
        } else {
            secondOperand += '.';
            display.textContent = secondOperand;
            decimalUsed = true;
        }
    }
}

function doNumberStuff(btnId, display) {

    if (firstOperand == '' && operation == null) {
        firstOperand = btnId;
        display.textContent = firstOperand;

    } else if (firstOperand != '' && operation == null) {
        firstOperand += btnId;
        display.textContent = firstOperand;
            
    } else if (firstOperand != '' && operation != null && secondOperand == '') {
        currOperand = 2;
        decimalUsed = false;
        //then we need to create the second operand
        secondOperand = btnId;
        display.textContent = secondOperand;
        
    } else {
        currOperand = 2;
        decimalUsed = false;
        secondOperand += btnId;
        display.textContent = secondOperand;
    }
}

function doClearStuff(btnId, display) {

    let thingToDisplay = '0';

    if (btnId == 'all-clear') {

        clearAll();

    } else {
        if (secondOperand == '') {
            //then we need to remove a digit from first operand
            firstOperand = firstOperand.substring(0, firstOperand.length-1);
            thingToDisplay = firstOperand;

        } else {
            secondOperand = secondOperand.substring(0, secondOperand.length-1);
            thingToDisplay = secondOperand;
        }
        
    }
    if (thingToDisplay != '') {
        display.textContent = thingToDisplay;
    } else {
        display.textContent = '0';
    }

}

function clearAll() {
    //reset all
    firstOperand = '';
    operation = null;
    secondOperand = '';
    decimalUsed = false;
    currOperand = 1;
    equalsUsed = false;
}


