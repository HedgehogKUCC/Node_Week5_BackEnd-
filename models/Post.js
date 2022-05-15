const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        userID: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
        },
        content: {
            type: String,
            required: [true, '【貼文內容】必填'],
            trim: true,
        },
        image: {
            type: String,
            trim: true,
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        versionKey: false,
    }
);

const PostModel = mongoose.model('Post', postSchema);

module.exports = PostModel;