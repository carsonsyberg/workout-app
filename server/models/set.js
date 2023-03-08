import mongoose from "mongoose";

const setSchema = mongoose.Schema({
  dayId: mongoose.Types.ObjectId,
  setName: String,
  notes: String,
});

const Set = mongoose.model("Set", setSchema);

export default Set;
