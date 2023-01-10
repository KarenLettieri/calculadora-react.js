import AllButtons from "./AllButtons";
import Button from "./Button";
import CalculatorScreen from "./CalculatorScreen";
import CalculatorState from "./calculatorState";

export default function Calculator() {
    return(
        <CalculatorState> 
        <div className="calculatorContainer"> 
        <CalculatorScreen/>
        <AllButtons/>
        </div>
        </CalculatorState>
    )
}