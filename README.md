# Ethereum Gas Fee Predictor

Welcome to Ethereum Gas Fee Predictor! This project is designed to help users determine the optimal time to conduct Ethereum transactions by predicting gas fees using an ARIMA model. For further details on our project, refer to the [[source notion page](https://www.notion.so/Prediction-of-Future-Ethereum-Transaction-Gas-Fees-Through-an-Adjusted-Autoregressive-Integrated-Mov-44690d283fe44c2e858183d7959eb812)]

## Overview

The Ethereum Transaction Predictor consists of a front-end React website interface and a back-end Flask server. The front-end allows users to input transaction details and receive predictions for optimal transaction times and estimated gas fees. The back-end utilizes an ARIMA model to analyze historical gas price data obtained from etherscan.io, enabling it to provide accurate predictions.

## Features

- **Predict Optimal Transaction Time**: Users can input transaction details and receive predictions for the best time to conduct their Ethereum transactions.
- **Estimate Gas Fees**: The system provides estimated gas fees in gwei, allowing users to plan their transactions accordingly.
- **ARIMA Model**: The back-end server runs an ARIMA model to analyze historical gas price trends and predict future prices.
- **Adjustable Multiples Calculations**: The model performs adjusted multiples calculations based on observed trends, ensuring accurate predictions.

## Installation

To run the Ethereum Transaction Predictor locally, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies for the front-end and back-end.
4. Start the front-end and back-end servers.

## Usage

1. Open your web browser and navigate to the URL where the front-end server is running.
2. Input time frame in which you want to conduct the next transaction.
3. Click the "Generate Prediction" button to receive predictions for the optimal transaction time and estimated gas fees.

## Technologies Used

- **Front-end**: React
- **Back-end**: Flask
- **Data Analysis**: ARIMA Model
- **Data Source**: etherscan.io

## Contributors

- Rayyan Nasser 
- Andrew Yang 
- Samuel Henriques 
- Joshua Lee 

## Acknowledgements

- Special thanks to etherscan.io for providing historical gas price data.
- This project was inspired by the need for a reliable tool to predict Ethereum transaction costs.
