/**********************************************************
 * Calculator program to demonstrate JavaScript
 * This program will have a non-local storage system that will remember 
 * the users numbers for a short amount of time. 
 * Loops Conditional Statements Functions Variables Parameters Arrays Associative Arrays
 *********************************************************/
// declare variables
var divCalc = document.getElementById("divCalc");
var numberList = [];

/**************************************************************
 * Function: loadCalc ()
 * Use: Load the calculator to the screen
 *************************************************************/
function loadCalc() {

}

function number(value) {
    if (typeof (value) != "number") {
        console.log("Value = " + typeof (value));
        console.log("Not a number!");
    }
    numberList.push(value);
    document.getElementById("display").innerHTML = numberList.toString();
    console.log(numberList);
}

function add() {
    if (numberList[numberList.length - 1] != "+") {
        console.log("numberList[length] = " + numberList[numberList.length]);
        numberList.push("+");
    }
    console.log(numberList);
}

function equal() {
    var total = 0;
    for (let i = 0; i < numberList.length; i++) {
        switch (typeof (numberList[i])) {
            case "number":
                total = numberList[i];
            case "string":
                if (numberList[i] == "+") {
                    total += numberList[i + 1];
                }
                console.log("case: string Total = " + total);
                break;
            default:
                break;
        }
    }
    console.log("total = " + total);
    console.log("Total = " + typeof (total))
    return total;
}