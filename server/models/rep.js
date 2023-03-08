import mongoose from 'mongoose';

const repSchema = mongoose.Schema({
    setId: mongoose.Types.ObjectId,
    weight: Number,
    numReps: Number
});

const Rep = mongoose.model('Rep', repSchema);

export default Rep;