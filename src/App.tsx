import React from 'react';
import './App.css';

function App() {

  const [firstNumber, setFirstNumber] = React.useState("0");
  const [secondNumber, setSecondNumber] = React.useState("");
  const [operator, setOperator] = React.useState("");

  const display = firstNumber + operator + secondNumber;
  const displaysZero = display === "0";
  const hasOperator = operator !== "";

  // const calculate = React.useCallback((a: number, b: number) => {
  //   switch (operator) {
  //     case "+": return a + b;
  //     case "-": return a - b;
  //     case "×": return a * b;
  //     case "÷" : return a / b;
  //     default: return null;
  //   }
  // }, [operator]);

  React.useEffect(() => {
    document.addEventListener("keyup", handleKeyboard);
    return () => {
      document.removeEventListener("keyup", handleKeyboard);
    }
  }, [firstNumber, secondNumber, operator]);

  function handleKeyboard(event: KeyboardEvent) {
    const key = event.key;

    switch (key) {
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        numberPressed(parseInt(key));
        break;

      case ".":
        decimalPressed();
        break;

      case "+":
      case "-":
      case "*":
      case "/":
        operatorPressed(key);
        break;

      case "Backspace":
        clearPressed();
        break;

      case "Enter":
        enterPressed();
        break;

      default:
        return;
    }
  }

  function handleButton(event: React.MouseEvent) {
    const target = event.target;
    if (!(target instanceof HTMLButtonElement)) return;

    const id = target.dataset.id;
    if (id === undefined) return;

    switch (id) {
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        numberPressed(parseInt(id));
        break;

      case "decimal":
        decimalPressed();
        break;

      case "plus":
      case "minus":
      case "multiply":
      case "divide":
        operatorPressed(id);
        break;

      case "clear":
        clearPressed();
        break;

      case "enter":
        enterPressed();
        break;
      
      default:
        break;
    }
  }

  function numberPressed(value: number) {
    if (displaysZero && value === 0) {
      return;
    }

    if (displaysZero) {
      setFirstNumber(value.toString());
      return;
    }

    if (!hasOperator) {
      setFirstNumber(firstNumber + value.toString());
      return;
    }

    if (secondNumber !== "0") {
      setSecondNumber(secondNumber + value.toString());
      return;
    }
  }
  
  function decimalPressed() {
    if (!firstNumber.includes(".") && !hasOperator) {
      setFirstNumber(firstNumber + ".");
      return;
    }

    if (!secondNumber.includes(".") && hasOperator) {
      setSecondNumber(secondNumber + ".");
      return
    }
  }

  function operatorPressed(op: string) {
    let symbol: string | undefined;

    switch (op) {
      case "plus":
      case "+":
        symbol = "+";
        break;

      case "minus":
      case "-":
        symbol = "-";
        break;

      case "multiply":
      case "*":
        symbol = "×";
        break;

      case "divide":
      case "/":
        symbol = "÷";
        break;

      default:
        break;
    }

    if (symbol !== undefined) {
      setOperator(symbol);
    }
  }

  function clearPressed() {
    setFirstNumber("0");
    setOperator("");
    setSecondNumber("");
  }

  function enterPressed() {
    const first = parseFloat(firstNumber);
    const second = parseFloat(secondNumber);

    if (isNaN(first) || isNaN(second)) return;

    // const result = calculate(first, second);
    // if (result === null) return;
    
    switch (operator) {
      case "+":
        setFirstNumber((first + second).toString());
        break;

      case "-":
        setFirstNumber((first - second).toString());
        break;

      case "×":
        setFirstNumber((first * second).toString());
        break;

      case "÷":
        setFirstNumber((first / second).toString());
        break;

      default:
        break;
    }

    // setFirstNumber(result.toString());
    setOperator("");
    setSecondNumber("");
  }

  return (
    <div className="calc">
      <div className="calc-display"> {display} </div>
      <div className="calc-keyboard" onClick={handleButton}>
        <button className="calc-btn calc-btn-clear" data-id="clear">AC</button>
        <button className="calc-btn calc-btn-enter" data-id="enter">=</button>
        <button className="calc-btn" data-id="7">7</button>
        <button className="calc-btn" data-id="8">8</button>
        <button className="calc-btn" data-id="9">9</button>
        <button className="calc-btn calc-btn-operator" data-id="divide">÷</button>
        <button className="calc-btn" data-id="4">4</button>
        <button className="calc-btn" data-id="5">5</button>
        <button className="calc-btn" data-id="6">6</button>
        <button className="calc-btn calc-btn-operator" data-id="multiply">&times;</button>
        <button className="calc-btn" data-id="1">1</button>
        <button className="calc-btn" data-id="2">2</button>
        <button className="calc-btn" data-id="3">3</button>
        <button className="calc-btn calc-btn-operator" data-id="minus">-</button>
        <button className="calc-btn calc-btn-zero" data-id="0">0</button>
        <button className="calc-btn" data-id="decimal">.</button>
        <button className="calc-btn calc-btn-operator" data-id="plus">+</button>
      </div>
    </div>
  );
}

export default App;
