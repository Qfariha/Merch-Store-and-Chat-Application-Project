import Wishlist from "../models/wishlist.model.js";

// Add item to wishlist
export const addToWishlist = async (req, res) => {
  try {
    const wishlistItem = req.body;
    const { userId, productId } = wishlistItem;

    // Check if wishlist item already exists
    const existingWishlistItem = await Wishlist.findOne({ userId, productId });

    if (existingWishlistItem) {
      return res
        .status(400)
        .json({ message: "Item already exists in wishlist" });
    }

    // If wishlist item does not exist, save it
    const wishlistData = new Wishlist(wishlistItem);
    await wishlistData.save();
    res
      .status(201)
      .json({ message: "Item added to wishlist successfully", wishlistData });
  } catch (err) {
    console.error("Error adding item to wishlist: ", err);
    res.status(400).json({ message: "Failed to add item to wishlist" });
  }
};

// Get item from wishlist
export const getWishlist = async (req, res) => {
  try {
    const userId = req.params.userId;
    const wishlistItems = await Wishlist.find({ userId });
    res.status(200).json({ wishlistItems });
  } catch (err) {
    console.error("Error fetching wishlist items: ", err);
    res.status(500).json({ message: "Failed to get wishlist items" });
  }
};

// Remove item from wishlist
export const removeWishlistItem = async (req, res) => {
  try {
    const productId = req.params.productId;
    const productData = await Wishlist.findByIdAndDelete(productId);

    if (!productData) {
      return res.status(404).json({
        status: "fail",
        message: "Wishlist Item not found",
      });
    }
    res.status(200).json({ productData });
  } catch (err) {
    console.error("Error deleting wishlist items: ", err);
    res.status(500).json({ message: "Failed to delete wishlist items" });
  }
};
