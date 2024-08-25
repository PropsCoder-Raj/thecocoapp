const xlsx = require('xlsx');
const fs = require('fs');

/**
 * Validate if an email is in a valid format.
 * @param {string} email - The email address to validate.
 * @returns {boolean} - True if valid, otherwise false.
 */
const isValidEmail = (email) => {
    // Simple regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Convert an Excel file located at the specified path to JSON, including all specified columns, and validate required fields.
 * @param {string} filePath - The path to the uploaded Excel file.
 * @returns {Promise<Object[]>} - The data from the Excel file as an array of JSON objects, including all columns.
 * @throws Will throw an error if any object is missing required keys or if validation fails.
 */
const convertExcelToJson = async (filePath) => {
    try {
        // Define the required keys
        const requiredKeys = [
            'user_name',
            'user_email',
            'child_name',
            'school_id',
            'child_standard'
        ];

        // Read the Excel file
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Extract data from the sheet
        const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 }); // Read rows as arrays

        if (data.length === 0) {
            throw new Error('No data found in the file.');
        }

        // First row as headers
        const columnNames = data[0];

        // Check if all required keys are present in the header
        for (const key of requiredKeys) {
            if (!columnNames.includes(key)) {
                throw new Error(`Missing required column: ${key}`);
            }
        }

        // Process rows
        const result = data.slice(1).map((row) => {
            const rowData = {};
            for (let i = 0; i < columnNames.length; i++) {
                const header = columnNames[i];
                rowData[header] = row[i] !== undefined ? row[i] : null; // Set empty cells to null
            }

            // Validate that all required keys are present and not null
            for (const key of requiredKeys) {
                if (rowData[key] === null || rowData[key] === undefined) {
                    throw new Error(`Missing required value for key: ${key}`);
                }
            }

            // Validate email
            if (!isValidEmail(rowData['user_email'])) {
                throw new Error(`Invalid email address: ${rowData['user_email']}`);
            }

            return rowData;
        });

        // Clean up the file
        fs.unlinkSync(filePath);

        return result;
    } catch (error) {
        // Ensure to clean up the file in case of an error
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        throw new Error(error.message);
    }
};

module.exports = {
    convertExcelToJson,
};
