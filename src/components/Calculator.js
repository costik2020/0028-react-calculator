import React from 'react';
import {setState, getState} from "react";

class Calculator extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            upperScreenValue: "0",
            lowerScreenValue: "0"

        }; 

        this.handleNumberPress = this.handleNumberPress.bind(this);
        this.handleOperatorPress = this.handleOperatorPress.bind(this);
        this.handleEqualPress = this.handleEqualPress.bind(this);
        this.handleDecimalPress = this.handleDecimalPress.bind(this);
        this.handleClearPress = this.handleClearPress.bind(this);
    }



handleClearPress(e){
    this.setState((state)=>{
        return {
            upperScreenValue: "0",
            lowerScreenValue: "0"
        }
    })
}


handleNumberPress(e){

    let number = e.target.textContent;
    if (this.state.upperScreenValue === "0"){

        this.setState((state)=>{
            return {
                upperScreenValue: number,
                lowerScreenValue: number
            }
        });
    } else {
        this.setState ((state)=>{ 
            return {
                upperScreenValue: state.upperScreenValue.concat(number),
                lowerScreenValue: state.lowerScreenValue.concat(number)
            } 
        }  );
    }
}

handleOperatorPress(e){
let operator = e.target.textContent;

this.setState((state)=>{
    return {
        upperScreenValue: this.state.upperScreenValue + " " + operator + " ",
        lowerScreenValue: operator
    }
});

}



handleEqualPress(e){
    let result = eval(this.state.upperScreenValue);

    this.setState((state)=>{
        return {
            upperScreenValue: result
        }
    });
}

handleDecimalPress(e){
    let lowerScreenValue = this.state.lowerScreenValue;

    if (!lowerScreenValue.includes(".")){
        this.setState((state)=>{
            return {
                upperScreenValue: this.state.upperScreenValue + ".",
                lowerScreenValue: this.state.lowerScreenValue + "."
            }
        })
    }  


}





    render(){
        return (
            <div className="calculator">
            <div id="bothDisplays">
            <div id="upperDisplay">{this.state.upperScreenValue}</div>
            <div id="display">{this.state.lowerScreenValue}</div>
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





