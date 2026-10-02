// function showSection(id) {
//     document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
//     document.getElementById(id).classList.remove('hidden');
// }

// document.getElementById('prediction-form').addEventListener('submit', async (e) => {
//     e.preventDefault();

//     // 1. Collect Data
//     const formData = {
//         Pregnancies: parseFloat(document.getElementById('Pregnancies').value),
//         Glucose: parseFloat(document.getElementById('Glucose').value),
//         BloodPressure: parseFloat(document.getElementById('BloodPressure').value),
//         SkinThickness: parseFloat(document.getElementById('SkinThickness').value),
//         Insulin: parseFloat(document.getElementById('Insulin').value),
//         BMI: parseFloat(document.getElementById('BMI').value),
//         DiabetesPedigreeFunction: parseFloat(document.getElementById('DiabetesPedigreeFunction').value),
//         Age: parseFloat(document.getElementById('Age').value)
//     };

//     try {
//         // 2. Call your Flask API
//         const response = await fetch('http://127.0.0.1:5000/predict', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(formData)
//         });
//         const data = await response.json();

//         // 3. Update UI
//         document.getElementById('result-text').innerText = data.prediction;
//         document.getElementById('conf-text').innerText = data.confidence;
//         document.getElementById('risk-level').innerText = data.risk;

//         updateCharts(data);
//         updateRecommendations(data.prediction, formData.Glucose);
//         showSection('dashboard-section');

//     } catch (error) {
//         alert("Make sure your Flask app is running!");
//     }
// });

// function updateCharts(data) {
//     // Gauge Chart (Donut variant for 3D needle look)
//     const ctxG = document.getElementById('gaugeChart').getContext('2d');
//     new Chart(ctxG, {
//         type: 'doughnut',
//         data: {
//             datasets: [{
//                 data: [data.probability * 100, 100 - (data.probability * 100)],
//                 backgroundColor: [data.prediction === 'Diabetic' ? '#ef4444' : '#10b981', '#e2e8f0'],
//                 circumference: 180,
//                 rotation: 270,
//             }]
//         },
//         options: { cutout: '80%' }
//     });

//     // Bar Chart (SHAP values from your API)
//     const ctxB = document.getElementById('barChart').getContext('2d');
//     new Chart(ctxB, {
//         type: 'bar',
//         data: {
//             labels: Object.keys(data.shap),
//             datasets: [{
//                 label: 'Impact Factor',
//                 data: Object.values(data.shap),
//                 backgroundColor: '#2563eb'
//             }]
//         }
//     });
// }

// function updateRecommendations(pred, glucose) {
//     const list = document.getElementById('recommendations-list');
//     list.innerHTML = "";
//     const recs = pred === "Diabetic" 
//         ? ["Consult an endocrinologist immediately", "Reduce refined sugar intake", "Monitor blood glucose 2x daily"]
//         : ["Maintain healthy BMI", "Regular physical activity (30m/day)", "Annual health screening"];

//     if(glucose > 140) recs.push("High Glucose detected: Limit carbohydrates");

//     recs.forEach(r => {
//         let li = document.createElement('li');
//         li.innerText = r;
//         list.appendChild(li);
//     });
// }
// Local "Database" for demo purposes
let registeredUser = {
    email: "admin@hospital.com",
    password: "password123"
};

// Toggle between Register and Login UI
function toggleAuth() {
    document.getElementById('register-box').classList.toggle('hidden');
    document.getElementById('login-box').classList.toggle('hidden');
    document.getElementById('login-error').classList.add('hidden');
}

// Handle Registration
document.getElementById('register-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const pass = document.getElementById('reg-pass').value;
    const confirm = document.getElementById('reg-confirm').value;

    if (pass !== confirm) {
        alert("Passwords do not match!");
        return;
    }

    // Save to local variable (In industry, this goes to your Flask API)
    registeredUser = { email, password: pass };

    alert("Registration Successful! Please login.");
    toggleAuth(); // Move to login page
});

// Handle Login
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-pass').value;
    const errorMsg = document.getElementById('login-error');

    if (email === registeredUser.email && pass === registeredUser.password) {
        errorMsg.classList.add('hidden');
        showSection('input-section'); // Go to Patient Input fields
    } else {
        errorMsg.classList.remove('hidden');
        // Shake animation for feedback
        const box = document.getElementById('login-box');
        box.style.animation = 'shake 0.4s';
        setTimeout(() => box.style.animation = '', 400);
    }
});

