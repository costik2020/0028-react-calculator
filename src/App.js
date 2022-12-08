import './css/main.css';
import Calculator from "./components/Calculator.js";


function App() {
  return (
	  <div className="app">
		  <Calculator />
	  </div>
	  


  );
}


console.log("foo");


// Implement dinamic styling...
// Select all the buttons 
//document.querySelector(".matrix");
let buttons = document.querySelectorAll(".button");

console.log("buttons=", buttons);






export default App;
