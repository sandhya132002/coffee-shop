from flask import Flask, jsonify
from flask_cors import CORS
from config import Config
from extensions import mongo  # ✅ use from extensions
from routes.auth_routes import auth_bp
from routes.coffees_routes import coffee_bp
from routes.message_routes import message_bp
from  routes.order_routes import order_bp
from routes.contact_routes import contact_bp

import os

app = Flask(__name__, static_folder='static')
app.config.from_object(Config)

# Initialize MongoDB
mongo.init_app(app)  # ✅ this replaces PyMongo(app)

# Enable CORS for all routes, including allowing credentials and methods
CORS(app, 
    origins=["http://localhost:5173", "http://localhost:5174"], 
    supports_credentials=True, 
    methods=["GET", "POST", "OPTIONS"], 
    allow_headers=["Content-Type", "Authorization"]
)

# Root endpoint
@app.route('/')
def home():
    return jsonify({
        "message": "Coffee Shop API",
        "endpoints": {
            "auth": "/auth",
            "coffees": "/coffees",
            "messages": "/messages",
            "orders": "/orders",
            "contact": "/contact"
        }
    })

# Register Blueprints
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(coffee_bp, url_prefix='/coffees')
app.register_blueprint(message_bp, url_prefix='/messages')  # Blueprint registered here
app.register_blueprint(order_bp, url_prefix='/orders')
app.register_blueprint(contact_bp, url_prefix='/api')

if __name__ == '__main__':
    if not os.path.exists('static/images'):
        os.makedirs('static/images')
    app.run(debug=True, host='0.0.0.0', port=5000)
