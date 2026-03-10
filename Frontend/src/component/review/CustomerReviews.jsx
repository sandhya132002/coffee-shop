import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import './review.css';

const initialReviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    review: "Absolutely love this coffee shop! The latte art is always beautiful and the atmosphere is cozy.",
    rating: 5,
    img: "https://randomuser.me/api/portraits/women/11.jpg"
  },
  {
    id: 2,
    name: "Michael Lee",
    review: "Best espresso I've had in the city. Friendly staff and amazing pastries too!",
    rating: 4,
    img: "https://randomuser.me/api/portraits/men/12.jpg"
  },
  {
    id: 3,
    name: "Emily Davis",
    review: "A great spot to work or relax. Their cappuccino is a must-try!",
    rating: 5,
    img: "https://randomuser.me/api/portraits/women/13.jpg"
  },
  {
    id: 4,
    name: "John Doe",
    review: "The ambiance is perfect for a casual meetup. Definitely coming back soon!",
    rating: 4,
    img: "https://randomuser.me/api/portraits/men/14.jpg"
  },
  {
    id: 5,
    name: "Sophia Carter",
    review: "Love the variety of coffee beans they offer. Great vibes and even better coffee!",
    rating: 5,
    img: "https://randomuser.me/api/portraits/women/15.jpg"
  },
];

function CustomerReviews() {
  const [reviews, setReviews] = useState(initialReviews);
  const [reviewText, setReviewText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const renderStars = (rating) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={`text-yellow-500 ${i < rating ? 'fill-current' : 'text-gray-300'}`}
        />
      );
    }
    return stars;
  };

  const handleSubmit = () => {
    if (reviewText.trim() === "") {
      alert("Please write something first!");
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      const newReview = {
        id: reviews.length + 1,
        name: "Anonymous User",
        review: reviewText,
        rating: 5,
        img: "https://randomuser.me/api/portraits/lego/1.jpg", // Cute lego profile
      };

      setReviews([newReview, ...reviews]);
      setReviewText("");
      setSubmitting(false);
    }, 1000);
  };

  return (
    <section className="py-16 bg-gradient-to-r from-yellow-100 via-yellow-200 to-yellow-300 min-h-screen">
      <div className="max-w-7xl mx-auto text-center px-6">
        <h2 className="text-4xl font-bold text-gray-800 mb-12 tracking-wide">Customer Reviews</h2>

        {/* Reviews */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div 
              key={review.id} 
              className="bg-white p-6 rounded-2xl shadow-xl transform hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-fade-in"
            >
              <div className="flex items-center mb-4">
                <img src={review.img} alt={review.name} className="w-14 h-14 rounded-full object-cover mr-4" />
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-yellow-600">{review.name}</h3>
                  <div className="flex">{renderStars(review.rating)}</div>
                </div>
              </div>
              <p className="text-gray-600 italic text-base leading-relaxed review">"{review.review}"</p>
            </div>
          ))}
        </div>

        {/* Add a New Review */}
        {/* <div className="mt-16">
          <h3 className="text-2xl text-gray-700 font-bold mb-4">Share Your Experience</h3>
          <textarea 
            className="w-full p-4 border-2 border-yellow-400 rounded-md shadow-md bg-white resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500"
            rows="4"
            placeholder="Tell us about your visit... (max 250 characters)"
            maxLength="250"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="mt-4 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-2 rounded-lg shadow-lg transition-all duration-300"
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </div> */}
      </div>
    </section>
  );
}

export default CustomerReviews;
