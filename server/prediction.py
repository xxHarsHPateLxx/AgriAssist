import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
import joblib  # for saving model

def train_model():
    df = pd.read_csv("yield_dataset.csv")

    X = df.drop(columns=["Yield per annum (tons/ha)"])
    y = df["Yield per annum (tons/ha)"]

    X_train, _, y_train, _ = train_test_split(X, y, test_size=0.2, random_state=42)

    rf_tuned = RandomForestRegressor(
        n_estimators=100,
        max_depth=10,
        max_features="sqrt",
        min_samples_leaf=5,
        random_state=42
    )
    rf_tuned.fit(X_train, y_train)

    joblib.dump((rf_tuned, list(X.columns)), "yield_model.pkl")

if __name__ == "__main__":
    train_model()
