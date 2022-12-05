import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    workDay: {
        type: Date,
        default: new Date()
    },
    excName: String,
    repNum: Number
});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;