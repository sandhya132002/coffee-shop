from flask import Blueprint, jsonify, request, url_for
from werkzeug.utils import secure_filename
import os
from datetime import datetime

coffee_bp = Blueprint("coffee", __name__)  # Create Blueprint

# Raw coffee data without image URLs
coffees_data = [
    {"id": 1, "name": "Espresso", "price": 3.5, "image": "Espresso.jpg"},
    {"id": 2, "name": "Latte", "price": 4.0, "image": "Latte.jpg"},
    {"id": 3, "name": "Cappuccino", "price": 4.5, "image": "Cappuccino.jpg"},
    {"id": 4, "name": "Flat white", "price": 5.0, "image": "Flat white.jpg"},
    {"id": 5, "name": "Affogato", "price": 5.55, "image": "Affogato.jpg"},
    {"id": 6, "name": "Cold brew", "price": 5.80, "image": "Cold brew.jpg"},
    {"id": 7, "name": "Café au lait", "price": 6.0, "image": "Café au lait.jpg"},
    {"id": 8, "name": "Cortado", "price": 6.50, "image": "Cortado.jpg"},
]

@coffee_bp.route("/", methods=["GET"])
def get_coffees():
    """Returns a list of coffee items with image URLs"""
    try:
        coffees = [
            {
                "id": coffee["id"],
                "name": coffee["name"],
                "price": coffee["price"],
                "description": coffee.get("description", ""),
                "image_url": url_for('static', filename=f'images/{coffee["image"]}', _external=True)
            }
            for coffee in coffees_data
        ]
        return jsonify(coffees)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@coffee_bp.route("/add", methods=["POST"])
def add_coffee():
    """Add a new coffee item"""
    try:
        data = request.get_json()
        if not data or 'name' not in data or 'price' not in data:
            return jsonify({"error": "Missing required fields"}), 400

        # Generate new ID
        new_id = max(coffee['id'] for coffee in coffees_data) + 1 if coffees_data else 1

        # Handle image filename (default if not provided)
        image_filename = data.get("image", "default.jpg")
        
        new_coffee = {
            "id": new_id,
            "name": data["name"],
            "price": float(data["price"]),
            "description": data.get("description", ""),
            "image": image_filename,
            "created_at": datetime.utcnow().isoformat()
        }
        
        coffees_data.append(new_coffee)
        
        return jsonify({
            "message": "Coffee added successfully!",
            "coffee": {
                **new_coffee,
                "image_url": url_for('static', filename=f'images/{image_filename}', _external=True)
            }
        }), 201
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500