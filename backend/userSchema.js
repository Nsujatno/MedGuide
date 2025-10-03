import mongoose from "mongoose";

//user information
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  }, 
  
  lastName: {
    type: String,
    required: true,
  },

  username: {
    type: String,
    required: true,
  },
  
  phone: {
    type: String,
    required: true,
  },
  
  age: {
    type: Number,
    required: true,
  },
  
  gender: {
    type: String,
    required: true,
  }
});

//creates model
const UserModel = mongoose.model("users", userSchema)

export default UserModel;