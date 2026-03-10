import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/coffee_shop")
    SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-here")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "your-jwt-secret-key-here")
    UPLOAD_FOLDER = 'static/images'
    ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png', 'gif'}