from flask import Flask, render_template
import requests

app = Flask(__name__, static_folder="../static/dist", template_folder="../static")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/main")
def submitted():
    return render_template("index.html")

# Get the jsoned weather data
def get(url):
    try:
        res = requests.get(url)
        return res.json()
    except:
        return False

if __name__ == "__main__":
	app.run()
