// using Node.js 'require()'
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuizSchema = new Schema({
    mustBeSignedIn: {
        type: Boolean,
        default: false
    },
    questions: [{
        type: Object,
        contains: {
            answers: {type: Array},
            correctAnswer: String,
            questionName: String
        }
    }],
    category: {
        type: String,
        required: true
    },
    scores: {type: Array, default: []},
    createdAt: {
        type: Date,
        default: new Date()
    },
});

const Quiz = mongoose.model("Quiz", QuizSchema);

module.exports = Quiz;