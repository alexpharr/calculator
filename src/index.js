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


const Display = () => { return <Card>Test</Card> }

const Calculator = () => {
    const [display, setDisplay] = useState('0');
    const [result, setResult] = useState(0);

    const addToDisplay = (value) => {
        // Don't allow input to start with multiple zeros
        if (display === '0' === value) return;

        const newDisplay = (display === '0') ? value : display + value;

        try {
            setResult(evaluate(newDisplay));
            setDisplay(newDisplay);
        } catch (error) {
            // Error thrown when expression ends in single operator, ex. "250*" or "5/"
            if (error.char > display.length) setDisplay(newDisplay);
            return;
        }
    }

    return (
        <Container>
            <Row><Display id="display" /></Row>
            <Row>
                <div>
                    <Button id="clear" onClick={() => setDisplay('0')}>AC</Button>
                    <Button>/</Button>
                    <Button>X</Button>
                </div>
            </Row>
            <Row>
                <div>
                    <Button id="seven">7</Button>
                    <Button id="eight">8</Button>
                    <Button id="nine">9</Button>
                    <Button id="subtract">-</Button>
                </div>
            </Row>
            <Row>
                <div>
                    <Button id="four">4</Button>
                    <Button id="five">5</Button>
                    <Button id="six">6</Button>
                    <Button id="add">+</Button>
                </div>
            </Row>
            <Row>
                <div>
                    <Button id="one">1</Button>
                    <Button id="two">2</Button>
                    <Button id="three">3</Button>
                    <Button>Test</Button>
                </div>
            </Row>
            <Row>
                <div>
                    <Button id="zero">0</Button>
                    <Button id="decimal">.</Button>
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