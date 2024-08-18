
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

const { currentQuestionsService } = require('../service/currentquestions');
const { findAllCurrentQuestions } = currentQuestionsService;


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

        // Pipeline to check if modules are present for the child's standard
        const pipelineIsModulePresent = [
            {
                $lookup: {
                    from: "modules",
                    localField: "_id",
                    foreignField: "standard_id",
                    as: "modules",
                },
            },
            {
                $match: {
                    standard_id: {
                        $gt: 3,
                    },
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
        const currentQuestionsList = await findAllCurrentQuestions();

        let currentChapterName = "";

        // Process modules to include complete_status for modules and levels
        let processedModules = result.map((resElement) => ({
            ...resElement, modules: [...resElement.modules.map(module => ({
                ...module,
                complete_status: !!completedModulesList.find(element =>
                    element.module_id.toString() === module._id.toString() &&
                    (element.child_id && req.user.currentChildActive ?
                        (element.child_id.toString() === req.user.currentChildActive.toString() && element.user_id.toString() === req.user._id.toString()) :
                        element.user_id.toString() === req.user._id.toString())
                ),
                levels: levelsLists
                    .filter(level => level.module_id.toString() === module._id.toString())
                    .map(level => ({
                        ...level._doc,
                        currentQuestionDetails: currentQuestionsList.find(element =>
                            element.level_id.toString() === level._id.toString() &&
                            element.module_id.toString() === module._id.toString() &&
                            (element.child_id && req.user.currentChildActive ?
                                (element.child_id.toString() === req.user.currentChildActive.toString() && element.user_id.toString() === req.user._id.toString()) :
                                element.user_id.toString() === req.user._id.toString())),
                        complete_status: !!completedLevelsList.find(element =>
                            element.level_id.toString() === level._id.toString() &&
                            element.module_id.toString() === module._id.toString() &&
                            (element.child_id && req.user.currentChildActive ?
                                (element.child_id.toString() === req.user.currentChildActive.toString() && element.user_id.toString() === req.user._id.toString()) :
                                element.user_id.toString() === req.user._id.toString())
                        )
                    }))
            }))]
        }))

        for (let indexi = 0; indexi < processedModules.length; indexi++) {
            const element = processedModules[indexi];

            for (let indexj = 0; indexj < element.modules.length; indexj++) {
                const modules = element.modules[indexj];
                updateCurrentStatus(modules.levels);

                if (!req.user.currentChildActive && indexi != 0) {
                    element.modules[indexj].levels[0].current_status = false;
                }

                if (indexj != 0) {
                    if (element.modules[indexj - 1].complete_status == false) {
                        element.modules[indexj].levels[0].current_status = false;
                    }
                }
            }
        }
        
        let levelCount = 1;
        if (req.user.currentChildActive) {
            const child = await findChild({ _id: req.user.currentChildActive });
            for (let index = 0; index < processedModules.length; index++) {
                const element = processedModules[index];
                if (child.standard) {
                    if (Number(element.standard_id) > Number(child.standard)) {
                        if (processedModules[index].modules && processedModules[index].modules.length > 0) {
                            processedModules[index].modules[0].levels[0].current_status = false;
                        }
                    }
                } else {
                    if (element.standard_id > 4) {
                        if (processedModules[index].modules && processedModules[index].modules.length > 0) {
                            processedModules[index].modules[0].levels[0].current_status = false;
                        }
                    }
                    for (let indexL = 0; indexL < processedModules[index].modules.length; indexL++) {
                        const elementL = processedModules[index].modules[indexL];
                        elementL.module_number = levelCount;
                        levelCount++;
                    }
                }
            }
        } else {
            for (let index = 0; index < processedModules.length; index++) {
                for (let indexL = 0; indexL < processedModules[index].modules.length; indexL++) {
                    const elementL = processedModules[index].modules[indexL];
                    elementL.module_number = levelCount;
                    levelCount++;
                }
            }
        }

        let currentModule = "", currentLevel = "", currentStandard = "", isStandard = true;
        for (let indexi = 0; indexi < processedModules.length; indexi++) {
            const elementi = processedModules[indexi];
            for (let indexj = 0; indexj < elementi.modules.length; indexj++) {
                const modules = elementi.modules[indexj];
                if(modules.module_number != undefined){
                    isStandard = false;
                }
                for (let indexk = 0; indexk < modules.levels.length; indexk++) {
                    const levels = modules.levels[indexk];
                    if(levels.current_status == true){
                        const standardId = await findStandard({_id: levels.standard_id});
                        currentStandard = standardId.standard_id;
                        currentModule = modules.module_id;
                        currentLevel = levels.level_id;
                    }
                }
            }
        }


        return res.status(200).send({
            status: true,
            message: "Get Modules Data Successfully.",
            result: processedModules,
            currentModule,
            currentLevel,
            currentStandard,
            standard: isStandard
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
        const lessonsLists = await findAllLessons({ level_id: level_id, module_id: module_id });
        return res.status(200).send({
            status: true,
            message: "Get Leesons Data Successfully.",
            result: lessonsLists,
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
        const standard = await findAllCompletedLevels({ level_id: level_id, module_id: module_id, child_id: req.user.currentChildActive, user_id: req.user._id })
        let questionsLists = await findAllQuestions({ level_id: level_id, module_id: module_id });

        const listCompletedQuestions = await findAllCompletedQuestions();
        let currentQuestion = questionsLists[0]._id, currentPage = 1, previousQuestionsComplete = true, attamptedQuestions = standard.length > 0 ? true : false;

        for (let index = 0; index < questionsLists.length; index++) {
            const elementQuestions = questionsLists[index];
            const isCompletedQuesitons = listCompletedQuestions.find((element) =>
                element.module_id.toString() == module_id.toString() &&
                element.level_id.toString() == level_id.toString() &&
                element.question_id.toString() == elementQuestions._id.toString() &&
                (element.child_id && req.user.currentChildActive ?
                    (element.child_id.toString() === req.user.currentChildActive.toString() && element.user_id.toString() === req.user._id.toString()) :
                    element.user_id.toString() === req.user._id.toString())
            )
            previousQuestionsComplete = isCompletedQuesitons ? isCompletedQuesitons.correstAnswer : false;
            if (isCompletedQuesitons) {
                if (isCompletedQuesitons.correstAnswer) {
                    if (index > 0) {
                        currentQuestion = elementQuestions._id;
                        currentPage = 1;
                    }
                }
            }
        }

        questionsLists = questionsLists.map((element) => ({ ...element._doc, right_answer: undefined, desc: undefined }))

        return res.status(200).send({
            status: true,
            message: "Get Questions Data Successfully.",
            result: { attamptedQuestions, currentQuestion, currentPage, quesitons: questionsLists }
        });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};


/**
* @swagger
* /dashboard/get-lessons-single:
*   get:
*     summary: Get lessons
*     tags:
*       - Dashboard
*     description: Get lessons
*     produces:
*       - application/json'
*     parameters:
*       - in: query
*         name: level_id
*         description: Level Doc Id
*         type: string
*       - in: query
*         name: _id
*         description: lesssons Doc Id
*         type: string
*     responses:
*       '200':  
*         description: OK
*       '400':
*         description: Bad Request
*       '409':
*         description: Conflict
*/
exports.getLessonsSingle = async (req, res, next) => {
    try {
        const { level_id, _id } = req.query;
        if(!level_id || !_id){
            return res.status(400).send({ status: false, message: "Please provide level_id or _id" });
        }
        const lessonsLists = await findAllLessons(req.query);
        return res.status(200).send({
            status: true,
            message: "Get Leesons Data Successfully.",
            result: lessonsLists,
        });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};
