import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";

const Wishlist = () => {
  const [products, setProducts] = useState([]);

  const { authUser } = useAuthContext();

  // fetching wishlist data
  useEffect(() => {
    const getWishlistItems = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/store/wishlist/${authUser?._id}`
        );
        const data = await response.json();
        console.log("data: ", data);
        if (data.error) {
          throw new Error(data.error);
        }
        setProducts(data.wishlistItems);
      } catch (error) {
        console.error("Error fetching wishlist items: ", error);
      }
    };

    getWishlistItems();
  }, [authUser?._id]);

  // delete wishlist item
  const handleRemoveWishlist = async (id) => {
    try {
      const response = await fetch(`/store/wishlist/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to remove wishlist item with ID ${id}`);
      }

      console.log(`Wishlist item with ID ${id} removed successfully`);

      // Remove the deleted item from the products state
      setProducts((prevProducts) =>
        prevProducts.filter((item) => item._id !== id)
      );

      // Perform any additional actions after successful deletion if needed
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="text-black bg-white rounded-lg p-8">
      {products.length === 0 ? (
        <p className="text-red-600 font-semibold">Your wishlist is empty</p>
      ) : (
        <div>
          <h1 className="text-xl text-black font-bold py-2 text-center">
            Wishlist
          </h1>
          <p className="text-center text-green-600 mb-4">
            You have <b>{products.length}</b> items in your wishlist
          </p>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead className="text-black text-base">
                <tr>
                  <th>Product Id</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products.map((item) => (
                  <tr key={item._id} className="cart-item">
                    <td>
                      <p>{item.productId}</p>
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="font-bold">{item.name}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p>Price: ${item.price}</p>
                    </td>
                    <th>
                      <button
                        onClick={() => handleRemoveWishlist(item._id)}
                        className="btn btn-circle btn-sm p-1 bg-red-700 text-white"
                      >
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
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
