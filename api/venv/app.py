from datetime import datetime
import pandas as pd
from predict_gas_fee import PredictGasFee 

import numpy as np
import matplotlib.pyplot as plt
import csv

from statsmodels.tsa.stattools import adfuller, acf, pacf
from statsmodels.tsa.arima.model import ARIMA
from sklearn.metrics import mean_squared_error
from sklearn import datasets
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier

from flask import Flask, jsonify

from statsmodels.tsa.arima.model import ARIMA
from statsmodels.graphics.tsaplots import plot_acf, plot_pacf

app = Flask(__name__)
@app.route('/api/ml')

def predict():
    api_key = '67FRJ6XH2EF6IEV7GH7I6WJ5TAVBIC1X8R'
    file_path ='all_gas_prices.csv'
    df = pd.read_csv(file_path, parse_dates=['Date'], index_col='Date')

    model = PredictGasFee(api_key, file_path, df)

    trained_m = model.train_model(file_path)

    forecast = model.predict_gas_fee(trained_m, 30)

    return{'forecast': forecast}


