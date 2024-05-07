import requests
import json
from datetime import datetime
import pandas as pd 

import numpy as np
import io
import matplotlib.pyplot as plt

from statsmodels.tsa.stattools import adfuller, acf, pacf
from statsmodels.tsa.arima.model import ARIMA
from sklearn.metrics import mean_squared_error

from statsmodels.tsa.arima.model import ARIMA
from statsmodels.graphics.tsaplots import plot_acf, plot_pacf


import csv

import requests
import pandas as pd
import csv
from datetime import datetime

class PredictGasFee():
    
    def __init__(self, api_key, file_path, df):
        self.api_key = api_key
        self.file_path = file_path
        self.df = df

    # Function to fetch gas prices
    def fetch_gas_prices(self, api_key):
        url = f"https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey={api_key}"
        response = requests.get(url)
        data = response.json()
        gas_price = float(data['result']['ProposeGasPrice']) * 1e9  # Multiply by 10^9
        gas_price_data = {
            'date': datetime.now().strftime("%Y-%m-%d"),  # Format the date 
            'time': datetime.now().strftime("%H:%M:%S"),  # Format the time
            'average_gas_price': gas_price
        }

        # Appending to a CSV
        with open(self.file_path, 'a', newline='') as file:
            writer = csv.DictWriter(file, fieldnames=gas_price_data.keys())
            # Check if the file is empty, if so, write the header
            file.seek(0, 2)  # Go to the end of file
            if file.tell() == 0:  # Check if file is empty
                writer.writeheader()
            writer.writerow(gas_price_data)


    def train_model(self, file_path):

        result = adfuller(self.df['AverageGasFee'])
        # print('ADF Statistic:', result[0])
        # print('p-value:', result[1])

        # Make the series stationary if necessary
        if result[1] > 0.05:
            self.df['AverageGasFee'] = self.df['AverageGasFee'].diff().dropna()

        # Fit the ARIMA model (adjust p, d, q based on ACF and PACF plots)
        model = ARIMA(self.df['AverageGasFee'], order=(1, 1, 1)) # example parameters
        return model.fit()



    # Prediction
    def predict_gas_fee(self, trained_model, hour):
        
        results = trained_model
        self.df['Forecast'] = results.predict(start=1, end=len(self.df), typ='levels')
        # df[['AverageGasFee', 'Forecast']].plot(title='Gas Fee Forecast vs Actual', figsize=(10, 5))
        # plt.show()

        # Forecast future values
        num_days = 2
        forecast = results.get_forecast(steps=num_days)  # Adjust steps for longer forecasts
        confidence_intervals = forecast.conf_int()

        forecast_df = forecast.summary_frame()
        if hour < 24:
            return forecast_df.iat[0, 0]
        else: 
            return forecast_df.iat[1,0]

