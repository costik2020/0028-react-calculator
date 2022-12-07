import React from 'react';
import {setState, getState} from "react";

class Calculator extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            upperScreenValue: "0",
            lowerScreenValue: "0",
            firstOperand: 0,
            currentOperand: "",
            secondOperand: 0,
            lastOperator: null,
            countOperators: 0,
            negativeOperand: false,
            arrayOfExpresion: [],
            arrayIndex: 0,
            wasTheFloatDotUsed: false,
            initialization: true

        }; 

        this.handleButtonPress= this.handleButtonPress.bind(this); 
        this.handleClearPress= this.handleClearPress.bind(this); 
        this.calculateTotal= this.calculateTotal.bind(this); 
        this.handleCalculateTotal= this.handleCalculateTotal.bind(this); 
        this.handleUpperDisplay= this.handleUpperDisplay.bind(this); 
        this.handleLowerDisplay= this.handleLowerDisplay.bind(this);
        this.displayTotal= this.displayTotal.bind(this);


    }



    handleClearPress (){
        this.setState((state)=>{
            return {
            upperScreenValue: "0",
            lowerScreenValue: "0",
            firstOperand: 0,
            currentOperand: "",
            secondOperand: 0,
            lastOperator: null,
            countOperators: 0,
            negativeOperand: false,
            arrayOfExpresion: [],
            arrayIndex: 0,
            wasTheFloatDotUsed: false,
            initialization: true,
            wasEqualPressed: ""


            }
        });
    }



    handleUpperDisplay(e){
        // this.setState({input: event.target.value}); 
        // console.log("You clicked ",e.target.textContent);
        // this.setState( {upperScreenValue: e.target.value  } );
        //console.log("state=", state);
        // console.log(e.target.textContent);

        // Deal with multiple zeroes "0" or "000" scenaries
        // Don't allow the user to insert more than one zero 
        if ((this.state.lowerScreenValue === "0") && (e.target.textContent === "0")){
            // Do nothing just exit the function 
            return undefined;
        }

        // Handle the edge case where multiple dots .. are not alowed in a number
        if(( this.state.wasTheFloatDotUsed === true ) && (e.target.textContent === "."))  {
            this.setState((state)=>{ return state  });
            // Reset the wasTheFloatDotUsed state variable

        } else if (this.state.initialization === true){

            // this.setState ((state)=>{ return state }  );
            this.setState ((state)=>{ return { upperScreenValue: e.target.textContent  } }  );

        } else {
            if ((this.state.wasEqualPressed === "=") && ( "/*-+".indexOf(e.target.textContent) !== -1 ))            {
                this.setState((state)=>{
                    return {

                    upperScreenValue: state.upperScreenValue.concat(e.target.textContent),
                    wasEqualPressed: "" 
                    }
                })
            } else if ((this.state.wasEqualPressed === "=") && ( ".0123456789".indexOf(e.target.textContent) !== -1 )) {

                this.setState((state)=>{
                    return {

                    upperScreenValue: e.target.textContent,
                    arrayOfExpresion: [],
                    wasEqualPressed: "" 
                    }
                })
            }else {

                this.setState ((state)=>{ 
                    return {
                        upperScreenValue: state.upperScreenValue.concat(e.target.textContent),
                    } 
                }  );
            }

        }


        // console.log("state=", state);
    }




    handleLowerDisplay(e){
        // this.setState({input: event.target.value}); 
        // console.log("You clicked ",e.target.textContent);
        // this.setState( {upperScreenValue: e.target.value  } );
        //console.log("state=", state);
        // console.log(e.target.textContent);

        
        // Reset the lowerScreenValue if user inputs numbers just after a calculation
       // console.log("---");
       // console.log("e.target.textContent=", e.target.textContent);
       // if ( (".0123456789".indexOf(e.target.textContent) !== -1 ) && (this.state.wasEqualPressed === true) ){
       //     // Then it meas that the user just started pressing numbers after a calculation was made 
       //     // Reset the lowerScreenValue 
       //    console.log("touch"); 
       //     this.setState((state)=>{
       //         return {
       //             lowerScreenValue: "foo",
       //             wasEqualPressed: false
       //         }
       //     });

       //     this.forceUpdate();

       // }

        // Handle the edge case where multiple dots .. are not alowed in a number
        if( (e.target.textContent === ".") && (this.state.lowerScreenValue.indexOf(".") !== -1) ){

            // this.setState ((state)=>{ return state }  ); 
            //console.log("e.target.textContent=", e.target.textContent);
            this.setState ((state)=>{ return state }  );


        } else  if (this.state.initialization === true) {
         // This code handles the initial state of zero when the calculator starts
        //  This is the first operand in the series of calculations


            // If I press minus once at the begining of the expresion
            // then it is a negative number 
            //
            this.setState ((state)=>{
                return {
                    lowerScreenValue: e.target.textContent,
                    currentOperand: e.target.textContent,
                    countOperators: 0,
                    initialization: false
                }


            }  );


            if (e.target.textContent === "-"){
                this.setState((state)=>{
                    return { negativeOperand: true }
                });
            }


        } else if( (e.target.textContent !== "=") &&
            (e.target.textContent !== "+") &&
            (e.target.textContent !== "-") &&
            (e.target.textContent !== "*") &&
            (e.target.textContent !== "/") ) {
            // At this point means that the user pressed only numbers or dot

            // if the lower screen has an operator
            // then overwrite it 
            // else just concatenate number to the lowerscreen 
            //
            
            // If the equal was pressed before that means a calculation was made 
            // Therefore reset the lowerScreenValue to an empty string 
          /*
            if (this.state.wasEqualPressed === true){
                this.setState((state)=>{
                    console.log("touch it");
                    return { 
                    lowerScreenValue: "foo",
                    wasEqualPressed: false
                    }
                });
            }
        */
            // Deal with multiple zeroes "0" or "000" scenaries
            // Don't allow the user to insert more than one zero 
            if ((this.state.lowerScreenValue === "0") && (e.target.textContent === "0")){
                // Do nothing just exit the function 
                return undefined;
            }

            if ( (this.state.lowerScreenValue === "=") ||
                ( this.state.lowerScreenValue === "+") ||
                ( this.state.lowerScreenValue === "-") ||
                ( this.state.lowerScreenValue === "*") ||
                ( this.state.lowerScreenValue === "/") ) {

                this.setState((state)=>{
                    return {
                        lowerScreenValue: e.target.textContent,
                        currentOperand: e.target.textContent,
                        countOperators: 0
                    }
                });
            } else {

                // console.log("here you didn't press an operator")



            
                
                // Check if the character added to the lower string is a "." 


                // If the lowerScreenValue has a dot then let know the upperScreenValue that the float dot 
                // was used by turing wasTheFloatDotUsed to true 
                if (e.target.textContent === ".") {
                    this.setState ((state)=>{
                        return {
                            wasTheFloatDotUsed: true 
                        }
                    });
                }

                
                if (this.state.wasEqualPressed === "="){
                this.setState( (state)=>{
                    return { 
                        lowerScreenValue: e.target.textContent,
                        currentOperand: e.target.textContent,
                        countOperators: 0,
                        wasEqualPressed: ""
                    }; 
                } );

                }else {
                this.setState( (state)=>{
                    return { 
                        lowerScreenValue: this.state.lowerScreenValue.concat(e.target.textContent),
                        currentOperand: this.state.lowerScreenValue.concat(e.target.textContent),
                        countOperators: 0
                    }; 
                } );

                }


            }



        } else {
            // You pressed an operator such as "= / * - +"

            // console.log("You pressed and operator like +-*/");
            // When I press an operator I will increase the array index 
            // let tempArrayIndex = state.arrayIndex + 1;

            // When I press an operator the first thing I will add
            // the currentOperand to the arrayOfExpresion


            //Reset the wasTheFloatDotUsed in lowerScreenValue flag
            this.setState((state)=>{
                return {
                wasTheFloatDotUsed: false
                }
            });


            let tempOperator = e.target.textContent;
            let tempArray;

            tempArray = this.state.arrayOfExpresion;
           // console.log("tempArray=", tempArray);
           // console.log("this.state.arrayOfExpresion=", this.state.arrayOfExpresion);


            // When an operator is pressed reset the wasTheFloatDotUsed flag back to false 
            this.setState((state)=>{
                return {
                    wasTheFloatDotUsed: false
                }
            });


            // When I have `1--2=` I want it to become  ` 1 - -2 = ` 
            // When I have `1*-2=` I want it to become  ` 1 * -2 = ` 
            // When I have `1 /*+-2` I want it to becom ` 1 + -2 = `
            // When I have `1 /+-*2` I want it to becom ` 1 * 2 = `

            // How do I do that?
            // If negativeOperand === true 
            // Then concat `-` to the operand
            // And the negativeOperand = false


            // If countOperators >= 1 and pressed `-` at the end
            // Then negativeOperand = true





            //               if (tempOperator === "-"){
            //                   this.setState( (state)=>{ return {countMinus: state.countMinus + 1 } }  );
            //                   console.log("this.state.countMinus:", this.state.countMinus);
            //               }
            //
            if ( (this.state.currentOperand !== "=") &&
                ( this.state.currentOperand !== "+") &&
                ( this.state.currentOperand !== "-") &&
                ( this.state.currentOperand  !== "*") &&
                ( this.state.currentOperand !== "/") ){

                // Concatenate a "-" sign to the number if negativeOperand is true 
                if (this.state.countOperators === 0) {
                    if (this.state.negativeOperand ===  true){
                        tempArray.push( "-" + this.state.currentOperand);
                        this.setState((state)=>{return {negativeOperand: false}});
                    } else if (this.state.currentOperand.length !== 0)   {
                        tempArray.push(  this.state.currentOperand);
                        // Reset the currentOperand to empty 
                        this.setState( (state)=>{ return {currentOperand: ""  }  });
                        // console.log("this.state.currentOperand=", this.state.currentOperand);
                        //this.setState((state)=>{return {countMinus: 0}});
                    }
                }

            } else if ( ( this.state.countOperators !== 0) && (this.state.negativeOperand === true ) ) {
                tempArray.push( "-" + this.state.currentOperand);
                this.setState((state)=>{return {negativeOperand: false }});

            }

            // If it is not the first operator
            // then if the tempOperator != minus
            //      then overwrite the last operator
            //      else If previous operator is 
            // else just add the operator to the arrayOfExpresion 
            //


            // If countOperators >= 1 and pressed `-` at the end
            // Then negativeOperand = true


            if (this.state.countOperators !== 0){
                if (tempOperator === "-") {
                    this.setState( (state)=>{return {negativeOperand: true} }  );
                } else {
                    // Always add the last operator pressed to the array 
                    if (tempArray.length == 1){

                        tempArray.push(tempOperator);
                    } else {

                        tempArray[ tempArray.length - 1 ] = tempOperator;
                    }
                    
                    this.setState( (state)=>{return {negativeOperand: false} }  );
                }
            } else {
                // Only push an operator if the countMinus is less or equal 1 
                // which means that the minus was pressed once before 
                tempArray.push(tempOperator);
            }

            // Only count operators if the operators is not "-" spceial character...
            let tempCountOperators = this.state.countOperators ;
            tempCountOperators ++;
            
           // console.log("this.state.upperScreenValue", this.state.upperScreenValue);
           // console.log("tempArray=", tempArray);
            //tempArray.push(state.currentOperand);


            this.setState ((state)=>{ 

                return { 
                    lowerScreenValue:  e.target.textContent,
                    lastOperator: e.target.textContent,
                    arrayOfExpresion: tempArray,
                    countOperators: tempCountOperators
                };

            }  );

        }






     // console.log("this.state.upperScreenValue", this.state.upperScreenValue);
     // console.log("this.state.lowerScreenValue", this.state.lowerScreenValue);

        // console.log("state=", state);
    }




    handleButtonPress(e){

        this.setState((state)=>{return {wasEqualPressed: e.target.textContent }});

        //console.log("this.state.wasEqualPressed=", this.state.wasEqualPressed);
            this.handleUpperDisplay(e);
            this.handleLowerDisplay(e);
            if (e.target.textContent === "="){
                this.handleCalculateTotal();

                // Kepp thrack of when the equal is pressed 
                this.setState( (state)=>{
                    return {
                        wasEqualPressed: "="
                    }
                });


            }
           console.log("this.state.arrayOfExpresion=",this.state.arrayOfExpresion);
           console.log("this.state.upperScreenValue=", this.state.upperScreenValue);
           console.log("this.state.lowerScreenValue=", this.state.lowerScreenValue);
           console.log("e.target.textContent=", e.target.textContent);
           console.log("-----------");
        

    }


    calculateTotal (firstOperand, operator, secondOperand){
        // TODO I need to check of the string has a `.` if so 
        // then I will parse it as a float not as an integer...
        firstOperand = parseInt(firstOperand);
        secondOperand = parseInt(secondOperand);
        let total = 0;

        // console.log("firstOperand=", firstOperand);
        //console.log("secondOperand=", secondOperand);

        switch (operator){
            case "+":
                total = firstOperand + secondOperand;
                break;

            case "-":
                total = firstOperand - secondOperand;
                break;   


            case "*":
                total = firstOperand * secondOperand;
                break;

            case "/":
                total = firstOperand / secondOperand;
                break;   
        }

        this.setState ((state)=>{
            // console.log("total=", total);
            return {
                firstOperand: total
            }
        }  );

    }

