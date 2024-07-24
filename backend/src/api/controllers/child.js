const { default: mongoose } = require('mongoose');
const { childServices } = require('../service/child');
const { findAllChildren, insertChild, findAllChildrenWithPopulate, updateManyChild, findChild, updateChild } = childServices;

const { schoolServices } = require('../service/schools');
const { findSchool, findAllSchool } = schoolServices;

const { userServices } = require("../service/users")
const { createUser, findUser, updateUser } = userServices;


const { completedModulesService } = require('../service/completedmodules');
const { updateManyCompletedModules } = completedModulesService;

const { completedLevelsService } = require('../service/completedlevels');
const { updateManyCompletedLevels } = completedLevelsService;

const { completedQuestionsService } = require('../service/completedquestions');
const { updateManyCompletedQuestions, findAllCompletedQuestions } = completedQuestionsService;

/**
* @swagger
* /child/get-all-childs:
*   get:
*     summary: Get All child Records
*     tags:
*       - Child
*     description: Get All child Records
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
exports.getAllChild = async (req, res, next) => {
    try {
        const childData = await findAllChildrenWithPopulate({ userId: req.userId });
        return res.status(200).send({ status: true, message: "Get Child Data Successfully.", data: childData });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

/**
* @swagger
* /child/create:
*   post:
*     summary: Create child using token
*     tags:
*       - Child
*     description: Create child using token
*     produces:
*       - application/json
*     parameters:
*       - in: header
*         name: token
*         description: JWT token obtained after user authentication
*         required: true
*         type: string
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: array
*             items:
*               $ref: '#/definitions/create_child_def'
*     responses:
*       '200':
*         description: OK
*       '400':
*         description: Bad Request
*       '409':
*         description: Conflict
*/
exports.createChild = async (req, res, next) => {
    try {
        // Fetch current child list for the user
        let listUsersChild = await findAllChildren({ userId: req.userId });

        // Extract child list from request body
        let childList = req.body;

        // Ensure childList is an array (assuming req.body is an array of children)
        if (!Array.isArray(childList)) {
            return res.status(400).send({ status: false, message: "Request body should be an array of children." });
        }
 
        // Validate each child object in the list
        for (let child of childList) {
            if (child.schoolId && !child.standard) {
                return res.status(400).send({
                    status: false,
                    message: "Each child must have School Id and Standard fields."
                });
            }
        } 

        // Add userId to each child object in the list
        childList = childList.map((child) => ({ ...child, userId: req.userId }));

        // Check total child count before insertion
        const totalChildCount = listUsersChild.length + childList.length;
        if (totalChildCount > 3) {
            return res.status(400).send({
                status: false,
                message: `Maximum limit exceeded. You can only add up to 3 children. You already have ${listUsersChild.length} children on the platform.`
            });
        }

        // Set activeStatus for the last child in the list
        childList[childList.length - 1].activeStatus = true;

        // Insert child records
        const insertedChildren = await insertChild(childList);

        // Update user's currentChildActive field to the last inserted child's ID
        await updateUser({ _id: req.userId }, { $set: { currentChildActive: insertedChildren[insertedChildren.length - 1]._id } });

        if (listUsersChild.length > 0) {
            let listUsersChildIds = listUsersChild.map(child => child._id);
            await updateManyChild({ _id: { $in: listUsersChildIds } }, { $set: { activeStatus: false } });
        }else{
            const listQuestion = await findAllCompletedQuestions({user_id: req.userId, isDummy: false });
            const totalPoints = listQuestion.reduce((total, acc) => {
                return total + Number(acc.points)
            }, 0);
            await Promise.all([
                updateManyCompletedLevels({ user_id: req.userId }, { $set: { child_id: insertedChildren[0]._id  } }),
                updateManyCompletedModules({ user_id: req.userId }, { $set: { child_id: insertedChildren[0]._id  } }),
                updateManyCompletedQuestions({ user_id: req.userId }, { $set: { child_id: insertedChildren[0]._id  } }),
                updateChild({ _id: insertedChildren[0]._id }, { $set: { totalPoints: totalPoints } })
            ])
        }

        // Respond with success message and inserted child records
        return res.status(200).send({
            status: true,
            message: "Children created successfully.",
            result: insertedChildren
        });
    } catch (error) {
        // Handle any errors during the process
        return res.status(500).send({ status: false, message: error.message });
    }
}

/**
* @swagger
* /child/update-child:
*   put:
*     summary: Update child using token
*     tags:
*       - Child
*     description: Update child using token
*     produces:
*       - application/json
*     parameters:
*       - in: header
*         name: token
*         description: JWT token obtained after user authentication.
*         required: true
*         schema:
*           type: string
*       - in: query
*         name: childId
*         description: Child Doc Id
*         type: string
*         required: true
*         schema:
*           type: string
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/definitions/create_child_def'
*     responses:
*       '200':
*         description: OK
*       '400':
*         description: Bad Request
*       '409':
*         description: Conflict
*/
exports.updateChildAPI = async (req, res, next) => {
    try {
        // Fetch current child for the user
        let isChild = await findChild({ userId: req.userId, _id: req.query.childId });
        if(!isChild){
            return res.status(400).send({ status: false, message: "Child not found." });   
        }

        const childResult = await updateChild({ _id: isChild._id  }, { $set: req.body })
        // Respond with success message and inserted child records
        return res.status(200).send({
            status: true,
            message: "Children updated successfully.",
            result: childResult
        });
    } catch (error) {
        // Handle any errors during the process
        return res.status(500).send({ status: false, message: error.message });
    }
}



/**
* @swagger
* /child/switch-to-active-child:
*   post:
*     summary: Switch to active Child Token
*     tags:
*       - Child
*     description: Switch to active Child Token
*     produces:
*       - application/json
*     parameters:
*       - in: header
*         name: token
*         description: JWT token obtained after user authentication
*         required: true
*         type: string
*       - in: query
*         name: childId
*         description: chile id
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
exports.switchToActiveChild = async (req, res, next) => {
    try {
        const { childId } = req.query;
        // Fetch current child list for the user
        let listUsersChild = await findAllChildren({ userId: req.userId });

        const isChild = listUsersChild.find(child => child._id == childId);
        if (!isChild) {
            return res.status(404).send({
                status: false,
                message: `Child not found.`
            });
        }

        const updatedInactiveChilds = listUsersChild
            .filter(child => child._id != childId)
            .map(child => child._id);

        await Promise.all([
            updateManyChild({ _id: isChild._id }, { activeStatus: true }),
            updateManyChild({ _id: { $in: updatedInactiveChilds } }, { activeStatus: false }),
            updateUser({ _id: req.userId }, { currentChildActive: isChild._id })
        ]);

        // Respond with success message
        return res.status(200).send({
            status: true,
            message: "Children switched successfully."
        });
    } catch (error) {
        // Handle any errors during the process
        return res.status(500).send({ status: false, message: error.message });
    }
};

