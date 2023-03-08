import mongoose from "mongoose";

const daySchema = mongoose.Schema({
  weekId: mongoose.Types.ObjectId,
  dayOfWeek: String,
});

const Day = mongoose.model("Day", daySchema);

export default Day;
