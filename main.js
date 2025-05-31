const extract_text = require('./Tesseract');

(async() => {
    const url = await extract_text("Screenshot 2025-05-29 223716.png")
    console.log(url);

  fetch("http://127.0.0.1:8000/predict", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ url: url })
})
.then(async (res) => {
  const text = await res.text();
  try {
    const data = JSON.parse(text);
    console.log("Prediction:", data.prediction);
  } catch (err) {
    console.error("JSON parse error:", err);
  }
})
.catch(err => console.error(err));
})();



