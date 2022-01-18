import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, select:false },
  createdAt: { type: Date, default: Date.now },
  castle: [{type: Schema.Types.ObjectId, ref: 'castle'}] 
});

export default model("User", userSchema);
