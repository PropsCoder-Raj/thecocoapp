const { schoolServices } = require('../service/schools');
const { findAllSchool, findSchool } = schoolServices;

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