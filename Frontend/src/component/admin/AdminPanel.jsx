import React, { useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminPanel() {
    const [newItem, setNewItem] = useState({ 
        name: '', 
        description: '', 
        price: '', 
        image: 'default.jpg' // Default image
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Basic validation
        if (!newItem.name || !newItem.price) {
            toast.error("Name and price are required!");
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/coffees/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: newItem.name,
                    price: parseFloat(newItem.price),
                    description: newItem.description,
                    image: newItem.image || 'default.jpg'
                }),
            });

            const result = await response.json();
            
            if (response.ok) {
                toast.success(result.message);
                setNewItem({ 
                    name: '', 
                    description: '', 
                    price: '', 
                    image: 'default.jpg' 
                });
            } else {
                toast.error(result.error || "Failed to add item");
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error("Network error. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div id="admin" className="min-h-screen bg-gradient-to-br from-[#2e1a13] via-[#4d2f24] to-[#a58d7f] flex items-center justify-center py-12 px-4">
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
            <div className="w-full max-w-lg p-8 bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl">
                <h2 className="text-4xl font-extrabold text-white text-center mb-10 drop-shadow-lg">
                    Admin Panel
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                        <label className="block text-white text-sm font-bold mb-2">
                            Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter item name"
                            value={newItem.name}
                            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                            className="w-full px-5 py-3 rounded-xl bg-white/30 text-white placeholder-white focus:ring-2 focus:ring-yellow-400 focus:outline-none transition"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-white text-sm font-bold mb-2">Description</label>
                        <textarea
                            placeholder="Enter item description"
                            value={newItem.description}
                            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                            className="w-full px-5 py-3 rounded-xl bg-white/30 text-white placeholder-white focus:ring-2 focus:ring-yellow-400 focus:outline-none transition"
                            rows={3}
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-white text-sm font-bold mb-2">
                            Price ($) <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="Enter item price"
                            value={newItem.price}
                            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                            className="w-full px-5 py-3 rounded-xl bg-white/30 text-white placeholder-white focus:ring-2 focus:ring-yellow-400 focus:outline-none transition"
                            required
                        />
                    </div>

                    {/* Image */}
                    <div>
                        <label className="block text-white text-sm font-bold mb-2">Image Filename</label>
                        <input
                            type="text"
                            placeholder="e.g., Espresso.jpg"
                            value={newItem.image}
                            onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                            className="w-full px-5 py-3 rounded-xl bg-white/30 text-white placeholder-white focus:ring-2 focus:ring-yellow-400 focus:outline-none transition"
                        />
                        <p className="text-white/70 text-xs mt-1">
                            Available images: Espresso.jpg, Latte.jpg, etc.
                        </p>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center pt-6">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 px-10 rounded-full text-lg shadow-lg transform transition ${
                                isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                            }`}
                        >
                            {isSubmitting ? 'Adding...' : 'Add Item'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AdminPanel;