from .auth_routes import auth_bp
from .coffees_routes import coffee_bp
from .message_routes import message_bp
from .order_routes import order_bp
from .contact_routes import contact_bp



__all__ = ['auth_bp', 'coffee_bp', 'message_bp', 'order_bp', 'contact_bp']
