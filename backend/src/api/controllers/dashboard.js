
const { childServices } = require('../service/child');
const { findAllChildren, insertChild, findChildCount, findChild } = childServices;

const { levelServices } = require('../service/levels');
const { findAllLevels } = levelServices;

const { lessonServices } = require('../service/lessons');
const { findAllLessons } = lessonServices;

const { questionServices } = require('../service/questions');
const { findAllQuestions } = questionServices;

const { standardServices } = require('../service/standards');
const { aggregateStandards, findStandard } = standardServices;

const { completedModulesService } = require('../service/completedmodules');
const { findAllCompletedModules } = completedModulesService;

const { completedLevelsService } = require('../service/completedlevels');
const { findAllCompletedLevels } = completedLevelsService;

const { completedQuestionsService } = require('../service/completedquestions');
const { findAllCompletedQuestions } = completedQuestionsService;


const { updateCurrentStatus } = require('../helper/utils')


/**
* @swagger
* /dashboard/get-all-modules:
*   get:
*     summary: Get All Modules
*     tags:
*       - Dashboard
*     description: Get All Modules
*     produces:
*       - application/json'
*     parameters:
*       - in: header
*         name: token
*         description: JWT token obtained after user authentication
*         required: true
*         type: string
*     responses:
*       '200':  
*         description: OK
*       '400':
*         description: Bad Request
*       '409':
*         description: Conflict
*/
exports.getAllModules = async (req, res, next) => {
    try {
        const child = await findChild({ _id: req.user.currentChildActive });

        // Pipeline to check if modules are present for the child's standard
        const pipelineIsModulePresent = [
            {
                $match: {
                    standard_id: Number(child.standard),
                },
            },
            {
                $lookup: {
                    from: "modules",
                    localField: "_id",
                    foreignField: "standard_id",
                    as: "modules",
                },
            },
            {
                $addFields: {
                    isModulePresent: { $gt: [{ $size: "$modules" }, 0] },
                },
            }
        ];

        // Aggregate pipeline to check if modules exist
        const result = await aggregateStandards(pipelineIsModulePresent);
        if (result.length === 0 || !result[0].isModulePresent) {
            return res.status(404).send({
                status: false,
                message: `Modules not found.`
            });
        }

        // Fetch all levels and lessons
        const levelsLists = await findAllLevels();
        const lessonsLists = await findAllLessons();

        // Fetch completed modules and levels for the current child
        const completedModulesList = await findAllCompletedModules();
        const completedLevelsList = await findAllCompletedLevels();

        let currentChapterName = "";

        // Process modules to include complete_status for modules and levels
        let processedModules = result[0].modules.map(module => ({
            ...module,
            complete_status: !!completedModulesList.find(element =>
                element.module_id.toString() === module._id.toString() &&
                element.child_id.toString() === req.user.currentChildActive &&
                element.user_id.toString() === req.user._id
            ),
            levels: levelsLists
                .filter(level => level.module_id.toString() === module._id.toString())
                .map(level => ({
                    ...level._doc,
                    complete_status: !!completedLevelsList.find(element =>
                        element.level_id.toString() === level._id.toString() &&
                        element.module_id.toString() === module._id.toString() &&
                        element.child_id.toString() === req.user.currentChildActive.toString() &&
                        element.user_id.toString() === req.user._id.toString()
                    )
                }))
        }));

        processedModules.forEach(element => {
            updateCurrentStatus(element.levels);
            currentChapterName = element.levels.find((level) => level.current_status === true).name;
        });

        return res.status(200).send({
            status: true,
            message: "Get Child Data Successfully.",
            result: {
                ...result[0],
                modules: processedModules,
                userName: req.user.name,
                currentChapterName
            }
        });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};

/**
* @swagger
* /dashboard/get-lessons/{level_id}/{module_id}:
*   get:
*     summary: Get lessons
*     tags:
*       - Dashboard
*     description: Get lessons
*     produces:
*       - application/json'
*     parameters:
*       - in: header
*         name: token
*         description: JWT token obtained after user authentication
*         required: true
*         type: string
*       - in: path
*         name: level_id
*         description: Level Doc Id
*         required: true
*         type: string
*       - in: path
*         name: module_id
*         description: Module Doc Id
*         required: true
*         type: string
*     responses:
*       '200':  
*         description: OK
*       '400':
*         description: Bad Request
*       '409':
*         description: Conflict
*/
exports.getLessons = async (req, res, next) => {
    try {
        const { level_id, module_id } = req.params;
        const child = await findChild({ _id: req.user.currentChildActive });
        const standard = await findStandard({ standard_id: child.standard })
        const lessonsLists = await findAllLessons({ standard_id: standard._id, level_id: level_id, module_id: module_id });

        const listCompletedQuesitons = await findAllCompletedQuestions({ module_id, level_id, child_id: req.user.currentChildActive, user_id: req.user._id });
        let listQuuestions = await findAllQuestions({ module_id, level_id });
        listQuuestions = listQuuestions.map((question) => {
            const completeQuestion = listCompletedQuesitons.find((completedQuestion) => completedQuestion.question_id.toString() == question._id.toString());
            return { _id: question._id, question_id: question.question_id, attemp: completeQuestion ? true : false, correct: completeQuestion ? completeQuestion.correstAnswer : false, points: completeQuestion ? completeQuestion.points : 0 }
        });

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

        return res.status(200).send({
            status: true,
            message: "Get Leesons Data Successfully.",
            result: lessonsLists,
            nextQuestionId,
            nextQuestionNo,
            nextScreen
        });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};


/**
* @swagger
* /dashboard/get-questions/{level_id}/{module_id}:
*   get:
*     summary: Get questions
*     tags:
*       - Dashboard
*     description: Get questions
*     produces:
*       - application/json'
*     parameters:
*       - in: header
*         name: token
*         description: JWT token obtained after user authentication
*         required: true
*         type: string
*       - in: path
*         name: level_id
*         description: Level Doc Id
*         required: true
*         type: string
*       - in: path
*         name: module_id
*         description: Module Doc Id
*         required: true
*         type: string
*     responses:
*       '200':  
*         description: OK
*       '400':
*         description: Bad Request
*       '409':
*         description: Conflict
*/
exports.getQuestions = async (req, res, next) => {
    try {
        const { level_id, module_id } = req.params;
        const child = await findChild({ _id: req.user.currentChildActive });
        const standard = await findStandard({ standard_id: child.standard })
        let questionsLists = await findAllQuestions({ standard_id: standard._id, level_id: level_id, module_id: module_id });

        const listCompletedQuestions = await findAllCompletedQuestions();
        let currentQuestion = questionsLists[0]._id, currentPage = 1, previousQuestionsComplete = true;

        for (let index = 0; index < questionsLists.length; index++) {
            const elementQuestions = questionsLists[index];
            const isCompletedQuesitons = listCompletedQuestions.find((element) => 
                element.module_id.toString() == module_id.toString() && 
                element.level_id.toString() == level_id.toString() && 
                element.question_id.toString() == elementQuestions._id.toString() &&
                element.child_id.toString() === req.user.currentChildActive &&
                element.user_id.toString() === req.user._id
            )
            previousQuestionsComplete = isCompletedQuesitons ? isCompletedQuesitons.correstAnswer : false;
            if(isCompletedQuesitons){
                if(isCompletedQuesitons.correstAnswer){
                    if(index > 0){
                        currentQuestion = elementQuestions._id;
                        currentPage = 1;
                    }
                }
            }
        }

        questionsLists = questionsLists.map((element) => ({...element._doc, right_answer: undefined, desc: undefined}))

        return res.status(200).send({
            status: true,
            message: "Get Leesons Data Successfully.",
            result: { currentQuestion, currentPage, quesitons: questionsLists }
        });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};
