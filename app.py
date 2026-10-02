# # # from flask import Flask, request, jsonify
# # # from flask_cors import CORS
# # # import numpy as np, joblib, os
# # # from tensorflow.keras.models import load_model

# # # app = Flask(__name__)
# # # CORS(app)

# # # BASE = os.path.dirname(os.path.abspath(__file__))

# # # xgb = joblib.load(os.path.join(BASE, "xgb_model.pkl"))
# # # scaler = joblib.load(os.path.join(BASE, "scaler.pkl"))
# # # ann = load_model(os.path.join(BASE, "ann_model.keras"))

# # # FEATURES = [
# # #     "Pregnancies","Glucose","BloodPressure",
# # #     "SkinThickness","Insulin","BMI",
# # #     "DiabetesPedigreeFunction","Age"
# # # ]

# # # def risk_level(p):
# # #     if p < 0.25: return "Low"
# # #     if p < 0.55: return "Moderate"
# # #     return "High"

# # # # ✅ HOME ROUTE (FIXES 404)
# # # @app.route("/")
# # # def home():
# # #     return jsonify({
# # #         "message": "Diabetes Risk Assessment API is running",
# # #         "endpoint": "/predict",
# # #         "method": "POST"
# # #     })

# # # @app.route("/predict", methods=["GET", "POST"])
# # # def predict():
# # #     if request.method == "GET":
# # #         return jsonify({
# # #             "message": "Use POST method with JSON data for prediction"
# # #         })
# # #     d = request.json
# # #     X = np.array([d[f] for f in FEATURES]).reshape(1,-1)
# # #     Xs = scaler.transform(X)

# # #     p_xgb = xgb.predict_proba(Xs)[0][1]
# # #     p_ann = ann.predict(Xs)[0][0]

# # #     prob = (0.65 * p_xgb) + (0.35 * p_ann)
# # #     prob = float(np.clip(prob, 0.05, 0.95))

# # #     shap_like = {
# # #         "Glucose": round(d["Glucose"]/200,2),
# # #         "BMI": round(d["BMI"]/50,2),
# # #         "Pregnancies": round(d["Pregnancies"]/10,2),
# # #         "Age": round(d["Age"]/100,2),
# # #         "BloodPressure": round(d["BloodPressure"]/150,2)
# # #     }

# # #     return jsonify({
# # #         "prediction": "Diabetic" if prob >= 0.5 else "Non-Diabetic",
# # #         "probability": round(prob,4),
# # #         "confidence": round(prob*100,2),
# # #         "risk": risk_level(prob),
# # #         "shap": shap_like
# # #     })

# # # if __name__ == "__main__":
# # #     app.run(debug=True)


# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import numpy as np, joblib, os
# from tensorflow.keras.models import load_model
# import sqlite3   # ✅ ADD THIS
# from flask_mail import Mail, Message



# app = Flask(__name__)
# CORS(app)


# def init_db():
#     conn = sqlite3.connect("users.db")
#     cur = conn.cursor()
#     cur.execute("""
#     CREATE TABLE IF NOT EXISTS users (
#         id INTEGER PRIMARY KEY AUTOINCREMENT,
#         name TEXT,
#         email TEXT UNIQUE,
#         password TEXT
#     )
#     """)
#     conn.commit()
#     conn.close()

# init_db()

# BASE = os.path.dirname(os.path.abspath(__file__))

# xgb = joblib.load(os.path.join(BASE, "xgb_model.pkl"))
# scaler = joblib.load(os.path.join(BASE, "scaler.pkl"))
# ann = load_model(os.path.join(BASE, "ann_model.keras"))

# FEATURES = [
#     "Pregnancies","Glucose","BloodPressure",
#     "SkinThickness","Insulin","BMI",
#     "DiabetesPedigreeFunction","Age"
# ]

# def risk_level(p):
#     if p < 0.25: return "Low"
#     if p < 0.55: return "Moderate"
#     return "High"

# # ✅ HOME ROUTE (FIXES 404)
# @app.route("/")
# def home():
#     return jsonify({
#         "message": "Diabetes Risk Assessment API is running",
#         "endpoint": "/predict",
#         "method": "POST"
#     })

# @app.route("/register", methods=["POST"])
# def register():
#     data = request.json
#     name = data.get("name")
#     email = data.get("email")
#     password = data.get("password")

#     conn = sqlite3.connect("users.db")
#     cur = conn.cursor()

#     # 🔍 Check if email already exists
#     cur.execute("SELECT * FROM users WHERE email = ?", (email,))
#     user = cur.fetchone()

#     if user:
#         conn.close()
#         return jsonify({
#             "message": "Email already registered. Please login."
#         }), 400

#     # ✅ Save new user
#     cur.execute(
#         "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
#         (name, email, password)
#     )
#     conn.commit()
#     conn.close()

#     return jsonify({
#         "message": "Registration successful"
#     }), 200

# @app.route("/login", methods=["POST"])
# def login():
#     data = request.json
#     email = data.get("email")
#     password = data.get("password")

#     conn = sqlite3.connect("users.db")
#     cur = conn.cursor()

#     # 🔐 Check email + password
#     cur.execute(
#         "SELECT * FROM users WHERE email = ? AND password = ?",
#         (email, password)
#     )
#     user = cur.fetchone()
#     conn.close()

