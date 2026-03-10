from flask import Blueprint, jsonify

message_bp = Blueprint("message", __name__)

@message_bp.route("/message", methods=["GET"])
def get_message():
    return jsonify({"message": "Welcome to the Coffee Shop API!"})
