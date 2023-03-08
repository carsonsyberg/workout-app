import mongoose from "mongoose";

const workoutSchema = mongoose.Schema({
  userId: mongoose.Types.ObjectId,
  workoutName: String,
  isDefault: String,
  description: String,
});

const Workout = mongoose.model("Workout", workoutSchema);

export default Workout;
