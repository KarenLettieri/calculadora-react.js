import AllButtons from "./AllButtons";
import Button from "./Button";
import CalculatorScreen from "./CalculatorScreen";
import CalculatorState from "./calculatorState";
import './calculator.css'

export default function Calculator() {
    return(
        <div className="backgroundCalculator">
        <CalculatorState> 
        <div className="calculatorContainer"> 
        <CalculatorScreen/>
        <AllButtons/>
        </div>
        </CalculatorState>

        </div>
    )
}