// Add this to your style.css for the shake effect
/*
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
}
*/
// Function to handle Section Switching
function showSection(id) {
    document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

// // Custom Needle Plugin for Chart.js
// const needlePlugin = {
//     id: 'needle',
//     afterDraw: (chart) => {
//         if (chart.config.type !== 'doughnut') return;
//         const { ctx, chartArea: { width, height } } = chart;
//         const needleValue = chart.config.data.datasets[0].needleValue;
//         const dataTotal = 100;
//         const angle = Math.PI + (1 / dataTotal * needleValue * Math.PI);
//         const cx = width / 2;
//         const cy = chart.getDatasetMeta(0).data[0].y;

//         ctx.save();
//         ctx.translate(cx, cy);
//         ctx.rotate(angle);
//         ctx.beginPath();
//         ctx.moveTo(0, -5);
//         ctx.lineTo(height / 1.5, 0); // Needle Length
//         ctx.lineTo(0, 5);
//         ctx.fillStyle = '#fff';
//         ctx.fill();
//         ctx.restore();

//         ctx.beginPath();
//         ctx.arc(cx, cy, 8, 0, Math.PI * 2);
//         ctx.fillStyle = '#fff';
//         ctx.fill();
//     }
// };

// function showSection(id) {
//     document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
//     document.getElementById(id).classList.add('active');
// }

// const needlePlugin = {
//     id: 'needle',
//     afterDraw: (chart) => {
//         const { ctx, config, chartArea: { width, height } } = chart;
//         if (config.type !== 'doughnut') return;

//         // Get the probability value (0 to 100)
//         const needleValue = config.data.datasets[0].needleValue || 0;

//         // Map 0-100 to the 180-degree rotation (PI radians)
//         // 0% = Left (Green), 50% = Top (Yellow), 100% = Right (Red)
//         const angle = Math.PI + (needleValue / 100 * Math.PI);

//         const cx = width / 2;
//         const cy = chart.getDatasetMeta(0).data[0].y;

//         ctx.save();
//         ctx.translate(cx, cy);
//         ctx.rotate(angle);

//         // Draw the Needle (3D Effect)
//         ctx.beginPath();
//         ctx.moveTo(0, -6); // Needle width at base
//         ctx.lineTo(height / 1.4, 0); // Needle length
//         ctx.lineTo(0, 6);
//         ctx.fillStyle = '#ffffff';
//         ctx.shadowBlur = 10;
//         ctx.shadowColor = 'rgba(0,0,0,0.5)';
//         ctx.fill();

//         // Draw the Center Pivot Nut
//         ctx.restore();
//         ctx.beginPath();
//         ctx.arc(cx, cy, 10, 0, Math.PI * 2);
//         ctx.fillStyle = '#3b82f6';
//         ctx.fill();
//         ctx.strokeStyle = '#ffffff';
//         ctx.lineWidth = 3;
//         ctx.stroke();
//     }
// };

// let gaugeChart, barChart;

// document.getElementById('prediction-form').addEventListener('submit', async (e) => {
//     e.preventDefault();

//     const fields = ["Pregnancies", "Glucose", "BloodPressure", "SkinThickness", "Insulin", "BMI", "DiabetesPedigreeFunction", "Age"];
//     const payload = {};
//     fields.forEach(f => payload[f] = parseFloat(document.getElementById(f).value));

//     const res = await fetch('http://127.0.0.1:5000/predict', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload)
//     });
//     const data = await res.json();

//     renderDashboard(data);
//     showSection('dashboard-section');
// });

// function renderDashboard(data) {
//     const prob = data.probability * 100;

//     // Gauge with Needle
//     const ctxG = document.getElementById('gaugeChart').getContext('2d');
//     if (gaugeChart) gaugeChart.destroy();
//     gaugeChart = new Chart(ctxG, {
//         type: 'doughnut',
//         data: {
//             datasets: [{
//                 data: [33, 34, 33], // Low, Med, High zones
//                 backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
//                 needleValue: prob
//             }]
//         },
//         options: {
//             circumference: 180,
//             rotation: 270,
//             cutout: '75%',
//             plugins: { legend: { display: false } }
//         },
//         plugins: [needlePlugin]
//     });

//     document.getElementById('result-text').innerText = data.prediction;
//     document.getElementById('risk-pill').innerText = `Risk Level: ${data.risk}`;
//     document.getElementById('risk-pill').style.background = prob > 50 ? '#ef4444' : '#10b981';

//     // Bar Chart
//     const ctxB = document.getElementById('barChart').getContext('2d');
//     if (barChart) barChart.destroy();
//     barChart = new Chart(ctxB, {
//         type: 'bar',
//         data: {
//             labels: Object.keys(data.shap),
//             datasets: [{
//                 label: 'Metric Impact',
//                 data: Object.values(data.shap),
//                 backgroundColor: '#3b82f6',
//                 borderRadius: 8
//             }]
//         },
//         options: { scales: { y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.1)' } } } }
//     });

//     // Dynamic Recommendations
//     const list = document.getElementById('rec-list');
//     list.innerHTML = data.prediction === "Diabetic"
//         ? "<li>High Priority: Endocrinologist Referral</li><li>Start Low-Glycemic Diet</li>"
//         : "<li>Maintain Current Activity Levels</li><li>Retest in 6 Months</li>";
// }
// document.getElementById("download-btn")?.addEventListener("click", async () => {

//     // ===== 1. READ INPUT VALUES =====
//     const inputs = [
//         ["Pregnancies", document.getElementById("Pregnancies").value],
//         ["Glucose", document.getElementById("Glucose").value],
//         ["Blood Pressure", document.getElementById("BloodPressure").value],
//         ["Skin Thickness", document.getElementById("SkinThickness").value],
//         ["Insulin", document.getElementById("Insulin").value],
//         ["BMI", document.getElementById("BMI").value],
//         ["Pedigree", document.getElementById("DiabetesPedigreeFunction").value],
//         ["Age", document.getElementById("Age").value]
//     ];

//     const prediction = document.getElementById("result-text").innerText;
//     const risk = document.getElementById("risk-pill").innerText;

//     const recs = [...document.querySelectorAll("#rec-list li")]
//         .map(li => li.innerText);

//     // ===== 2. GET CHART IMAGES =====
//     const gaugeImg = document.getElementById("gaugeChart").toDataURL("image/png");
//     const barImg = document.getElementById("barChart").toDataURL("image/png");

//     // ===== 3. INIT PDF =====
//     const { jsPDF } = window.jspdf;
//     const doc = new jsPDF("p", "pt", "a4");

//     const pageW = doc.internal.pageSize.getWidth();
//     let y = 40;

//     // ===== 4. DARK BACKGROUND =====
//     doc.setFillColor(15, 23, 42);
//     doc.rect(0, 0, pageW, 842, "F");

//     // ===== 5. HEADER =====
//     doc.setTextColor(248, 250, 252);
//     doc.setFontSize(18);
//     doc.text("🧬 DIABETES SENTRY — Diagnostic Report", 40, y);
//     y += 20;

//     doc.setFontSize(10);
//     doc.setTextColor(203, 213, 225);
//     doc.text("Generated on: " + new Date().toLocaleString(), 40, y);
//     y += 25;

//     // ===== 6. INPUT CARD =====
//     doc.setFillColor(2, 6, 23);
//     doc.roundedRect(30, y, pageW - 60, 170, 14, 14, "F");

//     doc.setFontSize(14);
//     doc.setTextColor(248, 250, 252);
//     doc.text("Patient Input Summary", 45, y + 25);

//     let colX1 = 45;
//     let colX2 = pageW / 2 + 10;
//     let rowY = y + 50;

//     doc.setFontSize(11);
//     inputs.forEach((item, i) => {
//         const colX = i < 4 ? colX1 : colX2;
//         const rowOffset = i < 4 ? i : i - 4;
//         const textY = rowY + rowOffset * 22;

//         doc.setTextColor(148, 163, 184);
//         doc.text(item[0], colX, textY);

//         doc.setTextColor(248, 250, 252);
//         doc.text(String(item[1]), colX + 140, textY);
//     });

//     y += 200;

//     // ===== 7. RESULT CARD =====
//     doc.setFillColor(2, 6, 23);
//     doc.roundedRect(30, y, pageW - 60, 120, 14, 14, "F");

//     doc.setFontSize(14);
//     doc.setTextColor(248, 250, 252);
//     doc.text("Prediction Result", 45, y + 25);

//     doc.setFontSize(24);
//     doc.setTextColor(59, 130, 246);
//     doc.text(prediction, 45, y + 60);

//     doc.setFontSize(12);
//     doc.setTextColor(255, 255, 255);
//     doc.setFillColor(59, 130, 246);
//     doc.roundedRect(45, y + 75, 200, 28, 14, 14, "F");
//     doc.text(risk, 55, y + 95);

//     y += 150;

//     // ===== 8. GAUGE IMAGE =====
//     doc.setFillColor(2, 6, 23);
//     doc.roundedRect(30, y, pageW - 60, 240, 14, 14, "F");

//     doc.setFontSize(14);
//     doc.setTextColor(248, 250, 252);
//     doc.text("Risk Gauge", 45, y + 25);

//     doc.addImage(gaugeImg, "PNG", 100, y + 40, pageW - 200, 150);

//     y += 260;

//     // ===== 9. BAR CHART =====
//     doc.setFillColor(2, 6, 23);
//     doc.roundedRect(30, y, pageW - 60, 260, 14, 14, "F");

//     doc.setFontSize(14);
//     doc.setTextColor(248, 250, 252);
//     doc.text("Factor Impact", 45, y + 25);

//     doc.addImage(barImg, "PNG", 50, y + 40, pageW - 100, 180);

//     y += 280;

//     // ===== 10. RECOMMENDATIONS =====
//     doc.setFillColor(2, 6, 23);
//     doc.roundedRect(30, y, pageW - 60, 160, 14, 14, "F");

//     doc.setFontSize(14);
//     doc.setTextColor(248, 250, 252);
//     doc.text("Clinical Recommendations", 45, y + 25);

//     doc.setFontSize(11);
//     let recY = y + 50;
//     recs.forEach(r => {
//         doc.setTextColor(203, 213, 225);
//         doc.text("• " + r, 45, recY);
//         recY += 18;
//     });

//     // ===== 11. SAVE =====
//     doc.save("Diabetes_Report.pdf");
// });


// const API = "http://127.0.0.1:5000";

// /* =========================
//    AUTH STATE
// ========================= */
// let isLoggedIn = false;

// /* =========================
//    AUTH UI TOGGLE
// ========================= */
// function toggleAuth() {
//     document.getElementById("register-box").classList.toggle("hidden");
//     document.getElementById("login-box").classList.toggle("hidden");
//     document.getElementById("login-error").classList.add("hidden");
// }

// /* =========================
//    SECTION CONTROL (IMPORTANT)
// ========================= */
// function showSection(id) {

//     // 🔐 Prevent access without login
//     if (!isLoggedIn && id !== "auth-section") {
//         alert("Please login first");
//         id = "auth-section";
//     }

//     document.querySelectorAll("section").forEach(s => s.classList.remove("active"));
//     document.getElementById(id).classList.add("active");
// }

// /* =========================
//    REGISTER
// ========================= */
// document.getElementById("register-form").addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const name = document.getElementById("reg-name").value;
//     const email = document.getElementById("reg-email").value;
//     const pass = document.getElementById("reg-pass").value;
//     const confirm = document.getElementById("reg-confirm").value;

//     if (pass !== confirm) {
//         alert("Passwords do not match");
//         return;
//     }

//     const res = await fetch(`${API}/register`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, email, password: pass })
//     });

//     const data = await res.json();

//     if (res.ok) {
//         alert("Registration successful. Please login.");
//         toggleAuth();
//     } else {
//         alert(data.message);
//     }
// });

// /* =========================
//    LOGIN
// ========================= */
// document.getElementById("login-form").addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const email = document.getElementById("login-email").value;
//     const pass = document.getElementById("login-pass").value;
//     const errorMsg = document.getElementById("login-error");

//     const res = await fetch(`${API}/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password: pass })
//     });
 


//     if (res.ok) {
//         isLoggedIn = true;                // ✅ LOGIN SUCCESS
//         errorMsg.classList.add("hidden");
//         showSection("input-section");
//     } else {
//         errorMsg.classList.remove("hidden");
//     }
// });
// const needlePlugin = {
//     id: 'needle',
//     afterDraw: (chart) => {
//         if (chart.config.type !== 'doughnut') return;

//         const { ctx, config, chartArea: { width, height } } = chart;
//         const dataset = config.data.datasets[0];
//         const needleValue = dataset.needleValue || 0; // 0-100 probability

//         const cx = width / 2;
//         const cy = chart.getDatasetMeta(0).data[0].y;

//         // Map 0-100 probability to PI (180deg) rotation for semi-circle gauge
//         // 0% = left (green), 50% = middle (orange), 100% = right (red)
//         const angle = Math.PI + (needleValue / 100 * Math.PI);

//         ctx.save();
//         ctx.translate(cx, cy);
//         ctx.rotate(angle);

//         // Needle
//         ctx.beginPath();
//         ctx.moveTo(0, -6);
//         ctx.lineTo(height / 1.5, 0); // needle length
//         ctx.lineTo(0, 6);
//         ctx.fillStyle = '#ffffff'; // keep needle color fixed
//         ctx.shadowBlur = 5;
//         ctx.shadowColor = 'rgba(0,0,0,0.5)';
//         ctx.fill();
//         ctx.restore();

//         // Center circle
//         ctx.beginPath();
//         ctx.arc(cx, cy, 10, 0, Math.PI * 2);
//         ctx.fillStyle = '#3b82f6';
//         ctx.fill();
//         ctx.strokeStyle = '#ffffff';
//         ctx.lineWidth = 3;
//         ctx.stroke();
//     }
// };



// let gaugeChart, barChart;

// document.getElementById('prediction-form').addEventListener('submit', async (e) => {
//     e.preventDefault();

//     const fields = ["Pregnancies", "Glucose", "BloodPressure", "SkinThickness", "Insulin", "BMI", "DiabetesPedigreeFunction", "Age"];
//     const payload = {};
//     fields.forEach(f => payload[f] = parseFloat(document.getElementById(f).value));

//     const res = await fetch('http://127.0.0.1:5000/predict', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload)
//     });
//     const data = await res.json();

//     renderDashboard(data);
//     showSection('dashboard-section');
// });

// function renderDashboard(data) {
//     const prob = data.probability * 100;

//     // Gauge with Needle
//     const ctxG = document.getElementById('gaugeChart').getContext('2d');
//     if (gaugeChart) gaugeChart.destroy();
//     gaugeChart = new Chart(ctxG, {
//         type: 'doughnut',
//         data: {
//             datasets: [{
//                 backgroundColor: ['#10b981', '#f59e0b', '#ef4444'], // Green, Orange, Red
//                 data: [33, 34, 33], // Fixed segments

//                 needleValue: prob,           // probability 0-100
//                 prediction: data.prediction  // "At Risk" / "Diabetic" / "Normal"
//             }]
//         },
//         options: {
//             circumference: 180,
//             rotation: 270,
//             cutout: '75%',
//             plugins: { legend: { display: false } }
//         },
//         plugins: [needlePlugin]
//     });




//     document.getElementById('result-text').innerText = data.prediction;
//     document.getElementById('risk-pill').innerText = `Risk Level: ${data.risk}`;
//     document.getElementById('risk-pill').style.background = prob > 50 ? '#ef4444' : '#10b981';

//     // Bar Chart
//     const ctxB = document.getElementById('barChart').getContext('2d');
//     if (barChart) barChart.destroy();
//     barChart = new Chart(ctxB, {
//         type: 'bar',
//         data: {
//             labels: Object.keys(data.shap),
//             datasets: [{
//                 label: 'Metric Impact',
//                 data: Object.values(data.shap),
//                 backgroundColor: '#3b82f6',
//                 borderRadius: 8
//             }]
//         },
//         options: { scales: { y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.1)' } } } }
//     });

//     // Dynamic Recommendations
//     const list = document.getElementById('rec-list');
//     list.innerHTML = data.prediction === "Diabetic"
//         ? "<li>High Priority: Endocrinologist Referral</li><li>Start Low-Glycemic Diet</li>"
//         : "<li>Maintain Current Activity Levels</li><li>Retest in 6 Months</li>";
// }
// document.getElementById("download-btn")?.addEventListener("click", async () => {

//     // ===== 1. READ INPUT VALUES =====
//     const inputs = [
//         ["Pregnancies", document.getElementById("Pregnancies").value],
//         ["Glucose", document.getElementById("Glucose").value],
//         ["Blood Pressure", document.getElementById("BloodPressure").value],
//         ["Skin Thickness", document.getElementById("SkinThickness").value],
//         ["Insulin", document.getElementById("Insulin").value],
//         ["BMI", document.getElementById("BMI").value],
//         ["Pedigree", document.getElementById("DiabetesPedigreeFunction").value],
//         ["Age", document.getElementById("Age").value]
//     ];

//     const prediction = document.getElementById("result-text").innerText;
//     const risk = document.getElementById("risk-pill").innerText;

//     const recs = [...document.querySelectorAll("#rec-list li")]
//         .map(li => li.innerText);

//     // ===== 2. GET CHART IMAGES =====
//     const gaugeImg = document.getElementById("gaugeChart").toDataURL("image/png");
//     const barImg = document.getElementById("barChart").toDataURL("image/png");

//     // ===== 3. INIT PDF =====
//     const { jsPDF } = window.jspdf;
//     const doc = new jsPDF("p", "pt", "a4");

//     const pageW = doc.internal.pageSize.getWidth();
//     let y = 40;

//     // ===== 4. DARK BACKGROUND =====
//     doc.setFillColor(15, 23, 42);
//     doc.rect(0, 0, pageW, 842, "F");

//     // ===== 5. HEADER =====
//     doc.setTextColor(248, 250, 252);
//     doc.setFontSize(18);
//     doc.text("🧬 DIABETES SENTRY — Diagnostic Report", 40, y);
//     y += 20;

//     doc.setFontSize(10);
//     doc.setTextColor(203, 213, 225);
//     doc.text("Generated on: " + new Date().toLocaleString(), 40, y);
//     y += 25;

//     // ===== 6. INPUT CARD =====
//     doc.setFillColor(2, 6, 23);
//     doc.roundedRect(30, y, pageW - 60, 170, 14, 14, "F");

//     doc.setFontSize(14);
//     doc.setTextColor(248, 250, 252);
//     doc.text("Patient Input Summary", 45, y + 25);

//     let colX1 = 45;
//     let colX2 = pageW / 2 + 10;
//     let rowY = y + 50;

//     doc.setFontSize(11);
//     inputs.forEach((item, i) => {
//         const colX = i < 4 ? colX1 : colX2;
//         const rowOffset = i < 4 ? i : i - 4;
//         const textY = rowY + rowOffset * 22;

//         doc.setTextColor(148, 163, 184);
//         doc.text(item[0], colX, textY);

//         doc.setTextColor(248, 250, 252);
//         doc.text(String(item[1]), colX + 140, textY);
//     });

//     y += 200;

//     // ===== 7. RESULT CARD =====
//     doc.setFillColor(2, 6, 23);
//     doc.roundedRect(30, y, pageW - 60, 120, 14, 14, "F");

//     doc.setFontSize(14);
//     doc.setTextColor(248, 250, 252);
//     doc.text("Prediction Result", 45, y + 25);

//     doc.setFontSize(24);
//     doc.setTextColor(59, 130, 246);
//     doc.text(prediction, 45, y + 60);

//     doc.setFontSize(12);
//     doc.setTextColor(255, 255, 255);
//     doc.setFillColor(59, 130, 246);
//     doc.roundedRect(45, y + 75, 200, 28, 14, 14, "F");
//     doc.text(risk, 55, y + 95);

//     y += 150;

//     // ===== 8. GAUGE IMAGE =====
//     doc.setFillColor(2, 6, 23);
//     doc.roundedRect(30, y, pageW - 60, 240, 14, 14, "F");

//     doc.setFontSize(14);
//     doc.setTextColor(248, 250, 252);
//     doc.text("Risk Gauge", 45, y + 25);

//     doc.addImage(gaugeImg, "PNG", 100, y + 40, pageW - 200, 150);

//     y += 260;

//     // ===== 9. BAR CHART =====
//     doc.setFillColor(2, 6, 23);
//     doc.roundedRect(30, y, pageW - 60, 260, 14, 14, "F");

//     doc.setFontSize(14);
//     doc.setTextColor(248, 250, 252);
//     doc.text("Factor Impact", 45, y + 25);

//     doc.addImage(barImg, "PNG", 50, y + 40, pageW - 100, 180);

//     y += 280;

//     // ===== 10. RECOMMENDATIONS =====
//     doc.setFillColor(2, 6, 23);
//     doc.roundedRect(30, y, pageW - 60, 160, 14, 14, "F");

//     doc.setFontSize(14);
//     doc.setTextColor(248, 250, 252);
//     doc.text("Clinical Recommendations", 45, y + 25);

//     doc.setFontSize(11);
//     let recY = y + 50;
//     recs.forEach(r => {
//         doc.setTextColor(203, 213, 225);
//         doc.text("• " + r, 45, recY);
//         recY += 18;
//     });

//     // ===== 11. SAVE =====
//     doc.save("Diabetes_Report.pdf");
// });




const API = "http://127.0.0.1:5000";

/* =========================
   AUTH STATE
========================= */
let isLoggedIn = false;
let currentUserEmail = "";
/* =========================
   AUTH UI TOGGLE
========================= */
function toggleAuth() {
    document.getElementById("register-box").classList.toggle("hidden");
    document.getElementById("login-box").classList.toggle("hidden");
    document.getElementById("login-error").classList.add("hidden");
}

/* =========================
   SECTION CONTROL (IMPORTANT)
========================= */
function showSection(id) {

    // 🔐 Prevent access without login
    if (!isLoggedIn && id !== "auth-section") {
        alert("Please login first");
        id = "auth-section";
    }

    document.querySelectorAll("section").forEach(s => s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

/* =========================
   REGISTER
========================= */
document.getElementById("register-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("reg-name").value;
    const email = document.getElementById("reg-email").value;
    const pass = document.getElementById("reg-pass").value;
    const confirm = document.getElementById("reg-confirm").value;

    if (pass !== confirm) {
        alert("Passwords do not match");
        return;
    }

    const res = await fetch(`${API}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password: pass })
    });

    const data = await res.json();

    if (res.ok) {
        alert("Registration successful. Please login.");
        toggleAuth();
    } else {
        alert(data.message);
    }
});

// Update Login success
document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const pass = document.getElementById("login-pass").value;

    const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: pass })
    });
 


if (res.ok) {
        isLoggedIn = true;
        currentUserEmail = email; // ✅ Store email for later use
        showSection("input-section");
    } else {
        document.getElementById("login-error").classList.remove("hidden");
    }
});
const needlePlugin = {
    id: 'needle',
    afterDraw: (chart) => {
        if (chart.config.type !== 'doughnut') return;

        const { ctx, config, chartArea: { width, height } } = chart;
        const dataset = config.data.datasets[0];
        const needleValue = dataset.needleValue || 0; // 0-100 probability

        const cx = width / 2;
        const cy = chart.getDatasetMeta(0).data[0].y;

        // Map 0-100 probability to PI (180deg) rotation for semi-circle gauge
        // 0% = left (green), 50% = middle (orange), 100% = right (red)
        const angle = Math.PI + (needleValue / 100 * Math.PI);

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angle);

        // Needle
        ctx.beginPath();
        ctx.moveTo(0, -6);
        ctx.lineTo(height / 1.5, 0); // needle length
        ctx.lineTo(0, 6);
        ctx.fillStyle = '#ffffff'; // keep needle color fixed
        ctx.shadowBlur = 5;
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.fill();
        ctx.restore();

        // Center circle
        ctx.beginPath();
        ctx.arc(cx, cy, 10, 0, Math.PI * 2);
        ctx.fillStyle = '#3b82f6';
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.stroke();
    }
};



let gaugeChart, barChart;

// Update Prediction Form Submit
document.getElementById('prediction-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const fields = ["Pregnancies", "Glucose", "BloodPressure", "SkinThickness", "Insulin", "BMI", "DiabetesPedigreeFunction", "Age"];
    const payload = { email: currentUserEmail }; // ✅ Include the email here
    fields.forEach(f => payload[f] = parseFloat(document.getElementById(f).value));

    const res = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    
    const data = await res.json();
    renderDashboard(data);
    showSection('dashboard-section');
    alert("Prediction complete! Results have been sent to your email.");
});
function renderDashboard(data) {
    const prob = data.probability * 100;

    // Gauge with Needle
    const ctxG = document.getElementById('gaugeChart').getContext('2d');
    if (gaugeChart) gaugeChart.destroy();
    gaugeChart = new Chart(ctxG, {
        type: 'doughnut',
        data: {
            datasets: [{
                backgroundColor: ['#10b981', '#f59e0b', '#ef4444'], // Green, Orange, Red
                data: [33, 34, 33], // Fixed segments

                needleValue: prob,           // probability 0-100
                prediction: data.prediction  // "At Risk" / "Diabetic" / "Normal"
            }]
        },
        options: {
            circumference: 180,
            rotation: 270,
            cutout: '75%',
            plugins: { legend: { display: false } }
        },
        plugins: [needlePlugin]
    });




    document.getElementById('result-text').innerText = data.prediction;
    document.getElementById('risk-pill').innerText = `Risk Level: ${data.risk}`;
    document.getElementById('risk-pill').style.background = prob > 50 ? '#ef4444' : '#10b981';

    // Bar Chart
    const ctxB = document.getElementById('barChart').getContext('2d');
    if (barChart) barChart.destroy();
    barChart = new Chart(ctxB, {
        type: 'bar',
        data: {
            labels: Object.keys(data.shap),
            datasets: [{
                label: 'Metric Impact',
                data: Object.values(data.shap),
                backgroundColor: '#3b82f6',
                borderRadius: 8
            }]
        },
        options: { scales: { y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.1)' } } } }
    });

    // Dynamic Recommendations
    const list = document.getElementById('rec-list');
    list.innerHTML = data.prediction === "Diabetic"
        ? "<li>High Priority: Endocrinologist Referral</li><li>Start Low-Glycemic Diet</li>"
        : "<li>Maintain Current Activity Levels</li><li>Retest in 6 Months</li>";
}
document.getElementById("download-btn")?.addEventListener("click", async () => {

    // ===== 1. READ INPUT VALUES =====
    const inputs = [
        ["Pregnancies", document.getElementById("Pregnancies").value],
        ["Glucose", document.getElementById("Glucose").value],
        ["Blood Pressure", document.getElementById("BloodPressure").value],
        ["Skin Thickness", document.getElementById("SkinThickness").value],
        ["Insulin", document.getElementById("Insulin").value],
        ["BMI", document.getElementById("BMI").value],
        ["Pedigree", document.getElementById("DiabetesPedigreeFunction").value],
        ["Age", document.getElementById("Age").value]
    ];

    const prediction = document.getElementById("result-text").innerText;
    const risk = document.getElementById("risk-pill").innerText;

    const recs = [...document.querySelectorAll("#rec-list li")]
        .map(li => li.innerText);

    // ===== 2. GET CHART IMAGES =====
    const gaugeImg = document.getElementById("gaugeChart").toDataURL("image/png");
    const barImg = document.getElementById("barChart").toDataURL("image/png");

    // ===== 3. INIT PDF =====
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF("p", "pt", "a4");

    const pageW = doc.internal.pageSize.getWidth();
    let y = 40;

    // ===== 4. DARK BACKGROUND =====
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, pageW, 842, "F");

    // ===== 5. HEADER =====
    doc.setTextColor(248, 250, 252);
    doc.setFontSize(18);
    doc.text("🧬 DIABETES SENTRY — Diagnostic Report", 40, y);
    y += 20;

    doc.setFontSize(10);
    doc.setTextColor(203, 213, 225);
    doc.text("Generated on: " + new Date().toLocaleString(), 40, y);
    y += 25;

    // ===== 6. INPUT CARD =====
    doc.setFillColor(2, 6, 23);
    doc.roundedRect(30, y, pageW - 60, 170, 14, 14, "F");

    doc.setFontSize(14);
    doc.setTextColor(248, 250, 252);
    doc.text("Patient Input Summary", 45, y + 25);

    let colX1 = 45;
    let colX2 = pageW / 2 + 10;
    let rowY = y + 50;

    doc.setFontSize(11);
    inputs.forEach((item, i) => {
        const colX = i < 4 ? colX1 : colX2;
        const rowOffset = i < 4 ? i : i - 4;
        const textY = rowY + rowOffset * 22;

        doc.setTextColor(148, 163, 184);
        doc.text(item[0], colX, textY);

        doc.setTextColor(248, 250, 252);
        doc.text(String(item[1]), colX + 140, textY);
    });

    y += 200;

    // ===== 7. RESULT CARD =====
    doc.setFillColor(2, 6, 23);
    doc.roundedRect(30, y, pageW - 60, 120, 14, 14, "F");

    doc.setFontSize(14);
    doc.setTextColor(248, 250, 252);
    doc.text("Prediction Result", 45, y + 25);

    doc.setFontSize(24);
    doc.setTextColor(59, 130, 246);
    doc.text(prediction, 45, y + 60);

    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255);
    doc.setFillColor(59, 130, 246);
    doc.roundedRect(45, y + 75, 200, 28, 14, 14, "F");
    doc.text(risk, 55, y + 95);

    y += 150;

    // ===== 8. GAUGE IMAGE =====
    doc.setFillColor(2, 6, 23);
    doc.roundedRect(30, y, pageW - 60, 240, 14, 14, "F");

    doc.setFontSize(14);
    doc.setTextColor(248, 250, 252);
    doc.text("Risk Gauge", 45, y + 25);

    doc.addImage(gaugeImg, "PNG", 100, y + 40, pageW - 200, 150);

    y += 260;

    // ===== 9. BAR CHART =====
    doc.setFillColor(2, 6, 23);
    doc.roundedRect(30, y, pageW - 60, 260, 14, 14, "F");

    doc.setFontSize(14);
    doc.setTextColor(248, 250, 252);
    doc.text("Factor Impact", 45, y + 25);

    doc.addImage(barImg, "PNG", 50, y + 40, pageW - 100, 180);

    y += 280;

    // ===== 10. RECOMMENDATIONS =====
    doc.setFillColor(2, 6, 23);
    doc.roundedRect(30, y, pageW - 60, 160, 14, 14, "F");

    doc.setFontSize(14);
    doc.setTextColor(248, 250, 252);
    doc.text("Clinical Recommendations", 45, y + 25);

    doc.setFontSize(11);
    let recY = y + 50;
    recs.forEach(r => {
        doc.setTextColor(203, 213, 225);
        doc.text("• " + r, 45, recY);
        recY += 18;
    });

    // ===== 11. SAVE =====
    doc.save("Diabetes_Report.pdf");
});




