import mongoose from "mongoose";

const { Schema, model } = mongoose;

const castleSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  countInStock: { type: Number, required: true },
  rating: { type: Number, required: true },
  numReviews: { type: Number, required: true },
  description: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId , required: true, ref:'User' },
  city: { type: String, required: true },
  country: { type: String, required: true },
  lon: { type: String, required: true },
  lat: { type: String, required: true },
});

export default model("Castle", castleSchema);
