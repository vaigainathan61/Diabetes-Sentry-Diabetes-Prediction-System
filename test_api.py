import requests

url = "http://127.0.0.1:5000/predict"

data = {
    "Pregnancies": 6,
    "Glucose": 190,
    "BloodPressure": 95,
    "SkinThickness": 45,
    "Insulin": 250,
    "BMI": 36,
    "DiabetesPedigreeFunction": 1.2,
    "Age": 58
}

res = requests.post(url, json=data)
print(res.json())