//This function will parse an array similar to [ "10", "-", "-2.42", "=" ]
// And will output the calculation after looping through such an array...

    handleCalculateTotal(){
        let total = 0;
        let operand = 0;
        let operator = "+";

        let tempArray = this.state.arrayOfExpresion;

        for (let i=0; i<tempArray.length; i++){
            // console.log ("i=", i);
            // Test if the item is an operator
            // Set the operator     
            switch (tempArray[i] ){
                case "+":
                    operator = "+";
                    break;

                case "-":
                    operator = "-";
                    break;   


                case "*":
                    operator = "*";
                    break;

                case "/":
                    operator = "/";
                    break; 
                case "=":
                    operator = "=";
                    break;
                default:

                    // Test if the item is a number 
                    // Make sure to check for float or integer 
                    if (tempArray[i].indexOf(".") !== -1 ) {
                        // Then this is a float 
                        operand = parseFloat(tempArray[i]);
                    } else {
                        // Else it is a integer 
                        operand = parseInt(tempArray[i]);
                    }

                    break;


            }
            

            // Do the calculation
            // Test if the i-th element is a number or not
            if (Number.isNaN( Number( tempArray[i] )  ) ){
                // It is not a number 
                // console.log("Not a number")
            } else {
                // It is a number 
            switch ( operator ){
                case "+":
                    total = total + operand;
                    break;

                case "-":
                    total = total - operand;
                    break;   


                case "*":
                    total = total * operand;
                    break;

                case "/":
                    total = total / operand;
                    break; 
                case "=":
                    total = total;
                    break;
                default:
                    break;


            }

            }

            // console.log("operand=", operand);
            // console.log("operator=", operator);
            // console.log("total=", total);
            // console.log(" Number.isNaN( Number( tempArray[i] )  )  ", Number.isNaN( Number( tempArray[i] )  )    )
        } 

        // Print the total
       // console.log("total=", total);
        let totalString = total.toString();
        let tempArrayOfExpresion = [];
        tempArrayOfExpresion.push(totalString);
        //console.log("tempArrayOfExpresion=", tempArrayOfExpresion);

        this.setState ((state)=>{ 
            return {
                upperScreenValue: state.upperScreenValue.concat(totalString),
                lowerScreenValue: totalString,
                arrayOfExpresion: [...tempArrayOfExpresion]
            } 
        }
            , 
                    ()=>{
                
               // console.log("this.state.arrayOfExpresion = ",this.state.arrayOfExpresion );
            }
        );

        //this.forceUpdate();
        // TODO REACT DOESN'T UPDATE MY arrayOfExpresion ARRAY AND BECAUSE OF THAT I HAVE A BUNCH OF WEIRD BUGS 
        // I TRYED TO USE this.forceUpdate TO FORCE AN UPDATE
        // BUT REACT IS STUBBERN AS USUAL !!!

    //console.log("this.state.arrayOfExpresion = ",this.state.arrayOfExpresion );
    }



    displayTotal(){
        //console.log("displayTotal called");
        this.setState((state)=>{
            return {
                lowerScreenValue: this.state.firstOperand
            }
        });
    }





    render(){
        return (
            <div className="calculator">
            <div id="bothDisplays">
            <div id="upperDisplay">{this.state.upperScreenValue}</div>
            <div id="display">{this.state.lowerScreenValue}</div>
            </div>

            <div id="clear" onClick={this.handleClearPress} >AC</div>
            <div id="divide" onClick={this.handleButtonPress}>/</div>
            <div id="multiply" onClick={this.handleButtonPress}>*</div>
            <div id="subtract" onClick={this.handleButtonPress}>-</div>
            <div id="add" onClick={this.handleButtonPress}>+</div>
            <div id="equals" onClick={this.handleButtonPress }>=</div>
            <div id="seven" onClick={this.handleButtonPress}>7</div>
            <div id="eight" onClick={this.handleButtonPress}>8</div>
            <div id="nine" onClick={this.handleButtonPress}>9</div>
            <div id="four" onClick={this.handleButtonPress}>4</div>
            <div id="five" onClick={this.handleButtonPress}>5</div>
            <div id="six" onClick={this.handleButtonPress}>6</div>
            <div id="one" onClick={this.handleButtonPress}>1</div>
            <div id="two" onClick={this.handleButtonPress}>2</div>
            <div id="three" onClick={this.handleButtonPress}>3</div>
            <div id="zero" onClick={this.handleButtonPress}>0</div>
            <div id="decimal" onClick={this.handleButtonPress}>.</div>
            </div>
        );
    }

}











export default Calculator;





