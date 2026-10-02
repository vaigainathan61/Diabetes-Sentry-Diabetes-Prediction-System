# 🩺 Diabetes Sentry – Diabetes Prediction System

## 📌 Project Overview

**Diabetes Sentry** is a machine learning-based web application that predicts the likelihood of diabetes using patient health parameters.

The system uses **Python, Flask, XGBoost, Scikit-learn, and Keras** to process user inputs, generate a prediction, and present the result through an interactive web interface.

The application also provides **data visualization, prediction confidence, and SHAP-based model explainability** to help understand the factors influencing the prediction.

## 🎯 Objectives

* Predict diabetes risk using patient health parameters.
* Build an easy-to-use web interface for prediction.
* Apply machine learning for healthcare data analysis.
* Visualize prediction results using interactive charts.
* Provide model explainability using SHAP.
* Generate a downloadable prediction report.

## 🚀 Key Features

* 🔐 User Login & Registration
* 🩺 Diabetes Risk Prediction
* 📊 Interactive Prediction Gauge
* 📈 Health Data Visualization
* 🤖 XGBoost Machine Learning Model
* 🧠 SHAP Model Explainability
* 📄 PDF Prediction Report
* 🌐 Flask Web Application
* 🔄 Data Preprocessing and Feature Scaling

## 🧠 Machine Learning

The project uses **XGBoost** for diabetes prediction.

### Input Parameters

The model accepts **8 health-related input parameters** used for prediction.

The input data is processed using preprocessing and scaling techniques before being passed to the trained machine learning model.

### Prediction Process

```text
User Input
    ↓
Data Validation
    ↓
Data Preprocessing
    ↓
Feature Scaling
    ↓
XGBoost Model
    ↓
Prediction
    ↓
Risk Visualization
    ↓
SHAP Explanation
    ↓
PDF Report
```

## 🛠️ Technologies Used

### Programming

* Python

### Backend

* Flask
* REST API

### Machine Learning

* XGBoost
* Scikit-learn
* Keras

### Data Processing

* Pandas
* NumPy

### Visualization

* Chart.js
* Matplotlib

### Explainable AI

* SHAP

### Frontend

* HTML
* CSS
* JavaScript

## 📁 Project Structure

```text
Diabetes-Sentry/
│
├── app.py
├── model/
│   ├── model.pkl
│   └── scaler.pkl
│
├── templates/
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   └── result.html
│
├── static/
│   ├── css/
│   ├── js/
│   └── images/
│
├── dataset/
│   └── diabetes.csv
│
├── reports/
│
├── requirements.txt
└── README.md
```

## 📊 Model Evaluation

The model can be evaluated using common classification metrics such as:

* Accuracy
* Precision
* Recall
* F1-Score
* Confusion Matrix
* ROC-AUC

These metrics help evaluate how effectively the model distinguishes between diabetes and non-diabetes cases.

## 🧠 Explainable AI with SHAP

The project uses **SHAP (SHapley Additive exPlanations)** to explain the model's predictions.

SHAP helps identify which input features contributed positively or negatively to an individual prediction.

This makes the machine learning model more interpretable instead of treating it as a complete black box.

## 📈 Visualization

The application provides visual representations of prediction results using interactive charts.

Example visualizations include:

* Prediction probability
* Risk gauge
* Feature contribution
* Model performance
* Confusion matrix
* ROC curve

## 📄 PDF Report

After generating a prediction, the application can generate a PDF report containing relevant prediction information and analysis results.

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/Diabetes-Sentry.git
```

### 2. Navigate to the Project

```bash
cd Diabetes-Sentry
```

### 3. Create a Virtual Environment

```bash
python -m venv venv
```

### 4. Activate the Environment

**Windows:**

```bash
venv\Scripts\activate
```

**Linux / macOS:**

```bash
source venv/bin/activate
```

### 5. Install Dependencies

```bash
pip install -r requirements.txt
```

### 6. Run the Application

```bash
python app.py
```

Open the application in your browser at:

```text
http://127.0.0.1:5000
```

## 📦 Requirements

```text
Flask
pandas
numpy
scikit-learn
xgboost
keras
tensorflow
shap
matplotlib
reportlab
```

## 🔒 Disclaimer

This project is developed for **educational and demonstration purposes**. It is not intended to provide medical diagnosis, treatment, or professional medical advice.

## 💡 Future Enhancements

* Integration with wearable health devices.
* Real-time health monitoring.
* Cloud-based deployment.
* Patient history dashboard.
* Improved model optimization.
* Mobile application integration.
* Additional explainable AI features.

## ⭐ Project Highlights

* Machine Learning-based diabetes prediction
* Flask-based web application
* XGBoost classification
* Data preprocessing and feature scaling
* Interactive prediction visualization
* SHAP explainability
* PDF report generation
