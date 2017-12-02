from flask import Flask, render_template
import requests
import zipcode
import datetime
#import sqlalchemy
# We can use google's cloud platform's cloud SQL for the database stuff?

app = Flask(__name__, static_folder="../static/dist", \
            template_folder="../static")

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
    data = parser(location)
    weightedTempDays = results(data)
    outputStrs = languageOutput(weightedTempDays)

def parser(location):
    ''' Parse the json for needed data'''
    # We are given an string of the zip.
    # to use the api, we need to change it to lat/lon
    curZipcode = zipcode.isequal(int(location))
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
        data.append((datetime.fromtimestamp(time), apparentTemp, condition))
    return data

def results(data):
    '''This function looks at the apparent temperature, and decides the 
        level of clothing needed. It will also note rainy, snowny, and sleey 
        conditions'''
    weightedTempDays = []
    weightedTempOneDay = []
    
    # Perhaps allow user to enter in when they sleep or are more active?
    # can just shift the weights easily.
    weight = {0: 0.1, 1: 0.1, 2: 0.1, 3: 0.1, 4: 0.1, 5: 0.1, 6: 0.1, 7: 0.1, \
    8: 0.2, 9: 0.2, 10: 0.3, 11: 0.5, 12: 0.7, 13: 0.7, 14: 0.7, 15: 0.7, \
    16: 0.7, 17: 0.7, 18: 0.6, 19: 0.6, 20: 0.5, 21: 0.4, 22: 0.3, 23: 0.2}
    for i in data:
        # it would be nice if we can associate the time of the rain/snow/etc
        rain = False
        sleet = False
        snow = False
        hour = i[0].hour
        day = i[0].day
        if curDay != day:
            # How do we calculate the weighted temperature??
            # right now the placeholder for that is ...
            # Winter coat, jacket, boots, gloves, hats
            level = 0
            if ... <= 40:
                # winter coar and jacket
                level = 1
            if ... <= 60:
                # heavy coat
                level = 2
            if ... <= 70:
                # light jacket
                level = 3
            else:
                # t shirt mannnnn
                level = 4
`           weightedTempDays.append((level, rain, sleet, snow))
        weightedTempOneDay.append(weight[hour]*i[1])
        if i[2] == 'rain':
            rain = True
        if i[2] == 'sleet':
            sleet = True
        if i[2] == 'snow':
            snow = True

    return weightedTempDays

def languageOutput(data):
    '''Need a way to output in grammatically correct sentences'''



# Get the jsoned weather data
def get(url):
    try:
        res = requests.get(url)
        return res.json()
    except:
        return False

if __name__ == "__main__":
	app.run()
