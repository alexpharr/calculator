import React from "react";
import ReactDOM from 'react-dom/client';
import { useState, useEffect } from "react";
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { evaluate } from "mathjs";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";

const OPERATOR = ['/', '*', '-', '+'];

const Display = (props) => { return <Card>{props.value}</Card> }

const Calculator = () => {
    const [display, setDisplay] = useState('0');
    const [result, setResult] = useState(0);

    const addToDisplay = (value) => {
        // Don't allow input to start with multiple zeros
        if (display === '0' === value) return;

        let newDisplay = (display === '0') ? value : display + value;

        if (value === '.' && display === '0') {
            newDisplay = '0.'
        }

        if (value === '+' && OPERATOR.includes(display.slice(-1))) {
            console.log('test');
            newDisplay = display.slice(0, -1) + value;
        }

        try {
            setResult(evaluate(newDisplay));
            setDisplay(newDisplay);
        } catch (error) {
            
            console.log(error.char);

            // Error ignored when error is beyond the length of the display. For example 2* or 55/
            if (error.char === newDisplay.length + 1) {
                setDisplay(newDisplay);
                return;
            }

            // When two operators are entered, the last operator entered should be shown
            if (OPERATOR.includes(newDisplay[error.char - 1])) {
                newDisplay = display.slice(0, -1) + value;
                setDisplay(newDisplay);
            }

            return;
        }
    }

    return (
        <Container>
            <Row><Display id="display" value={display} /></Row>
            <Row>
                <div>
                    <Button id="clear" onClick={() => setDisplay('0')}>AC</Button>
                    <Button onClick={() => addToDisplay('/')}>/</Button>
                    <Button onClick={() => addToDisplay('*')}>X</Button>
                </div>
            </Row>
            <Row>
                <div>
                    <Button id="seven" onClick={() => addToDisplay('7')}>7</Button>
                    <Button id="eight" onClick={() => addToDisplay('8')}>8</Button>
                    <Button id="nine" onClick={() => addToDisplay('9')}>9</Button>
                    <Button id="subtract" onClick={() => addToDisplay('-')}>-</Button>
                </div>
            </Row>
            <Row>
                <div>
                    <Button id="four" onClick={() => addToDisplay('4')}>4</Button>
                    <Button id="five" onClick={() => addToDisplay('5')}>5</Button>
                    <Button id="six" onClick={() => addToDisplay('6')}>6</Button>
                    <Button id="add" onClick={() => addToDisplay('+')}>+</Button>
                </div>
            </Row>
            <Row>
                <div>
                    <Button id="one" onClick={() => addToDisplay('1')}>1</Button>
                    <Button id="two" onClick={() => addToDisplay('2')}>2</Button>
                    <Button id="three" onClick={() => addToDisplay('3')}>3</Button>
                    <Button>Test</Button>
                </div>
            </Row>
            <Row>
                <div>
                    <Button id="zero" onClick={() => addToDisplay('0')}>0</Button>
                    <Button id="decimal" onClick={() => addToDisplay('.')}>.</Button>
                    <Button id="equals" onClick={() => setDisplay(result)}>=</Button>
                    <Button>Test</Button>
                </div>
            </Row>
        </Container>
    );
}


// At any time, pressing the clear button clears the input and output values, and returns the calculator to its initialized state; 0 should be shown in the element with the id of display.

// As I input numbers, I should be able to see my input in the element with the id of display.

// In any order, I should be able to add, subtract, multiply and divide a chain of numbers of any length, and when I hit =, the correct result should be shown in the element with the id of display.

// When inputting numbers, my calculator should not allow a number to begin with multiple zeros.

// When the decimal element is clicked, a . should append to the currently displayed value; two . in one number should not be accepted.

// I should be able to perform any operation (+, -, *, /) on numbers containing decimal points.

// If 2 or more operators are entered consecutively, the operation performed should be the last operator entered (excluding the negative (-) sign). For example, if 5 + * 7 = is entered, the result should be 35 (i.e. 5 * 7); if 5 * - 5 = is entered, the result should be -25 (i.e. 5 * (-5)).

// Pressing an operator immediately following = should start a new calculation that operates on the result of the previous evaluation.

// My calculator should have several decimal places of precision when it comes to rounding (note that there is no exact standard, but you should be able to handle calculations like 2 / 7 with reasonable precision to at least 4 decimal places).

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Calculator />);