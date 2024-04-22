// Product.js

import React from "react";
import { useAuthContext } from "../../context/AuthContext";

const Product = ({ product, onAddToCart }) => {
  const { authUser } = useAuthContext();

  const handleClick = () => {
    onAddToCart(product);
  };

  // handle add to wishlist func
  const handleWishlist = (product) => {
    const productData = {
      userId: authUser?._id,
      productId: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      imageURL: product.imageURL,
    };

    fetch("http://localhost:5000/store/wishlist", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(productData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="card card-compact w-96  shadow-x m-5 bg-slate-50">
      <figure>
        <img
          src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <div className="flex justify-between">
          <h2 className="card-title text-blue-600">{product.name}</h2>
          <h2 className="card-title text-slate-700">Price: ${product.price}</h2>
        </div>
        <p className="text-slate-500">{product.description}</p>

        <div className="card-actions justify-between">
          <button
            onClick={() => handleWishlist(product)}
            className="btn btn-secondary"
          >
            Wishlist
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>

          <button onClick={handleClick} className="btn btn-primary">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
