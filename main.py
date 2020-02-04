import requests
from flask import Flask, Response, jsonify, render_template, request
from collections import namedtuple, Counter
import json

Tile = namedtuple('Tile', ['x', 'y', 'z'])
tile_counter = Counter()

app = Flask(__name__)

def after_request(resp):
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp

app.after_request(after_request)

@app.route("/tile")
def tile():
    x = request.args['x']
    y = request.args['y']
    z = request.args['z']
    t = Tile(x, y, z)
    with open('./tilefile/%s/%s_%s.png'%(z, x, y), 'rb') as f:
        image = f.read()
    tile_counter[t] += 1
    return Response(image, mimetype='image/jpeg')

@app.route("/loc")
def loc():
    location = request.args.get('location', '')
    address = request.args.get('address', '')
    params = {"key": "7K5BZ-6SWLX-HXE46-7TQE2-HIXF2-BOFDA"}
    if location != '':
        params['location'] = location
    else:
        params['address'] = address
    r = requests.get("https://apis.map.qq.com/ws/geocoder/v1/", params=params)
    print(r.url)
    return r.json()

@app.route('/', methods=['GET'])
def map():
    return render_template('index.html')

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug = True, threaded=True)
