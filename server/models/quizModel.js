// using Node.js 'require()'
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuizSchema = new Schema({
    mustBeSignedIn: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: true
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
    imgUrl: {
        type: String,
        required: false
    },
    createdBy: {
        type: Schema.Types.ObjectID,
        required: true
    },
    scores: {type: Array, default: []},
    createdAt: {
        type: Date,
        default: new Date()
    },
    deleted: {
        type: Boolean,
        default: false
    }
})

const Quiz = mongoose.model("Quiz", QuizSchema);

module.exports = Quiz;