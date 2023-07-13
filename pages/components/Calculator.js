import React, { use, useState } from "react";
import * as math from "mathjs";

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
        <div className="cal-container">
          <div className="form-field">
            <p>Tip Calculator</p>
            <label htmlFor="totalAmount">Total Amount:</label>
            <input
              type="number"
              id="totalAmount"
              value={totalAmount}
              onChange={handleTotalAmountChange}
              className="target-input-tag"
            />

            <label htmlFor="tipPercentage">Tip Percentage:</label>
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
            <p>Simple Calculator</p>
            <input
              type="text"
              value={expression}
              onChange={handleExpressionChange}
            />
            <button onClick={handleEvaluate}>Submit</button>
            <p>Result: {result}</p>
          </div>
        </div>

        <hr />
      </div>
    </div>
  );
};

export default Calculator;
