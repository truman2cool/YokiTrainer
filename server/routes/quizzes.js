const express = require('express');
const quizModel = require('../models/quizModel');
const checkAuth = require('../middleware/checkauth');
const userModel = require('../models/userModel');
const scoreModel = require('../models/scoreModel');

const quizzes = express.Router();

quizzes.route("/createQuiz").post( checkAuth, (req, res) => {
    let quiz = new quizModel({
        ...req.body.quiz,
        createdBy: req.body.createdBy,
        questions: req.body.quiz.questions.map(ques => {
            return {
                ...ques,
                answers: ques.answers.map(ans => {
                    return {
                        name: ans,
                        selected: false
                    }
                })
            }
        })
    });
    quiz.save().then(result => {
        res.status(200).json({success: true});
    })
});

quizzes.route("/my-quizzes/:id").get( checkAuth, (req, res) => {

    quizModel.find({ createdBy: req.params.id })
        .then(result => {
            res.status(200).json(result);
        })
});

quizzes.route("/all-quizzes").get( checkAuth, (req, res) => {
    quizModel.find()
        .then(result => {
            res.status(200).json(result);
        })
})

quizzes.route("/get-quiz/:id").get(checkAuth, (req, res) => {
    quizModel.findOne({ _id: req.params.id }).then(quiz => {
        res.status(200).json({quiz});
    }).catch(er => {
        res.status(500).send(er);
    })
})


quizzes.route("/save-results").post(checkAuth, (req, res) => {
    let score = new scoreModel({
        userId: req.body.currentUser,
        answers: req.body.answers,
        quizId: req.body.quizId
    });
    score.save().then(async resp => {
        await quizModel.updateOne({ _id: req.body.quizId }, {
            $push: {
                scores: resp._id
            }
        });
        res.status(200).json({scoreId: resp._id});
    })
});

quizzes.route("/results/:id").get( checkAuth, (req, res) => {
    if (!req.params.id) {
        res.status(500).send("No id provided in params");
    } else {
        scoreModel.findOne({_id: req.params.id}).then(data => {
            if (!data) {
                res.status(500).send("Error finding score");
            } else {
                quizModel.findOne({_id: data.quizId}).then(quiz => {
                    if (!quiz) {
                        res.status(500).send("Error getting quiz");
                    } else {
                        res.status(200).json({score: data, quiz: quiz});
                    }
                })
            }
        }).catch((err) => {
            console.log(err);
            res.status(500).send("Error finding score");
        })
    }
})

module.exports = quizzes;