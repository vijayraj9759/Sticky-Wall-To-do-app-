import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  uuid:{type :String,required : true},
  name: { type: String, required: true },
  completed: { type: Boolean, required: true , default : false }
}, { strict: true });

export default mongoose.model("Todo" , todoSchema)

