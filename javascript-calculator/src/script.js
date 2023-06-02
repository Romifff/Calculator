import React from 'https://esm.sh/react@18.2.0'
import ReactDOM from 'https://esm.sh/react-dom@18.2.0'

const digits = [
  {
    digitNumber: '7',
    identifier: "seven"
  },
  {
    digitNumber: '8',
    identifier: "eight"
  },
  {
    digitNumber: '9',
    identifier: "nine"
  },
  {
    digitNumber: '4',
    identifier: "four"
  },
  {
    digitNumber: '5',
    identifier: "five"
  },
  {
    digitNumber: '6',
    identifier: "six"
  },
  {
    digitNumber: '1',
    identifier: "one"
  },
  {
    digitNumber: '2',
    identifier: "two"
  },
  {
    digitNumber: '3',
    identifier: "three"
  },
  {
    digitNumber: ".",
    identifier: "decimal"
  },
  {
    digitNumber: '0',
    identifier: "zero"
  }
];

const operators = [
  {
    operatorSign: '+',
    operatorId: 'add'
  },
  {
    operatorSign: '-',
    operatorId: 'subtract'
  },
  {
    operatorSign: 'x',
    operatorId: 'multiply'
  },
  {
    operatorSign: '/',
    operatorId: 'divide'
  }
]

const OperatorsKeyboard = ({ handleOperatorInput }) => {
  return operators.map(operator => {
    return (
    <button key={operator.operatorId} id={operator.operatorId} onClick = {() => handleOperatorInput(operator.operatorSign)}>{operator.operatorSign}</button>
    );
  })
}


const DigitsKeyboard = ({ handleNumberInput }) => {
  return (
    
      digits.map(digit => (
      <button key={digit.identifier} id={digit.identifier} onClick={() => handleNumberInput(digit.digitNumber)}>
        {digit.digitNumber}
      </button>
     )
   )
   
 );  
};



const Equals = ({ compute }) => {
  return <button id = "equals" onClick = {() => compute()}>=</button>
};

const Clear = ({ handleClear }) => {
  return <button id = "clear" onClick={handleClear}>AC</button>
};

const Display = ({ display }) => {
  return <h2 id = "display">{display}</h2> 
 };

const App = () => {
  const [NumberInput, setNumberInput] = React.useState('');
  const [input, setInput] = React.useState('');
  const [result, setResult] = React.useState(0);
  const [display, setDisplay] = React.useState(0);
  
  const handleClear = () => {
  setDisplay(0);
  setInput('');
  setNumberInput('');
};
  
  const handleNumberInput = (value) => {
    let dotRegex = /\./;
    if(dotRegex.test(NumberInput) && value === "." ) {
      setNumberInput(NumberInput);
      } else {
     setNumberInput(NumberInput + value);
     let newInput = input+ value;
     newInput = newInput.replace(/^[0]+/, "");
     setInput(newInput);
     }
  }
  
  
  const handleOperatorInput = (value) => {
     setInput(input + value);
     setNumberInput("");
  }
  

  
  
  const compute = () => {
    let equation = input
    .replace(/x/g, '*')
    .match(/(\*|\+|\/|-)?(\.|\-)?\d+/g).join('');
   let result = eval(equation)
   let dotString = (/\./);
   if(dotString.test(result)) {
     if(result.toString().split('.')[1].length >= 4) {
     result = result.toFixed(4);
     }
   }
   setInput("");
   setDisplay(result);
   setInput(result);
};
 
  
  
  return (
   <div id="calculator">
     <div className = "wrapper">
      <div className = "display">
      <Display display={input || display}/>
      </div>
      <div className = "keyboardWrapper">
        <div className = "numbersWrapper">
          <DigitsKeyboard handleNumberInput={handleNumberInput}/>
          <Clear handleClear={handleClear}/>
        </div>
        <div className="operators">
         <OperatorsKeyboard handleOperatorInput={handleOperatorInput}/>
         <Equals compute={compute} />
       </div>
     </div>
    </div>
  </div>
  );
};


ReactDOM.render(
  <App />,
  document.getElementById("root")
 )