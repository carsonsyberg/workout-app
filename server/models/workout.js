import mongoose from 'mongoose';

const workoutSchema = mongoose.Schema({
    workoutName: String,
    isDefault: Boolean
});

const Workout = mongoose.model('Workout', workoutSchema);

export default Workout;