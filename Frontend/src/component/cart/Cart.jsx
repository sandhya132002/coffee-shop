import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Cart() {
  const [coffees, setCoffees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoffees = async () => {
      try {
        const response = await fetch("http://localhost:5000/coffees");
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        // Directly use the array of coffees from the backend
        setCoffees(data.map(coffee => ({ ...coffee, quantity: 0 })));
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("Failed to load coffee menu: " + error.message);
      }
    };
  
    fetchCoffees();
  }, []);
  



  //  if (isLoading) {
  //   return <div className="text-white text-center py-8">Loading coffee menu...</div>;
  // }

  // if (error) {
  //   return <div className="text-red-500 text-center py-8">{error}</div>;
  // }

  const increaseQuantity = (id) => {
    setCoffees((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCoffees((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const filteredCoffees = coffees.filter((coffee) =>
    coffee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPrice = filteredCoffees.reduce(
    (sum, coffee) => sum + coffee.price * coffee.quantity,
    0
  );

  const handleCheckout = async () => {
    const orderedItems = coffees.filter(item => item.quantity > 0);
  
    if (orderedItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
  
    try {
      const response = await fetch("http://127.0.0.1:5000/orders/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: orderedItems,
          total: totalPrice,
          timestamp: new Date().toISOString(),
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to place order");
      }
  
      const result = await response.json();
  
      // ✅ Create message with ordered items
      const orderSummary = orderedItems
        .map(item => `${item.name} x${item.quantity}`)
        .join(", ");
  
      toast.success(`✅ Order placed: ${orderSummary}`, {
        position: "top-right",
        autoClose: 4000,
        closeOnClick: true,
      });
  
      // Reset cart
      setCoffees(prev =>
        prev.map(coffee => ({ ...coffee, quantity: 0 }))
      );
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("❌ Error placing the order. Please try again.", {
        position: "top-right",
      });
    }
  };
  
  return (
    <div id="carts" className="bg-[#4d2f24] min-h-screen px-4 py-6">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="max-w-7xl mx-auto text-amber-400">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8">Your Cart</h1>

        {/* Search Bar */}
        <div className="mb-6 flex justify-center">
          <input
            className="w-full max-w-md px-4 py-2 rounded-md text-white bg-[#c9bbab] placeholder-gray-400 border border-gray-700 focus:outline-none focus:border-yellow-400"
            type="search"
            placeholder="Search for coffee..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Cart Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCoffees.map((coffee) => (
            <div
              key={coffee.id}
              className="p-4 rounded-xl shadow-md bg-white hover:scale-105 transition-transform border-2 border-transparent hover:border-yellow-400"
            >
              <div className="flex justify-center">
                {/* Display image from URL */}
                <img
                  src={coffee.image_url || "https://via.placeholder.com/150"}
                  alt={coffee.name}
                  className="w-32 h-32 object-cover rounded-md"
                />
              </div>

              <div className="mt-4 text-center">
                <h2 className="font-semibold text-black text-lg">{coffee.name}</h2>
                <p className="text-black font-bold">${coffee.price.toFixed(2)}</p>
              </div>

              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={() => decreaseQuantity(coffee.id)}
                  className="bg-yellow-600 hover:bg-yellow-500 px-3 py-1 rounded-md text-white text-lg"
                >
                  −
                </button>
                <span className="text-xl text-black">{coffee.quantity}</span>
                <button
                  onClick={() => increaseQuantity(coffee.id)}
                  className="bg-yellow-600 hover:bg-yellow-500 px-3 py-1 rounded-md text-white text-lg"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Total & Checkout */}
        <div className="mt-10 text-center">
          <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-4">
            Total: <span className="text-4xl font-bold text-yellow-500">${totalPrice.toFixed(2)}</span>
          </h3>
          <button
            onClick={handleCheckout}
            className="mt-4 bg-yellow-500 hover:bg-yellow-400 px-8 py-3 rounded-full text-white font-semibold shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
