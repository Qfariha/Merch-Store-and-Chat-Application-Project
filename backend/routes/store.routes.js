// productRoutes.js
import express from "express";
import * as cartController from "../controllers/cart.controller.js";
import checkoutController from "../controllers/checkout.controller.js";
import * as productController from "../controllers/product.controller.js";
import {
  addToWishlist,
  getWishlist,
  removeWishlistItem,
} from "../controllers/wishlist.controller.js";
const router = express.Router();

// Routes for CRUD operations on products
router.get("/products", productController.getAllProducts);
router.post("/products", productController.createProduct);
router.get("/products/:id", productController.getProductById);
router.put("/products/:id", productController.updateProduct);
router.delete("/products/:id", productController.deleteProduct);

// Routes for cart management
router.get("/cart", cartController.getCart);
router.post("/cart/add", cartController.addToCart);
router.put("/cart/update/:productId", cartController.updateCartItem);
router.delete("/cart/remove/:productId", cartController.removeFromCart);
router.delete("/cart/clear", cartController.clearCart);

// Routes for wishlist management
router.post("/wishlist", addToWishlist);
router.get("/wishlist/:userId", getWishlist);
router.delete("/wishlist/:productId", removeWishlistItem);
// router.delete("/wishlist/remove/:productId", cartController.removeFromCart);

// Routes for checkout
router.post("/checkout", checkoutController.processOrder);

export default router;
