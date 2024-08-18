// Load environment variables from the .env file
require("dotenv").config();
const cron = require('node-cron');

// Import necessary services
const { schoolServices } = require("../service/schools");
const { findAllSchool } = schoolServices;

const { childServices } = require("../service/child");
const { findAllChildren } = childServices;

const { completedQuestionsService } = require("../service/completedquestions");
const { findAllCompletedQuestions } = completedQuestionsService;

// Import required modules
const nodemailer = require('nodemailer');
const xlsx = require('xlsx');
const axios = require('axios');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const { SendMailClient } = require('zeptomail');

// Configure Cloudinary with environment variables
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
});

// Function to download a file from a URL and convert it to Base64
const getBase64FromUrl = async (url) => {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const base64 = Buffer.from(response.data, 'binary').toString('base64');
    return base64;
};

// Function to send email using ZeptoMail
const sendMailUsingZepto = async (toEmail, subject, htmlBody, attachments = []) => {
    const url = "api.zeptomail.in/"; // ZeptoMail API base URL
    const token = "Zoho-enczapikey " + process.env.ZEPTO_SECRET; // ZeptoMail API key
    let client = new SendMailClient({ url, token });

    // Prepare the mail options
    const mailOptions = {
        "from": {
            "address": "hello@thecocoapp.com",
            "name": "Cocoapp"
        },
        "to": [
            {
                "email_address": {
                    "address": toEmail
                }
            }
        ],
        "subject": subject,
        "htmlbody": htmlBody,
        "attachments": attachments
    };

    try {
        // Send the email via ZeptoMail
        const response = await client.sendMail(mailOptions);
        return response;
    } catch (error) {
        console.error('Error sending email:', JSON.stringify(error));
        throw error;
    }
};

// Function to convert data to Excel and upload it to Cloudinary
const uploadExcelToCloudinary = async (data, filename) => {
    // Convert JSON data to a worksheet
    const ws = xlsx.utils.json_to_sheet(data);

    // Create a new workbook and add the worksheet
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Convert the workbook to a buffer
    const buffer = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });

    // Upload the buffer to Cloudinary
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            { resource_type: 'raw', public_id: filename, format: 'xlsx' }, 
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        ).end(buffer); // End the stream with the buffer
    });
};

// Optional: Function to send email using Nodemailer (Gmail)
const sendMail = async (email, attachments) => {
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            "user": "panditrohit532@gmail.com",
            "pass": "sajutseiqfrgitkm"
        }
    });

    var mailOptions = {
        from: "panditrohit532@gmail.com",
        to: email,
        subject: "Students Report",
        html: "Student Reports",
        attachments: attachments
    };

    return await transporter.sendMail(mailOptions);
}

// Main function to generate reports and send emails
exports._main = async () => {
    // Fetch all schools
    let schoolsList = (await findAllSchool()).map(school => ({
        email: school.email,
        name: school.schoolName,
        _id: school._id
    }));
    const schoolsIds = schoolsList.map(school => school._id);

    // Fetch all children for the schools
    const childList = await findAllChildren({ schoolId: { $in: schoolsIds } });
    const childIds = childList.map(child => child._id);

     // Get the current date
     const now = new Date();    

    // Determine the start and end of the previous month
    const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const end = new Date(now.getFullYear(), now.getMonth(), 0); // Last day of the previous month

    console.log('Start date:', start);
    console.log('End date:', end);

    // Fetch completed questions for the children
    const completedQuestions = await findAllCompletedQuestions({ child_id: { $in: childIds }, createdAt: {
        $gte: start,
        $lte: end
    }});

    // Map children with their total points
    const childsWithPoints = childList.map(child => {
        const childQuestions = completedQuestions.filter(question => question.child_id.toString() === child._id.toString());
        const points = childQuestions.reduce((acc, question) => acc + question.points, 0);
        return { ...child._doc, points };
    }).sort((a, b) => b.points - a.points);

    // Map schools with their children grouped by standard
    schoolsList = schoolsList.map(school => {
        let schoolsChilds = childsWithPoints.filter(child => child.schoolId.toString() === school._id.toString());
        let standard = [...new Set(schoolsChilds.map(child => Number(child.standard)))];
        standard = standard.map((element) => {
            return {
                standard: Number(element),
                childs: schoolsChilds.filter(child => child.standard == element).map((mapElement, mapIndex) => ({
                    srno: mapIndex + 1,
                    name: mapElement.childName,
                    points: mapElement.points
                }))
            };
        });
        return { ...school, standard };
    })

    // Process each school
    for (let index = 0; index < schoolsList.length; index++) {
        const element = schoolsList[index];
        let attachments = [];
        const interval = setInterval(async () => {
            // Process each standard for the school
            for (let indexk = 0; indexk < element.standard.length; indexk++) {
                const elementk = element.standard[indexk];
                const fileName = `${element.name}-${elementk.standard}th-standard-report-${new Date()}`;
                
                // Upload Excel file to Cloudinary
                const uploadFileURL = await uploadExcelToCloudinary(element.standard[0].childs, fileName);
                
                // Convert file URL to Base64 for ZeptoMail attachment
                const base64Content = await getBase64FromUrl(uploadFileURL.secure_url);

                // Prepare attachment data for ZeptoMail
                const exampleAttachment = {
                    "name": fileName,
                    "filename": fileName + ".xlsx",
                    "content": base64Content,
                    "mime_type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    "content_type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                };

                attachments.push(exampleAttachment);
            }

            // Send email when all attachments are ready
            if (attachments.length == element.standard.length) {
                clearInterval(interval);
                await sendMailUsingZepto(element.email, "Student Reports", "Student Reports", attachments);
            }
        }, 2000);
    }
}

// // Start the main function after a short delay
// setTimeout(() => {
//     exports._main();
// }, 1000);


// Schedule the cron job to run on the 1st day of each month at midnight
cron.schedule('0 1 1 * *', () => {
    console.log('Running monthly cron job');
    exports._main()
});