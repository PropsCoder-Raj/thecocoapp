
const { childServices } = require('../service/child');
const { findAllChildren, insertChild, findChildCount, findChild, updateChild } = childServices;

const { levelServices } = require('../service/levels');
const { findAllLevels, findLevel } = levelServices;

const { lessonServices } = require('../service/lessons');
const { findAllLessons } = lessonServices;

const { questionServices } = require('../service/questions');
const { findAllQuestions, findQuestion } = questionServices;

const { standardServices } = require('../service/standards');
const { aggregateStandards, findStandard } = standardServices;

const { completedModulesService } = require('../service/completedmodules');
const { findAllCompletedModules, updateCompletedModule } = completedModulesService;

const { completedLevelsService } = require('../service/completedlevels');
const { findAllCompletedLevels, createCompletedLevel, updateCompletedLevel } = completedLevelsService;

const { completedQuestionsService } = require('../service/completedquestions');
const { findAllCompletedQuestions, findCompletedQuestion, createCompletedQuestion, updateCompletedQuestion } = completedQuestionsService;


/**
* @swagger
* /questions/attempt-questions:
*   post:
*     summary: Attempt Questions
*     tags:
*       - Questions
*     description: Endpoint to attempt questions by submitting the selected answers.
*     produces:
*       - application/json
*     parameters:
*       - in: header
*         name: token
*         description: JWT token obtained after user authentication.
*         required: true
*         schema:
*           type: string
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/definitions/attempt_question_def'
*     responses:
*       '200':
*         description: Successfully recorded the attempted question.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 status:
*                   type: boolean
*                 message:
*                   type: string
*                 data:
*                   type: object
*       '400':
*         description: Invalid input, object invalid.
*       '409':
*         description: Conflict, the question has already been attempted.
*/
exports.attemptQuestions = async (req, res, next) => {
    try {
        const { question_id, module_id, level_id, answer, question_no, demo } = req.body;
        let correctAnswerStatus = false, points = 0, nextScreen = "", nextQuestionId = null, nextQuestionNo = null, totalPoints = 0;

        const question = await findQuestion({ _id: question_id, module_id, level_id });
        const levelDetails = await findLevel({ _id: level_id });

        if (question.right_answer == answer) {
            correctAnswerStatus = true;
        }

        const isCompletedQuesitons = await findCompletedQuestion({ question_id, module_id, level_id, child_id: req.user.currentChildActive, user_id: req.user.id, user_id: req.user._id });
        if (isCompletedQuesitons) {
            if (isCompletedQuesitons.correstAnswer == false) {
                points = correctAnswerStatus ? 25 : 0;
                await updateCompletedQuestion({ _id: isCompletedQuesitons._id }, { points, correstAnswer: correctAnswerStatus });
            }
        } else {
            points = correctAnswerStatus ? 50 : 0;
            await updateCompletedQuestion(
                { question_id, module_id, level_id, child_id: req.user.currentChildActive, user_id: req.user.id, user_id: req.user._id }, {
                    $set: {
                        question_id, module_id, level_id, child_id: req.user.currentChildActive, user_id: req.user.id, user_id: req.user._id,
                        points, correstAnswer: correctAnswerStatus
                    }
            });
        }

        const listCompletedQuesitons = await findAllCompletedQuestions({ module_id, level_id, child_id: req.user.currentChildActive, user_id: req.user._id });
        let listQuuestions = await findAllQuestions({ module_id, level_id });
        listQuuestions = listQuuestions.map((question) => {
            const completeQuestion = listCompletedQuesitons.find((completedQuestion) => completedQuestion.question_id.toString() == question._id.toString());
            return { _id: question._id, question_id: question.question_id, attemp: completeQuestion ? true : false, correct: completeQuestion ? completeQuestion.correstAnswer : false, points: completeQuestion ? completeQuestion.points : 0 }
        });

        if (question_no == 1) {
            const question2 = listQuuestions.find((question) => question.question_id == 2);
            if (question2.attemp && question2.correct) {
                const question3 = listQuuestions.find((question) => question.question_id == 3);
                if (question3.attemp && question3.correct) {
                    const question1 = listQuuestions.find((question) => question.question_id == 1);
                    if (question1.attemp && question1.correct) {
                        nextScreen = "SCORE_BOARD";
                    } else {
                        nextQuestionId = question1._id;
                        nextQuestionNo = 1;
                        nextScreen = `Q 1`;
                    }
                } else {
                    nextQuestionId = question3._id;
                    nextQuestionNo = 3;
                    nextScreen = `Q 3`;
                }
            } else {
                nextScreen = `Q 2`;
                nextQuestionId = question2._id;
                nextQuestionNo = 2;
            }
        } else if (question_no == 2) {
            const question3 = listQuuestions.find((question) => question.question_id == 3);
            if (question3.attemp && question3.correct) {
                const question1 = listQuuestions.find((question) => question.question_id == 1);
                if (question1.attemp && question1.correct) {
                    const question2 = listQuuestions.find((question) => question.question_id == 2);
                    if (question2.attemp && question2.correct) {
                        nextScreen = "SCORE_BOARD";
                    } else {
                        nextQuestionId = question2._id;
                        nextQuestionNo = 2;
                        nextScreen = `Q 2`;
                    }
                } else {
                    nextQuestionId = question1._id;
                    nextQuestionNo = 1;
                    nextScreen = `Q 1`;
                }
            } else {
                nextScreen = `Q 3`;
                nextQuestionId = question3._id;
                nextQuestionNo = 3;
            }
        } else if (question_no == 3) {
            const question1 = listQuuestions.find((question) => question.question_id == 1);
            if (question1.attemp && question1.correct) {
                const question2 = listQuuestions.find((question) => question.question_id == 2);
                if (question2.attemp && question2.correct) {
                    const question3 = listQuuestions.find((question) => question.question_id == 3);
                    if (question3.attemp && question3.correct) {
                        nextScreen = "SCORE_BOARD";
                    } else {
                        nextQuestionId = question3._id;
                        nextQuestionNo = 3;
                        nextScreen = `Q 3`;
                    }
                } else {
                    nextQuestionId = question2._id;
                    nextQuestionNo = 2;
                    nextScreen = `Q 2`;
                }
            } else {
                nextScreen = `Q 1`;
                nextQuestionId = question1._id;
                nextQuestionNo = 1;
            }
        }

        let listAllQuestions = await findAllCompletedQuestions({ module_id, level_id, child_id: req.user.currentChildActive, user_id: req.user._id });
        let susscessQuestions = listAllQuestions.filter((question) => question.correstAnswer == true).length;
        let loaderPercentage = Math.ceil(33.33 * susscessQuestions)
        totalPoints = listAllQuestions.reduce((totalPoints, question) => totalPoints + question.points, 0);
        
        if(nextScreen == "SCORE_BOARD" && demo == false){
            let listChildAllQuestions = await findAllCompletedQuestions({ child_id: req.user.currentChildActive });
            let totalPointsChild = listChildAllQuestions.reduce((totalPoints, question) => totalPoints + question.points, 0);
            await updateChild({ _id: req.user.currentChildActive }, { $set: { totalPoints: totalPointsChild } });
            await updateCompletedLevel({ module_id: module_id, level_id: level_id, child_id: req.user.currentChildActive, user_id: req.user._id },
                { $set: { module_id: module_id, level_id: level_id, child_id: req.user.currentChildActive, user_id: req.user._id, completedStatus: true } });

            if(levelDetails.level_id == 6){
                await updateCompletedModule({ module_id: module_id, child_id: req.user.currentChildActive, user_id: req.user._id }, {
                    $set: { module_id: module_id, child_id: req.user.currentChildActive, user_id: req.user._id, completedStatus: true }
                })
            }
        }

        return res.status(200).send({
            status: true,
            message: "Attemplt Questions Successfully.",
            result: {
                correctAnswerStatus,
                loaderPercentage,
                right_answer: question.right_answer,
                desc: question.desc,
                nextQuestionId,
                nextQuestionNo,
                totalPoints,
                nextScreen,
                levelNo: `Level ${levelDetails.level_id}`,
                levelName: `${levelDetails.name}`,
            },
            // listQuuestions,
            // body: req.body,
            // question
        });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};
