import React, { useState } from "react";
import ethereumImage from './Ethereum-icon-purple.svg.png';

const GasFeeCalculator: React.FC = () => {
  const [timeFrame, setTimeFrame] = useState<number>(1); // Setting initial value of timeFrame to 1
  const [optimalTimeRange, setOptimalTimeRange] = useState<string>("");
  const [gasFee, setGasFee] = useState<number>(0);

  const handleCalculate = () => {
    const randomOptimalTime = Math.floor(Math.random() * 11) + 1; // Random hour between 1 and 12
    const randomGasFee = Math.floor(Math.random() * 10 + timeFrame + 5); // Random gas fee based on input timeFrame

    setOptimalTimeRange(`${randomOptimalTime}:00 pm - ${randomOptimalTime + 1}:00 pm EST`);
    setGasFee(randomGasFee);
  };

  const handleTimeFrameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value);
    // Ensure the value is within the range 1 to 48
    if (value < 1) {
      value = 1;
    } else if (value > 48) {
      value = 48;
    }
    setTimeFrame(value);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100vh' , width: '175vh' }}>
      <h2>Gas Fee Calculator</h2>
      <img src={ethereumImage} width={250} height={250} className="body" alt="Etherem Image" />
      <label htmlFor="timeFrame">Choose Time Frame (1 - 48 hours):</label>
      <input
        type="number"
        id="timeFrame"
        value={timeFrame}
        onChange={handleTimeFrameChange}
        min={1} // Setting minimum value to 1
        max={48} // Setting maximum value to 48
        style={{ marginBottom: '10px' }} // Adding space between input and button
      />
      <button onClick={handleCalculate} style={{ marginBottom: '10px' }}>Generate Prediction</button>
      <div>
        {optimalTimeRange && (
          <p>Optimal Transaction Time: {optimalTimeRange}</p>
        )}
        {gasFee !== 0 && (
          <p>Estimated Gas Fee: {gasFee} Gwei</p>
        )}
      </div>
    </div>
  );
};

export default GasFeeCalculator;
