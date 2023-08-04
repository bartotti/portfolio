import React, { use, useState } from "react";
import * as math from "mathjs";
import NavBar from "../NavBar";
import Footer from "./Footer";

const Calculator = () => {
  const [totalAmount, setTotalAmount] = useState("");
  const [tipPercentage, setTipPercentage] = useState(15);
  const [guestNumber, setGuestNumber] = useState(1);
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");

  /* tip section */
  const handleTotalAmountChange = event => {
    setTotalAmount(event.target.value);
  };

  const handleTipPercentageChange = event => {
    setTipPercentage(parseInt(event.target.value));
  };

  const handleGuestNumberChange = event => {
    setGuestNumber(parseInt(event.target.value));
  };

  const calculateTipAmount = () => {
    const tipAmount = (totalAmount * tipPercentage) / 100;
    const totalTipAdded = parseFloat(totalAmount) + tipAmount;
    const totalAmountAfterSplit = parseFloat(totalTipAdded / guestNumber);
    return [
      tipAmount.toFixed(2),
      totalTipAdded.toFixed(2),
      totalAmountAfterSplit.toFixed(2),
    ];
  };
  const [tipAmountValue, totalTipAddedValue, totalAmountAfterSplitValue] =
    calculateTipAmount();

  /* tip section */

  const handleExpressionChange = event => {
    setExpression(event.target.value);
  };

  const handleEvaluate = () => {
    try {
      const evaluiatedResult = math.evaluate(expression);
      setResult(evaluiatedResult);
    } catch (error) {
      setResult("Invalide input");
    }
  };

  return (
    <div className="container">
      <div className="top">
        <NavBar />
        <div className="cal-container">
          <div className="form-field">
            <h1>Tip Calculator</h1>

            <p>Total Amount:</p>

            <input
              type="number"
              id="totalAmount"
              value={totalAmount}
              onChange={handleTotalAmountChange}
              className="target-input-tag"
              placeholder="Enter total dinner amount"
            />

            <p>Tip Percentage:</p>

            <select
              id="tipPercentage"
              value={tipPercentage}
              onChange={handleTipPercentageChange}
            >
              <option value={15}>15%</option>
              <option value={18}>18%</option>
              <option value={20}>20%</option>
              <option value={21}>21%</option>
              <option value={22}>22%</option>
              <option value={23}>23%</option>
              <option value={24}>24%</option>
              <option value={25}>25%</option>
            </select>
            <p>Tip Amount: ${tipAmountValue}</p>
            <p>Total Amount: ${totalTipAddedValue}</p>
            <p>Amount people split bill: </p>
            <input
              type="number"
              id="totalAmount"
              value={guestNumber}
              onChange={handleGuestNumberChange}
              className="target-input-tag"
            />
            <p>After Split: ${totalAmountAfterSplitValue}</p>
          </div>

          <div className="form-field">
            <h2>Simple Calculator</h2>
            <input
              type="text"
              value={expression}
              onChange={handleExpressionChange}
              className="target-input-tag"
              placeholder="ex.3(2+3) or (9/3)3(4+4)"
            />
            <div className="btn-container">
              <button onClick={handleEvaluate} className="btn-calculator">
                Submit
              </button>
            </div>
            <p>Result: {result}</p>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Calculator;
