import mongoose from 'mongoose';

const setSchema = mongoose.Schema({
    dayId: String,
    setName: String
});

const Set = mongoose.model('Set', setSchema);

export default Set;