#     if user:
#         return jsonify({
#             "message": "Login successful"
#         }), 200
#     else:
#         return jsonify({
#             "message": "Invalid email or password"
#         }), 401



# @app.route("/predict", methods=["GET", "POST"])
# def predict():
#     if request.method == "GET":
#         return jsonify({
#             "message": "Use POST method with JSON data for prediction"
#         })
#     d = request.json
#     X = np.array([d[f] for f in FEATURES]).reshape(1,-1)
#     Xs = scaler.transform(X)

#     p_xgb = xgb.predict_proba(Xs)[0][1]
#     p_ann = ann.predict(Xs)[0][0]

#     prob = (0.65 * p_xgb) + (0.35 * p_ann)
#     prob = float(np.clip(prob, 0.05, 0.95))

#     shap_like = {
#         "Glucose": round(d["Glucose"]/200,2),
#         "BMI": round(d["BMI"]/50,2),
#         "Pregnancies": round(d["Pregnancies"]/10,2),
#         "Age": round(d["Age"]/100,2),
#         "BloodPressure": round(d["BloodPressure"]/150,2)
#     }

#     return jsonify({
#         "prediction": "Diabetic" if prob >= 0.5 else "Non-Diabetic",
#         "probability": round(prob,4),
#         "confidence": round(prob*100,2),
#         "risk": risk_level(prob),
#         "shap": shap_like
#     })

# if __name__ == "__main__":
#     app.run(debug=True)

from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_mail import Mail, Message  # ✅ Added
import numpy as np, joblib, os
from tensorflow.keras.models import load_model
import sqlite3

app = Flask(__name__)
CORS(app)

# --- EMAIL CONFIGURATION ---
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'vaigaimohit@gmail.com'  # 📧 Your Email
app.config['MAIL_PASSWORD'] = 'xrah ydla pigt paev'      # 🔑 Your App Password
app.config['MAIL_DEFAULT_SENDER'] = 'vaigaimohit@gmail.com'
mail = Mail(app)

def init_db():
    conn = sqlite3.connect("users.db")
    cur = conn.cursor()
    cur.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT UNIQUE,
        password TEXT
    )
    """)
    conn.commit()
    conn.close()

init_db()

BASE = os.path.dirname(os.path.abspath(__file__))
xgb = joblib.load(os.path.join(BASE, "xgb_model.pkl"))
scaler = joblib.load(os.path.join(BASE, "scaler.pkl"))
ann = load_model(os.path.join(BASE, "ann_model.keras"))

FEATURES = ["Pregnancies","Glucose","BloodPressure","SkinThickness","Insulin","BMI","DiabetesPedigreeFunction","Age"]

def risk_level(p):
    if p < 0.25: return "Low"
    if p < 0.55: return "Moderate"
    return "High"

@app.route("/")
def home():
    return jsonify({"message": "API is running"})

@app.route("/register", methods=["POST"])
def register():
    data = request.json
    conn = sqlite3.connect("users.db")
    cur = conn.cursor()
    cur.execute("SELECT * FROM users WHERE email = ?", (data.get("email"),))
    if cur.fetchone():
        conn.close()
        return jsonify({"message": "Email exists"}), 400
    cur.execute("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", (data.get("name"), data.get("email"), data.get("password")))
    conn.commit()
    conn.close()
    return jsonify({"message": "Registration successful"}), 200

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    conn = sqlite3.connect("users.db")
    cur = conn.cursor()
    cur.execute("SELECT * FROM users WHERE email = ? AND password = ?", (data.get("email"), data.get("password")))
    user = cur.fetchone()
    conn.close()
    if user: return jsonify({"message": "Login successful", "user_email": data.get("email")}), 200
    return jsonify({"message": "Invalid credentials"}), 401

@app.route("/predict", methods=["POST"])
def predict():
    d = request.json
    user_email = d.get("email") # Get email from request to send results
    
    X = np.array([d[f] for f in FEATURES]).reshape(1,-1)
    Xs = scaler.transform(X)

    p_xgb = xgb.predict_proba(Xs)[0][1]
    p_ann = ann.predict(Xs)[0][0]
    prob = (0.65 * p_xgb) + (0.35 * p_ann)
    prob = float(np.clip(prob, 0.05, 0.95))

    prediction_result = "Diabetic" if prob >= 0.5 else "Non-Diabetic"
    risk = risk_level(prob)

    # ✅ SEND EMAIL
    if user_email:
        try:
            msg = Message("Your Diabetes Risk Assessment Report", recipients=[user_email])
            msg.body = f"""
            Hello,
            
            Your Diabetes Sentry analysis is complete.
            
            RESULT: {prediction_result}
            RISK LEVEL: {risk}
            PROBABILITY: {round(prob*100, 2)}%
            
            Thank you for using our Clinical Diagnostic tool.
            """
            mail.send(msg)
        except Exception as e:
            print(f"Mail Error: {e}")

    return jsonify({
        "prediction": prediction_result,
        "probability": round(prob,4),
        "confidence": round(prob*100,2),
        "risk": risk,
        "shap": { "Glucose": round(d["Glucose"]/200,2), "BMI": round(d["BMI"]/50,2) }
    })

if __name__ == "__main__":
    app.run(debug=True)

