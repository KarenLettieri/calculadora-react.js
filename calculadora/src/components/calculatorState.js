import {createContext} from 'react';
import { useState, useContext } from 'react';

const AppContext = createContext({
    /*state*/
memory: null,
operation: null,
currentValue: 0,

/* methods */
addNumber: (value) => {},
addOperation: (operation) => {},
getResult: () => {},
executeAction: (action) => {},
});



export default function CalculatorState({children}) {

    const [memory, setMemory] = useState(null);
    const [operation, setOperation] = useState(null);
    const [currentValue, setCurrentValue] = useState(0);
    const [isReset, setIsReset] = useState(true);

    function handleAddNumber(value) {
        if(isReset) {
            setCurrentValue(parseInt(value));
            setIsReset(false);

        } else {
            const newValue = currentValue.toString() + value;
            setCurrentValue(parseFloat(newValue))
        }

    }

    function handleAddOperation(op){
        if(currentValue){
            if(operation) {
                // TODO: Resolver
                handleGetResult();
                setOperation(op);

            } else {
                setOperation(op);
                setMemory(currentValue);
                setCurrentValue(0);
                setIsReset(true);
            }
        }

    }

    function handleGetResult() {

        let result = 0;

        if(currentValue && operation && memory ) {
            switch(operation) {
                case "+":
                    result = parseFloat(currentValue) + parseFloat(memory);
                    break;
            
                case "-":
                    result = parseFloat(memory) - parseFloat(currentValue);
                    break;

                case "*":
                    result = parseFloat(currentValue) * parseFloat(memory);
                    break;

                    case "/":
                result = parseFloat(memory) / parseFloat(currentValue);
                break;

                case "%":
                result = parseFloat(memory) / 100 * parseFloat(currentValue);
                break;

                    default:
            }

            setCurrentValue(result);
            setOperation(null);
            setMemory(result);
            setIsReset(true);
        }

    }


    function clean() {
        setCurrentValue(0);
        setOperation(null);
        setMemory(0);
        setIsReset(true);

    }

    function deleteNumber(){
        setCurrentValue(parseInt(currentValue/10));
    }

    function changeSign() {
        setCurrentValue(currentValue * -1)
    }

    function convertToFloat() {
        if(currentValue.toString().indexOf('.') > 0) {
            //el numero ya es flotante
        } else {
            handleAddNumber('.');
        }
    }

    function handleExecuteAction(action) {
        switch(action) {

            case "=":
                handleGetResult();
                break;
            
            case "AC":
            clean();
            break;

            case "<==":
                deleteNumber();
                break;

            case "+/-":
                changeSign();
                break;

            case ".":
                convertToFloat();
                break;

                default:
        }


    }

    return (
    <AppContext.Provider
        value={{
        memory,
        operation,
        currentValue,
        addNumber: handleAddNumber,
        addOperation: handleAddOperation,
        getResult: handleGetResult,
        executeAction : handleExecuteAction, 
        }}
    >
        {children}
    </AppContext.Provider>
    );
        
    
}

export function useAppContext() {
    return useContext(AppContext);
}