   ffffffffffhandleButtonPress (e){
        // this.setState({input: event.target.value}); 
        console.log("You clicked ",e.target.textContent);
        // this.setState( {upperScreenValue: e.target.value  } );
        this.setState( (state)=>{
            //console.log("state=", state);
            // console.log(e.target.textContent);
        
            // Handle the edge case where multiple dots .. are not alowed in a number
            if( (e.target.textContent===".") && (state.upperScreenValue.indexOf(".") != -1) ){
                return state;
            }


            if (state.upperScreenValue === "0"){
                return {
                    upperScreenValue: e.target.textContent,
                    lowerScreenValue: e.target.textContent
                }

            } else {

                return {
                    upperScreenValue: state.upperScreenValue.concat(e.target.textContent),
                    lowerScreenValue: e.target.textContent
                }
            }


            // console.log("state=", state);
        });
    }
