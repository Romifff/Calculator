import React from 'https://esm.sh/react@18.2.0';
import ReactDOM from 'https://esm.sh/react-dom@18.2.0';

const digits = [
{
  digitNumber: '7',
  identifier: "seven" },

{
  digitNumber: '8',
  identifier: "eight" },

{
  digitNumber: '9',
  identifier: "nine" },

{
  digitNumber: '4',
  identifier: "four" },

{
  digitNumber: '5',
  identifier: "five" },

{
  digitNumber: '6',
  identifier: "six" },

{
  digitNumber: '1',
  identifier: "one" },

{
  digitNumber: '2',
  identifier: "two" },

{
  digitNumber: '3',
  identifier: "three" },

{
  digitNumber: ".",
  identifier: "decimal" },

{
  digitNumber: '0',
  identifier: "zero" }];



const operators = [
{
  operatorSign: '+',
  operatorId: 'add' },

{
  operatorSign: '-',
  operatorId: 'subtract' },

{
  operatorSign: 'x',
  operatorId: 'multiply' },

{
  operatorSign: '/',
  operatorId: 'divide' }];



const OperatorsKeyboard = ({ handleOperatorInput }) => {
  return operators.map(operator => {
    return /*#__PURE__*/(
      React.createElement("button", { key: operator.operatorId, id: operator.operatorId, onClick: () => handleOperatorInput(operator.operatorSign) }, operator.operatorSign));

  });
};


const DigitsKeyboard = ({ handleNumberInput }) => {
  return (

    digits.map((digit) => /*#__PURE__*/
    React.createElement("button", { key: digit.identifier, id: digit.identifier, onClick: () => handleNumberInput(digit.digitNumber) },
    digit.digitNumber)));





};



const Equals = ({ compute }) => {
  return /*#__PURE__*/React.createElement("button", { id: "equals", onClick: () => compute() }, "=");
};

const Clear = ({ handleClear }) => {
  return /*#__PURE__*/React.createElement("button", { id: "clear", onClick: handleClear }, "AC");
};

const Display = ({ display }) => {
  return /*#__PURE__*/React.createElement("h2", { id: "display" }, display);
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

  const handleNumberInput = value => {
    let dotRegex = /\./;
    if (dotRegex.test(NumberInput) && value === ".") {
      setNumberInput(NumberInput);
    } else {
      setNumberInput(NumberInput + value);
      let newInput = input + value;
      newInput = newInput.replace(/^[0]+/, "");
      setInput(newInput);
    }
  };


  const handleOperatorInput = value => {
    setInput(input + value);
    setNumberInput("");
  };




  const compute = () => {
    let equation = input.
    replace(/x/g, '*').
    match(/(\*|\+|\/|-)?(\.|\-)?\d+/g).join('');
    let result = eval(equation);
    let dotString = /\./;
    if (dotString.test(result)) {
      if (result.toString().split('.')[1].length >= 4) {
        result = result.toFixed(4);
      }
    }
    setInput("");
    setDisplay(result);
    setInput(result);
  };



  return /*#__PURE__*/(
    React.createElement("div", { id: "calculator" }, /*#__PURE__*/
    React.createElement("div", { className: "wrapper" }, /*#__PURE__*/
    React.createElement("div", { className: "display" }, /*#__PURE__*/
    React.createElement(Display, { display: input || display })), /*#__PURE__*/

    React.createElement("div", { className: "keyboardWrapper" }, /*#__PURE__*/
    React.createElement("div", { className: "numbersWrapper" }, /*#__PURE__*/
    React.createElement(DigitsKeyboard, { handleNumberInput: handleNumberInput }), /*#__PURE__*/
    React.createElement(Clear, { handleClear: handleClear })), /*#__PURE__*/

    React.createElement("div", { className: "operators" }, /*#__PURE__*/
    React.createElement(OperatorsKeyboard, { handleOperatorInput: handleOperatorInput }), /*#__PURE__*/
    React.createElement(Equals, { compute: compute }))))));





};


ReactDOM.render( /*#__PURE__*/
React.createElement(App, null),
document.getElementById("root"));