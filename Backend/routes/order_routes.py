from flask import Blueprint, request, jsonify, make_response

order_bp = Blueprint("order", __name__)

@order_bp.route("/order", methods=["OPTIONS"])
def options_order():
    response = make_response('', 200)
    response.headers.add("Access-Control-Allow-Origin", "http://localhost:5173")
    response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization")
    return response

@order_bp.route("/order", methods=["POST"])
def place_order():
    data = request.get_json()
    ordered_items = data.get("items", [])
    total_price = data.get("total", 0)
    timestamp = data.get("timestamp", "")

    if not ordered_items or total_price <= 0:
        return jsonify({"error": "Invalid order data"}), 400

    order = {
        "items": ordered_items,
        "total": total_price,
        "timestamp": timestamp,
    }

    response = jsonify({"message": "Order placed successfully!", "order": order})
    response.headers.add("Access-Control-Allow-Origin", "http://localhost:5173")
    return response
