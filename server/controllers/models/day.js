import mongoose from 'mongoose';

const daySchema = mongoose.Schema({
    workoutId: String,
    dayOfWeek: String,
    dayName: String
});

const Day = mongoose.model('Day', daySchema);

export default Day;