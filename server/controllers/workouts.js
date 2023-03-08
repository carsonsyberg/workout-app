import mongoose from "mongoose";
import Workout from "../models/workout.js";
import Week from "../models/week.js";
import Day from "../models/day.js";
import Set from "../models/set.js";
import Rep from "../models/rep.js";

export const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.status(200).json(workouts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getWeeks = async (req, res) => {
  try {
    const weeks = await Week.find();
    res.status(200).json(weeks);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getDays = async (req, res) => {
  try {
    const days = await Day.find();
    res.status(200).json(days);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getSets = async (req, res) => {
  try {
    const sets = await Set.find();
    res.status(200).json(sets);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getReps = async (req, res) => {
  try {
    const reps = await Rep.find();
    res.status(200).json(reps);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getWeeksByWorkoutId = async (req, res) => {
  const { id: workoutId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(workoutId))
    return res.status(404).send("No workout with that id");

  try {
    const weeks = await Week.find({ workoutId: workoutId });
    res.status(200).json(weeks);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getDaysByWeekId = async (req, res) => {
  const { id: weekId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(weekId))
    return res.status(404).send("No week with that id");

  try {
    const days = await Day.find({ weekId: weekId });
    res.status(200).json(days);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getSetsByDayId = async (req, res) => {
  const { id: dayId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(dayId))
    return res.status(404).send("No day with that id");

  try {
    const sets = await Set.find({ dayId: dayId });
    res.status(200).json(sets);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getRepsBySetId = async (req, res) => {
  const { id: setId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(setId))
    return res.status(404).send("No set with that id");

  try {
    const reps = await Rep.find({ setId: setId });
    res.status(200).json(reps);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createWorkout = async (req, res) => {
  const workout = req.body;

  const newWorkout = new Workout(workout);

  try {
    await newWorkout.save();
    res.status(201).json(newWorkout);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const createWeek = async (req, res) => {
  const week = req.body;

  const newWeek = new Week(week);

  try {
    await newWeek.save();
    res.status(201).json(newWeek);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const createDay = async (req, res) => {
  const day = req.body;

  const newDay = new Day(day);

  try {
    await newDay.save();
    res.status(201).json(newDay);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const createSet = async (req, res) => {
  const set = req.body;

  const newSet = new Set(set);

  try {
    await newSet.save();
    res.status(201).json(newSet);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const createRep = async (req, res) => {
  const rep = req.body;

  const newRep = new Rep(rep);

  try {
    await newRep.save();
    res.status(201).json(newRep);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateWorkout = async (req, res) => {
  const { id: _id } = req.params;
  const workout = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No workout with that id");

  const updatedWorkout = await Workout.findByIdAndUpdate(_id, workout, {
    new: true,
  });

  res.json(updatedWorkout);
};

export const updateWeek = async (req, res) => {
  const { id: _id } = req.params;
  const week = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No week with that id");

  const updatedWeek = await Week.findByIdAndUpdate(_id, week, { new: true });

  res.json(updatedWeek);
};

export const updateDay = async (req, res) => {
  const { id: _id } = req.params;
  const day = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No day with that id");

  const updatedDay = await Day.findByIdAndUpdate(_id, day, { new: true });

  res.json(updatedDay);
};

export const updateSet = async (req, res) => {
  const { id: _id } = req.params;
  const set = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No set with that id");

  const updatedSet = await Set.findByIdAndUpdate(_id, set, { new: true });

  res.json(updatedSet);
};

export const updateRep = async (req, res) => {
  const { id: _id } = req.params;
  const rep = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No rep with that id");

  const updatedRep = await Rep.findByIdAndUpdate(_id, rep, { new: true });

  res.json(updatedRep);
};

export const deleteWorkout = async (req, res) => {
  const { id: _id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No workout with that id");

  await Workout.findByIdAndRemove(_id);

  res.json({ message: "Workout deleted successfully" });
};

export const deleteWeek = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No week with that id");

  await Week.findByIdAndRemove(_id);

  res.json({ message: "Week deleted successfully" });
};

export const deleteDay = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No day with that id");

  await Day.findByIdAndRemove(_id);

  res.json({ message: "Day deleted successfully" });
};

export const deleteSet = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No set with that id");

  await Set.findByIdAndRemove(_id);

  res.json({ message: "Set deleted successfully" });
};

export const deleteRep = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No rep with that id");

  await Rep.findByIdAndRemove(_id);

  res.json({ message: "Rep deleted successfully" });
};
