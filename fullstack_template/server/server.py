from flask import Flask, render_template
from twilio.rest import Client
from keys import *
import requests
import zipcode
import datetime
import sqlalchemy

app = Flask(__name__, static_folder="../static/dist", \
            template_folder="../static")

app.config['TEMPLATES_AUTO_RELOAD'] = 0

client = Client(account_sid, auth_token)
# renders the index page
@app.route("/")
def index():
    return render_template("index.html")

# renders the info/message page

@app.route("/main")
def submitted():
    # NEED CHANGING
    return render_template("index.html")



def driver():
    ''''''
    '''
    if activeHours == None:
        sqlalchemy.sql.insert(user).values(phone_num = phoneNumber, lastLocation = location)
    else:
        sqlalchemy.sql.insert(user).values(phone_num = phoneNumber, lastLocation = location, hours_awake  =activeHours)
    '''
    data = parser(location)
    if data == 'ERROR':
        return 'ERROR'
    weightedTempDays = results(data)
    outputStrs = languageOutput(weightedTempDays)

    verifyNumber(phoneNumber)
    
# @app.route("/sendMessage")   
def sendMessage():
    client.api.account.messages.create(
        to=phoneNumber,
        from_= fromNumber,
        body=outputStrs
        )
def verifyNumber(phoneNumber):
    validation_request = client.validation_requests \
                           .create(phoneNumber)
    # validation_request = client.validation_requests \
    #                        .create(phoneNumber, None, None, None, "/sendMessage")

    print(validation_request.validation_code)

def parser(location):
    ''' Parse the json for needed data'''
    # We are given an string of the zip.
    # to use the api, we need to change it to lat/lon
    curZipcode = zipcode.isequal(str(location))
    if curZipcode is None:
        return  'ERROR'
    lat = curZipcode.lat
    lon = curZipcode.lon

    # API url
    url = 'https://api.darksky.net/forecast/73e7ea4a962e1d8c65470b15ceda0965/'
    url = url + str(lat) + ',' + str(lon)

    # Calling the API and parsing it
    weather = get(url)
    if 'error' in weather:
        return  'ERROR'
    totalHourlyInfo = weather['hourly']
    hourlyData = totalHourlyInfo['data']
    # This is the relevent hourly data for the current location
    data = []
    for curHourData in hourlyData:
    # (time, apparentTemp, summary)
    # time is in unix timestamp, second counting from 1970 1/1
    # Summary is the condition
        condition = curHourData['icon']
        time = curHourData['time']
        apparentTemp = curHourData['apparentTemperature']
        uvIndex = curHourData['uvIndex']
        data.append((datetime.datetime.fromtimestamp(time), apparentTemp, condition, uvIndex))
    return data

def results(data):
    '''This function looks at the apparent temperature, and decides the
        level of clothing needed. It will also note rainy, snowny, and sleey
        conditions'''
    weightedTempDays = []
    weightedTempOneDay = []

    # Perhaps allow user to enter in when they sleep or are more active?
    # can just shift the weights easily.
    N = 0.01
    weight = {0: N*2, 1: N, 2: N, 3: N, 4: N, 5: N, 6: N*2, 7: N*2, \
    8: N*2, 9: N*3, 10: N*4, 11: N*6, 12: N*8, 13: N*8, 14: N*8, 15: N*8, \
    16: N*7, 17: N*7, 18: N*7, 19: N*6, 20: N*5, 21: N*4, 22: N*3, 23: N*3}
    counter = 0
    for i in data:
        # it would be nice if we can associate the time of the rain/snow/etc
        if counter <= 24:
            rain = False
            sleet = False
            snow = False
            uv = False
            hour = i[0].hour
            day = i[0].day
            if counter == 24:
                counter = 0
                # How do we calculate the weighted temperature??
                # right now the placeholder for that is ...
                # Winter coat, jacket, boots, gloves, hats
                weightTemp = sum(weightedTempOneDay)
                weightedTempOneDay = []
                level = 0
                if weightTemp <= 40:
                    # winter coar and jacket
                    level = 1
                elif weightTemp <= 60:
                    # heavy coat
                    level = 2
                elif weightTemp <= 70:
                    # light jacket
                    level = 3
                else:
                    # t shirt mannnnn
                    level = 4
                weightedTempDays.append((level, rain, sleet, snow, uv))

            weightedTempOneDay.append(weight[hour]*i[1])
            if i[3] > 5:
                uv = True
            if i[2] == 'rain':
                rain = True
            if i[2] == 'sleet':
                sleet = True
            if i[2] == 'snow':
                snow = True
            counter += 1

    return weightedTempDays

def languageOutput(weightedTempDays):
    '''Need a way to output in grammatically correct sentences'''
    output = ""
    day = weightedTempDays[0]
    if day[1]:
        output += "It's raining today. Wear rain boots and bring an umbrella!\n"
    elif day[2]:
        output += ""
    elif day[3]:
        output += "It's snowing today. Wear snow boots.\n"
    
    level = day[0]
    if level == 1:
        # do we also want to print out what the average temp or high/low temp is? 
        output += "It's very cold today. Wear a winter coat and jacket, gloves, hat, scarf, and boots.\n"
    elif level == 2:
        output += "Wear a heavy jacket today\n"
    elif level == 3: 
        output += "Wear a light jacket today\n"
    elif level == 4:
        output += "It's warm today. Wear a t-shirt\n"

    if day[4]:
        #do we want to print out what the UV index is/ what hours you should wear it
        output += "There's a high UV Index today. Make sure to wear sunscreen, a hat, and sunglasses.\n"
    print(output)
    return output




# Get the jsoned weather data
def get(url):
    try:
        res = requests.get(url)
        return res.json()
    except:
        return False

if __name__ == "__main__":
	app.run(debug=True)
