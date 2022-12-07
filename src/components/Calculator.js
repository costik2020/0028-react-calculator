import React from 'react';
import {setState, getState} from "react";

class Calculator extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            display: "0",
            wasEqualPressedBefore: false

        }; 

        this.handleNumberPress = this.handleNumberPress.bind(this);
        this.handleOperatorPress = this.handleOperatorPress.bind(this);
        this.handleEqualPress = this.handleEqualPress.bind(this);
        this.handleDecimalPress = this.handleDecimalPress.bind(this);
        this.handleClearPress = this.handleClearPress.bind(this);
    }



handleClearPress(e){
    console.log("clear was pressed!");
    this.setState((state)=>{
        return {
            display: "0",
            wasEqualPressedBefore: false
        }
    })
}




handleNumberPress(e){

    let number = e.target.textContent;
    // When inputting numbers, my calculator should not allow a number to begin with multiple zeros. 
    // Deal with multiple zeroes "0" or "000" scenaries
    // Don't allow the user to insert more than one zero 
    if ((this.state.display === "0") && (e.target.textContent === "0")){
        // Do nothing just exit the function 
        return undefined;
    }

    // If equal was pressed and a calcualtion was done just before the number press 
    // Go ahead and clear evertything. 


    if (this.state.display === "0"){

        this.setState((state)=>{
            return {
                display: number
            }
        });
    } else if ( "/*-+".indexOf(this.state.display[this.state.display.length-1]) !== -1  ) {
        this.setState ((state)=>{ 
            return {
                display: this.state.wasEqualPressedBefore ? number : this.state.display + " " + number,
                wasEqualPressedBefore: false 
            } 
        }  );
    } else {

        this.setState ((state)=>{ 
            return {
                display: this.state.wasEqualPressedBefore ? number : this.state.display + number,
                wasEqualPressedBefore: false 
            } 
        }  );
    }
}



handleOperatorPress(e){
    let operator = e.target.textContent;

    // Handle the special case when the user pressed double minuses

    // When I have `1--2=` I want it to become  ` 1 - -2 = ` 
    // When I have `1*-2=` I want it to become  ` 1 * -2 = ` 
    // When I have `1 /*+-2` I want it to becom ` 1 + -2 = `
    // When I have `1 /+-*2` I want it to becom ` 1 * 2 = ` 
 console.log("this.state.display=", this.state.display);

    let tempDisplayArray = this.state.display.trim().split(" ");
    let firstOperatorBeforeNow = tempDisplayArray[tempDisplayArray.length-1];
    let secondOperatorBeforeNow  = tempDisplayArray[tempDisplayArray.length-2];


    // Test for the `1--2=` case, If I have 2 minuses, then it is a valid case but 3 minuses is not valid case

    console.log("this.state.display=", this.state.display);
    console.log("tempDisplayArray=", tempDisplayArray);
    console.log("firstOperatorBeforeNow=", firstOperatorBeforeNow);
    console.log("secondOperatorBeforeNow=", secondOperatorBeforeNow);
    console.log("operator=", operator);

    // 1 + 1 situation 
    if ("/*-+".indexOf(firstOperatorBeforeNow) === -1){
        this.setState((state)=>{
            return {
                display: this.state.display + " " + operator + " "
            }
        });

    } else if ((operator === "-") && (firstOperatorBeforeNow === "-") && ("/*-+".indexOf(secondOperatorBeforeNow) === -1) ) {
        // 1 - - 1 situation

        this.setState((state)=>{
            return {
                display: this.state.display + " " + operator + " "
            }
        });
    } else if ( (operator === "-") && ( "/*+".indexOf(firstOperatorBeforeNow) !== -1 )  ){
        // 1 + - 1 situation
        this.setState((state)=>{
            return {
                display: this.state.display + " " + operator + " "
            }
        });

    } else if ( ("/*-+".indexOf(firstOperatorBeforeNow) !== -1) && ("/*-+".indexOf(secondOperatorBeforeNow) !== -1) ){
        // 1 * - + 1 situation 
        tempDisplayArray.splice(tempDisplayArray.length-2, 2);
        tempDisplayArray[tempDisplayArray.length - 1] = operator;
        let newDisplay = tempDisplayArray.join(" ");
        this.setState((state)=>{
            return {
                display: newDisplay
            }
        });


    } else {
        // 1 / * + 1 situation
        tempDisplayArray[tempDisplayArray.length - 1] = operator;
        let newDisplay = tempDisplayArray.join(" ");
        this.setState((state)=>{
            return {
                display: newDisplay
            }
        });


    }



    if (this.state.wasEqualPressedBefore) {
        this.setState((state)=>{
            return {
                wasEqualPressedBefore: false
            }
        });
    }

}




handleEqualPress(e){
    let result = eval(this.state.display);
    
    console.log("Equal was pressed for:");
    console.log("display=", this.state.display);
    console.log("result=", `${result}`);
    console.log("----------------------");
    this.setState((state)=>{
        return {
            display: `${result}`,
            wasEqualPressedBefore: true
        }
    });
}



handleDecimalPress(e){
    let display = this.state.display;

    //When the decimal element is clicked, a . should append to the currently displayed value; two . in one number should not be accepted. 
    let tempDisplayArray = this.state.display.split(" ");
    let lastNumber = tempDisplayArray[tempDisplayArray.length-1];



    if (!lastNumber.includes(".")){
        this.setState((state)=>{
            return {
                display: this.state.display + ".",
            }
        })
    }  


}





    render(){
        return (
            <div className="calculator">
            <div id="bothDisplays">
            <div id="display">{this.state.display}</div>
            </div>

            <div id="clear" onClick={this.handleClearPress} >AC</div>
            <div id="divide" onClick={this.handleOperatorPress}>/</div>
            <div id="multiply" onClick={this.handleOperatorPress}>*</div>
            <div id="subtract" onClick={this.handleOperatorPress}>-</div>
            <div id="add" onClick={this.handleOperatorPress}>+</div>
            <div id="equals" onClick={this.handleEqualPress} >=</div>
            <div id="seven" onClick={this.handleNumberPress}>7</div>
            <div id="eight" onClick={this.handleNumberPress}>8</div>
            <div id="nine" onClick={this.handleNumberPress}>9</div>
            <div id="four" onClick={this.handleNumberPress}>4</div>
            <div id="five" onClick={this.handleNumberPress}>5</div>
            <div id="six" onClick={this.handleNumberPress}>6</div>
            <div id="one" onClick={this.handleNumberPress}>1</div>
            <div id="two" onClick={this.handleNumberPress}>2</div>
            <div id="three" onClick={this.handleNumberPress}>3</div>
            <div id="zero" onClick={this.handleNumberPress}>0</div>
            <div id="decimal" onClick={this.handleDecimalPress}>.</div>
            </div>
        );
    }

}











export default Calculator;





