import mongoose from 'mongoose';

const workoutSchema = mongoose.Schema({
    workoutName: String,
    isDefault: String
});

const Workout = mongoose.model('Workout', workoutSchema);

export default Workout;