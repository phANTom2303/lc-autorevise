const mongoose = require('mongoose');


// This defines the structure for a single problem within the user's list
const problemSchema = new mongoose.Schema({
    questionId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    titleSlug: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        required: true
    },
    status: {
        type: String,
        enum: ['Revising', 'Learning', 'Mastered'],
        default: 'Learning'
    },
    nextRevisionDate: {
        type: Date,
        required: true,
        index: true // Indexed for efficient querying of problems due for revision
    },
    lastRevisedDate: {
        type: Date
    },
    revisionInterval: { // The current interval in days for spaced repetition
        type: Number,
        default: 1
    },
    // This will store references to all submissions for this specific problem
    submissions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Submission'
    }]
}, { _id: false }); // _id: false because this is a sub-document

const problemListSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true // Each user gets exactly one problem list
    },
    problems: [problemSchema]
}, {
    timestamps: true
});

const ProblemList = mongoose.model('ProblemList', problemListSchema);

module.exports = ProblemList;