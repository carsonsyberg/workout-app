import mongoose from "mongoose";

const weekSchema = mongoose.Schema({
  workoutId: mongoose.Types.ObjectId,
  weekName: String,
});

const Week = mongoose.model("Week", weekSchema);

export default Week;
