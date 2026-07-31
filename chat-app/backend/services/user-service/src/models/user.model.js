import mongoose from "mongoose";


const userSchema =
new mongoose.Schema(
{

  userId:{
    type:String,
    required:true,
    unique:true,
    index:true,
  },


name: {
  type: String,
  required: true,
  trim: true,
  maxlength: 50,
},


  email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
  },


description: {
  type: String,
  trim: true,
  maxlength: 100,
  default: "",
},


avatar: {
  type: String,
  trim: true,
  default: "",
},


},
{
 timestamps:true
}
);



export default mongoose.model(
 "User",
 userSchema
);