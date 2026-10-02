import pandas as pd
import numpy as np
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from xgboost import XGBClassifier
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout

# Load dataset
df = pd.read_csv("diabetes.csv")

# Replace invalid zeros
cols = ["Glucose","BloodPressure","SkinThickness","Insulin","BMI"]
df[cols] = df[cols].replace(0, np.nan)
df.fillna(df.median(), inplace=True)

X = df.drop("Outcome", axis=1)
y = df["Outcome"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, stratify=y, random_state=42
)

scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# XGBoost
xgb = XGBClassifier(
    n_estimators=300,
    max_depth=4,
    learning_rate=0.05
)
xgb.fit(X_train, y_train)

# ANN
ann = Sequential([
    Dense(32, activation="relu", input_shape=(8,)),
    Dropout(0.3),
    Dense(16, activation="relu"),
    Dense(1, activation="sigmoid")
])

ann.compile(
    optimizer="adam",
    loss="binary_crossentropy",
    metrics=["accuracy"]
)

ann.fit(X_train, y_train, epochs=50, batch_size=16, verbose=0)

# Save models
joblib.dump(xgb, "xgb_model.pkl")
joblib.dump(scaler, "scaler.pkl")
ann.save("ann_model.keras")

print("✅ Models trained & saved")
