from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from pymongo import MongoClient

auth_bp = Blueprint('auth', __name__)

# MongoDB setup
client = MongoClient("mongodb://localhost:27017")
db = client["coffeeshop"]
users = db["users"]

@auth_bp.route("/auth/register", methods=["POST"])
def register():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return jsonify({"success": False, "message": "All fields are required"}), 400

    if users.find_one({"email": email}):
        return jsonify({"success": False, "message": "User already exists"}), 409

    hashed_password = generate_password_hash(password)

    users.insert_one({
        "name": name,
        "email": email,
        "password": hashed_password
    })

    return jsonify({"success": True, "message": "User registered successfully"}), 201

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"success": False, "message": "Missing email or password"}), 400

    user = users.find_one({"email": email})
    if user and check_password_hash(user["password"], password):
        return jsonify({"success": True}), 200
    else:
        return jsonify({"success": False, "message": "Invalid credentials"}), 401
