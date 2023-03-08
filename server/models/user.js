import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: String,
  passwordHash: String,
  email: String,
  colorScheme: String,
  weightUnits: String,
});

const User = mongoose.model("User", userSchema);

export default User;
