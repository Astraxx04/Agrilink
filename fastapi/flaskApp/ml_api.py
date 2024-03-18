from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import json
import numpy as np
from keras.preprocessing import image
import pandas as pd
from geopy.geocoders import Nominatim
import joblib
from datetime import datetime
from tensorflow.keras.models import load_model

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class model_input(BaseModel):
    N : int
    P : int
    K : int
    temperature : int
    humidity : int
    ph : float
    rainfall : int

farm_model = pickle.load(open("../pickleFiles/randomForest.pkl", "rb"))
img_cla_model = load_model('../pickleFiles/fin_text_model.h5')

@app.post("/predictionValues")
def farmPrediction(input_values: model_input):
    print(input_values)
    input_data = input_values.json()
    input_dictionary = json.loads(input_data)

    inp1 = input_dictionary["N"]
    inp2 = input_dictionary["P"]
    inp3 = input_dictionary["K"]
    inp4 = input_dictionary["temperature"]
    inp5 = input_dictionary["humidity"]
    inp6 = input_dictionary["ph"]
    inp7 = input_dictionary["rainfall"]

    inp_list = [inp1, inp2, inp3, inp4, inp5, inp6, inp7]
    prediction = farm_model.predict([inp_list])

    with open('../DataSets/Prediction.json', 'r') as file:
        data = json.load(file)

    result = prediction[0]

    closest_match = None
    min_distance = float('inf')

    for key in data:
        distance = Levenshtein.distance(result.lower(), key.lower())
        if distance < min_distance:
            min_distance = distance
            closest_match = key

    print(prediction[0])
    print(closest_match)

    response = {}
    if closest_match and closest_match.lower() in result.lower():
        response["Crops"] = data[closest_match]["Crops"]
        response["Fertilisers required"] = data[closest_match]["Fertilisers required"]
        response["Cost of cultivation"] = data[closest_match]["Cost of cultivation"]
        response["Expected revenues"] = data[closest_match]["Expected revenues"]
        response["Quantity of seeds per hectare"] = data[closest_match]["Quantity of seeds per hectare"]
        response["Duration of cultivation"] = data[closest_match]["Duration of cultivation"]
        response["Demand of crop"] = data[closest_match]["Demand of crop"]
        response["Crops for mixed cropping"] = data[closest_match]["Crops for mixed cropping"]
    else:
        response["Crops"] = prediction[0]
        response["Fertilisers required"] = "NA"
        response["Cost of cultivation"] = "NA"
        response["Expected revenues"] = "NA"
        response["Quantity of seeds per hectare"] = "NA"
        response["Duration of cultivation"] = "NA"
        response["Demand of crop"] = "NA"
        response["Crops for mixed cropping"] = "NA"

    return { "final_pred": json.dumps(response)}


