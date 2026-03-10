from flask import Blueprint, request, jsonify
from datetime import datetime
from bson import ObjectId
from extensions import mongo

contact_bp = Blueprint('contact', __name__)

@contact_bp.route('/contact', methods=['POST'])
def submit_contact():
    try:
        data = request.get_json()
        
        # Validate required fields
        if not all([data.get('name'), data.get('email'), data.get('message')]):
            return jsonify({
                "success": False,
                "error": "Missing required fields (name, email, message)"
            }), 400

        # Create contact document
        contact_data = {
            "name": data['name'],
            "email": data['email'],
            "message": data['message'],
            "created_at": datetime.utcnow(),
            "status": "unread"
        }

        # Insert into MongoDB
        result = mongo.db.contacts.insert_one(contact_data)
        
        return jsonify({
            "success": True,
            "message": "Contact form submitted successfully!",
            "contact_id": str(result.inserted_id)
        }), 201

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@contact_bp.route('/contacts', methods=['GET'])
def get_contacts():
    try:
        contacts = list(mongo.db.contacts.find().sort("created_at", -1))
        
        # Convert ObjectId to string and format dates
        for contact in contacts:
            contact['_id'] = str(contact['_id'])
            contact['created_at'] = contact['created_at'].isoformat()
        
        return jsonify({
            "success": True,
            "contacts": contacts
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500