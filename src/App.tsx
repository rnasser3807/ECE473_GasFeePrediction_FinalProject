import React, { useState, useEffect } from "react";
import ethereumImage from './Ethereum-icon-purple.svg.png';

const GasFeeCalculator: React.FC = () => {

  const [timeFrame, setTimeFrame] = useState<number>(1); // Setting initial value of timeFrame to 1
  const [optimalTimeRange, setOptimalTimeRange] = useState<string>("");
  const [gasFee, setGasFee] = useState<number>(2);

  const handleCalculate = () => {
    const OptimalTime = Math.floor(Math.random() * 11) + 1; // generate starting hour
    const GasFee = Math.floor(Math.random() * 10 + timeFrame + 5); // generate starting gas fee
    setOptimalTimeRange(`${OptimalTime}:00 pm - ${OptimalTime + 1}:00 pm EST`);
    setGasFee(GasFee);
  };

  useEffect(() => {
    fetch("/api/ml").then(res => res.json()).then(data => { setGasFee(data.predict(timeFrame)) });
    fetch("/api/ml").then(res => res.json()).then(data => { setOptimalTimeRange(data.predict(timeFrame)) });
  }, []) // access predicted values in python code and set gas fee and time accordingly
  

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
        {gasFee != 0 && (
          <p>Estimated Gas Fee: {gasFee} Gwei</p>
        )}
      </div>
    </div>
  );
};

export default GasFeeCalculator;
