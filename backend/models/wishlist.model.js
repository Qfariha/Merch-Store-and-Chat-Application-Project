import mongoose from "mongoose";
const { Schema } = mongoose;

const wishlistSchema = new Schema(
  {
    userId: { type: String, required: true },
    productId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

export default Wishlist;
