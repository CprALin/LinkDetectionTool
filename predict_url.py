from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import re
import numpy as np
from fastapi.responses import JSONResponse

app = FastAPI()

# Load model 
model = joblib.load("./models/malicious_url_detection.pkl")
vectorizer = joblib.load("./models/vectorizer.pkl")

labels = {0 : "Benign" , 1 : "Defacement" , 2 : "Malware" , 3 : "Phishing"}

class URLRequest(BaseModel):
     url : str
     
# Create a function to normalize URL's
def normalize_url(url) :
    # transform to lowercase
    url = url.lower()
    # remove protocol (http / https) - use re from py -> regular expression
    url = re.sub(r'^https?:\/\/','',url)
    # remove "www."
    url = re.sub(r'^www\.','',url)
    # remove slashes
    url = url.rstrip('/')

    return url

@app.post("/predict")
def predict(request : URLRequest):
    try :
        normalized = normalize_url(request.url)
        vect = vectorizer.transform([normalized])
        pred = model.predict(vect)[0]
        predicted_value = labels[np.argmax(pred)]
        return {"prediction" : predicted_value}
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})