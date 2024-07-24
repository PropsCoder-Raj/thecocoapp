const { schoolServices } = require('../service/schools');
const { findAllSchool, findSchool, updateSchool } = schoolServices;

/**
* @swagger
* /school/get-all-schools:
*   get:
*     summary: Get All School Records
*     tags:
*       - Schools
*     description: Get All School Records
*     produces:
*       - application/json'
*     responses:
*       '200':
*         description: OK
*       '400':
*         description: Bad Request
*       '409':
*         description: Conflict
*/
exports.getAllSchools = async (req, res, next) => {
    try {
        const schoolData = await findAllSchool();
        return res.status(200).send({ status: true, message: "Get Schools Data Successfully.", data: schoolData });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}


/**
* @swagger
* /school/is-valid-school:
*   get:
*     summary: Is Valid School Record
*     tags:
*       - Schools
*     description: Is Valid School Record
*     produces:
*       - application/json'
*     parameters:
*       - in: query
*         name: school_id
*         description: School Id
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
exports.isValidSchool = async (req, res, next) => {
    try {
        const schoolData = await findSchool({ schoolId: req.query.school_id });
        let isValid = schoolData ? true : false;
        return res.status(200).send({ status: true, message: "Get School Status Successfully.", data: isValid });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}



/**
* @swagger
* /school/update-school:
*   put:
*     summary: Update user school data
*     tags:
*       - Schools
*     description: Update user school data
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
*         name: schoolId
*         description: School Doc Id 
*         required: true
*         schema:
*           type: string
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/definitions/change_school_def'
*     responses:
*       '200':
*         description: OK
*       '400':
*         description: Bad Request
*       '409':
*         description: Conflict
*/
exports.updateSchoolDetails = async (req, res, next) => {
    try {

        const isSchool = await findSchool({ _id: req.query.schoolId });
        if(!isSchool){
            return res.status(404).send({
                status: false,
                message: "School not found."
            });    
        }

        const schoolResult = await updateSchool({ _id: isSchool._id  }, { $set: req.body })
        // Respond with success message and inserted child records
        return res.status(200).send({
            status: true,
            message: "School updated successfully.",
            result: schoolResult
        });
    } catch (error) {
        // Handle any errors during the process
        return res.status(500).send({ status: false, message: error.message });
    }
}