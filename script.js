const buttons = document.querySelectorAll('button');

let firstOperand = '';
let operation = null;
let secondOperand = '';

//boolean to ensure we only use one decimal
let decimalUsed = false;


buttons.forEach(button => button.addEventListener('click', doButtonStuff));

function doButtonStuff(e) {
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
                doOperationStuff(btnId, display);
                break;
            case 'clear':
                doClearStuff(btnId, display);
                break;
        }

}

function appendDecimal(btnId, display) {
    if (btnId == '.' && decimalUsed) {
        console.log("Returning...");
        //just ignore it because we can't have multiple decimals
        return;
    } else {
        firstOperand += '.';
        display.textContent = firstOperand;
        decimalUsed = true;
    }
}

function doNumberStuff(btnId, display) {

    if (firstOperand == "" && operation == null) {
        firstOperand = btnId;
        display.textContent = firstOperand;
        console.log(firstOperand);
    } else if (firstOperand != null && operation == null) {
        firstOperand += btnId;
        display.textContent = firstOperand;
            
    } 
}

function doClearStuff(btnId, display) {

    let thingToDisplay = '0';

    if (btnId == 'all-clear') {
        console.log("clearning all...");
        //reset all
        firstOperand = '';
        operation = null;
        secondOperand = '';
        decimalUsed = false;

    } else {
        if (secondOperand == '') {
            //then we need to remove a digit from first operand
            firstOperand = firstOperand.substring(0, firstOperand.length-1);
            thingToDisplay = firstOperand;
            console.log(thingToDisplay);
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