@app.post("/predictionImage")
async def farmPredictionImage(request: Request):
    bytesOfImage = await request.body()
    with open('image.jpeg', 'wb') as out:
        out.write(bytesOfImage)
    
    data = {
        "Loc_Cordinates": "12.9716, 77.5946",
        "Temperature": 30,
        "date": datetime.today().strftime('%Y-%m-%d'),
    }

    image_path = "./image.jpeg"                        
    img = image.load_img(image_path)
    img = img.resize((150,150))
    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    x = x/255.0

    prediction=img_cla_model(x)*100
    
    max_i = np.argmax(prediction) 
    if max_i==0:                                    
        soil="Alluvial"
    elif max_i==1:
        soil="Black"
    elif max_i==2:
        soil="Clayey"
    elif max_i==3:
        soil="Latterite"
    elif max_i==4:
        soil="Red"
    elif max_i==5:
        soil="Sandy"
    
    print(soil)

    types = soil
    if types=="Alluvial":                          
        soil_type = 1
    elif types == "Black":
        soil_type = 2
    elif types == "Clayey":
        soil_type = 3
    elif types == "Latterite":
        soil_type = 4
    elif types == "Red":
        soil_type = 5
    elif types == "Sandy":
       soil_type = 6
    
    coordinates = data["Loc_Cordinates"]          
    coordinates = str(coordinates)              
    locator = Nominatim(user_agent="myApp")    
    location = locator.reverse(coordinates)
    loc_dict=location.raw
    state=(loc_dict.get('address').get('state'))
    state_code=0            

    if state=="Andhra Pradesh":                     
        state_code=1
    elif state=="Arunachal Pradesh":
        state_code=2 
    elif state=="Assam":
        state_code=3 
    elif state=="Bihar":
        state_code=4 
    elif state=="Chhatisgarh":
        state_code=5 
    elif state=="Goa":
        state_code=6 
    elif state=="Gujarat":
        state_code=7 
    elif state=="Haryana":
        state_code=8 
    elif state=="Himachal Pradesh":
        state_code=9 
    elif state=="Jharkhand":
        state_code=10
    elif state=="Karnataka":
        state_code=11 
    elif state=="Kerela":
        state_code=12
    elif state=="Madhya Pradesh":
        state_code=13
    elif state=="Maharashtra":
        state_code=14
    elif state=="Manipur":
        state_code=15
    elif state=="Meghalaya":
        state_code=16
    elif state=="Mizoram":
        state_code=17
    elif state=="Nagaland":
        state_code=18 
    elif state=="Odisha":
        state_code=19 
    elif state=="Punjab":
        state_code=20
    elif state=="Rajasthan":
        state_code=21
    elif state=="Sikkim":
        state_code=22 
    elif state=="Tamil Nadu":
        state_code=23 
    elif state=="Telangana":
        state_code=24 
    elif state=="Tripura":
        state_code=25 
    elif state=="Uttar Pradesh":
        state_code=26 
    elif state=="Uttarakhand":
        state_code=27 
    elif state=="West Bengal":
        state_code=28 
    elif state=="Andaman and Nicobar Island":
        state_code=29 
    elif state=="Dadra Nagar Haveli and Daman and Diu":
        state_code=30 
    elif state=="Chandigarh":
        state_code=31 
    elif state=="Delhi":
        state_code=32 
    elif state=="Jammu and Kashmir":
        state_code=33 
    elif state=="Lakshadweep":
        state_code=34 
    elif state=="Pudducherry":
        state_code=35 
    elif state=="Ladakh":
        state_code=36
    
    state = state_code
    
    file = pd.read_csv("../DataSets/Cat_Crop.csv")                          
    data_frame = file.loc[file["States"]==state, "Rainfall"]   
    rain = float(data_frame.unique())
    
    df = file.loc[file["States"]==state,"Ground Water"]       
    ground_water = float(df.unique())
    
    temp = data["Temperature"]    
    temp = float(temp)
    
    date = data["date"]      
    date = str(date)
    month=int(date[5:7])   
    season=4
    if month == 11 or month == 12 or month==1 or month==2:      
        season=2
    elif month==6 or month==7 or month==8 or month==9:
        season=1
    elif month==3 or month==4:
        season=3
    else:
        season = 4
    
    input_dict={}                                               
    
    input_dict["States"] = state_code
    input_dict["Rainfall"] = rain
    input_dict["Ground Water"] = ground_water
    input_dict["Temperature"] = temp
    input_dict["Soil_type"] = soil_type
    input_dict["Season"] = season
    
    output = json.dumps(input_dict)
    with open("input.json","w") as sout:
        sout.write(output)
    
    filename = "../pickleFiles/finalized_model.sav"
    loaded_model = joblib.load(filename)
    
    file_path = "input.json"
    with open(file_path) as f:
      data = json.load(f)
    temp=list(data.values())
    
    inp_array=np.array(temp)                                   
    inp_array=inp_array.reshape(1,-1)
    prediction=loaded_model.predict(inp_array)
    print(prediction)
    prediction = list(prediction)
    
    pred_crop_name = prediction[0]
   
    jsonFilePath = "../Datasets/Prediction.json"                                 
    with open (jsonFilePath) as fp:
        Final_rec = json.load(fp)
    final_pred = Final_rec[pred_crop_name]

    print(final_pred)
    return { "final_pred": final_pred }



{"final_pred": "{\"Crops\": \"muskmelon\", \"Fertilisers required\": \"NA\", \"Cost of cultivation\": \"NA\", \"Expected revenues\": \"NA\", \"Quantity of seeds per hectare\": \"NA\", \"Duration of cultivation\": \"NA\", \"Demand of crop\": \"NA\", \"Crops for mixed cropping\": \"NA\"}"}
{"final_pred":{"Crops":"Moong","Fertilisers required":"Phosphorus,Nitrogen,Rhizobium","Cost of cultivation":"5,954","Expected revenues":"40,000","Quantity of seeds per hectare":"22kg","Duration of cultivation":"60-65","Demand of crop":"Moderate","Crops for mixed cropping":"Cotton"}}