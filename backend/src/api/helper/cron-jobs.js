const { schoolServices } = require("../service/schools");
const { findAllSchool } = schoolServices;

const { childServices } = require("../service/child");
const { findAllChildren } = childServices;

const { completedQuestionsService } = require("../service/completedquestions");
const { findAllCompletedQuestions } = completedQuestionsService;

exports._main = async () => {
    console.log("Starting main function");
    const schoolsList = (await findAllSchool()).map(school => ({ email: school.email, name: school.schoolName, _id: school._id }));
    const schoolsIds = schoolsList.map(school => school._id);
    console.log("schoolsList: ", schoolsList, schoolsIds);

    const childList = await findAllChildren({ schoolId: { $in: schoolsIds } });
    const childIds = childList.map(child => child._id);
    console.log("childList: ", childList);

    const completedQuestions = await findAllCompletedQuestions({ child_id: { $in: childIds } });
    // console.log("completedQuestions: ", completedQuestions);

    const childsWithPoints = childList.map(child => {
        const childQuestions = completedQuestions.filter(question => question.child_id.toString() === child._id.toString());
        const points = childQuestions.reduce((acc, question) => acc + question.points, 0);
        return { ...child._doc, points };
    });

    console.log("childsWithPoints: ", childsWithPoints);
    
}

setTimeout(() => {
    exports._main();
}, 1000);