import React, { use, useState } from "react";

const Calculator = () => {
  const [totalAmount, setTotalAmount] = useState("");
  const [tipPercentage, setTipPercentage] = useState(15);
  const [guestNumber, setGuestNumber] = useState(1);
  const [cashBackTotalAmount, setCashBackTotalAmount] = useState("");

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
    const totalAmountAfterSplit = parseFloat(totalAmount / guestNumber);
    return [
      tipAmount.toFixed(2),
      totalTipAdded.toFixed(2),
      totalAmountAfterSplit.toFixed(2),
    ];
  };
  const [tipAmountValue, totalTipAddedValue, totalAmountAfterSplitValue] =
    calculateTipAmount();

  /* tip section */

  const handleCashBackInput = () => {};

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
            <p>CashBack Calculator</p>
            <label htmlFor="cashBackTotalAmount"></label>
          </div>
        </div>

        <hr />
      </div>
    </div>
  );
};

export default Calculator;
