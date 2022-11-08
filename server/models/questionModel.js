// using Node.js 'require()'
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    question: {
        type: String,
        required: true,
    },    
    keyA: {
        type: String,
        required: true,
    },
    keyB:{
        type: String,
        required: true
    },
    keyC:{
        type: String,
        required: true
    },
    keyD:{
        type: String,
        required: true
    },
    correctKey:{
        type: String,
        required: true
    }
});

const Question = mongoose.model("Question", questionSchema, "questions");

module.exports = Question;