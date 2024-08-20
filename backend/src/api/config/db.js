const mongoose = require('mongoose'); // Import mongoose
const bcrypt = require('bcrypt');
require("dotenv").config()

const User = require('../model/User');
const School = require('../model/School');
const Standards = require('../model/Standards');
const Modules = require('../model/Modules');
const Levels = require('../model/Levels');
const Lessons = require('../model/Lessons');
const Questions = require('../model/Questions');

let initialSchools = require('../data/schools');
let initialStandards = require('../data/standards');
let initialModules = require('../data/modules_new.json');
let initialLevels = require('../data/levels_new.json');
let initialLessons = require('../data/lessons_new.json');
let initialQuestions = require('../data/questions_new.json');
const userType = require('../enums/userType');

// MongoDB connection URI
const mongoURI = process.env.mongodb_url;

const admincreateDefaultAdmin = async () => {
    try {
        const DEFAULT_ADMIN_EMAIL = process.env.DEFAULT_ADMIN_EMAIL; // Replace with your default admin email
        const DEFAULT_ADMIN_PASSWORD = process.env.DEFAULT_ADMIN_PASSWORD; // Replace with your default admin password

        // Check if an admin user already exists
        const existingAdmin = await User.findOne({ userType: userType.ADMIN });
        if (existingAdmin) {
            console.log('Admin user already exists.');
            return;
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(DEFAULT_ADMIN_PASSWORD, 10);

        // Create a new admin user
        const newAdmin = new User({
            name: "Ar. Soham",
            email: DEFAULT_ADMIN_EMAIL,
            password: hashedPassword,
            userType: userType.ADMIN,
        });

        await newAdmin.save();
        console.log('Default admin user created successfully.');
    } catch (error) {
        console.error('Error creating default admin user:', error);
    }
};

const importInitialSchoolData = async () => {
    try {
        const count = await School.countDocuments();
        if (count === 0) {
            await School.insertMany(initialSchools);
            console.log('Initial school data imported successfully.');
        } else {
            console.log('Schools collection is not empty, skipping initial data import.');
        }
    } catch (error) {
        console.error('Error importing initial school data:', error);
    }
};

const importInitialStandards = async () => {
    try {
        const count = await Standards.countDocuments();
        if (count === 0) {
            await Standards.insertMany(initialStandards);
            console.log('Initial Standards data imported successfully.');
        } else {
            console.log('Standards collection is not empty, skipping initial data import.');
        }
    } catch (error) {
        console.error('Error importing initial school data:', error);
    }
};

const importInitialModules = async () => {
    try {
        const count = await Modules.countDocuments();
        if (count === 0) {
            const standardsList = await Standards.find();
            const updatedModules = initialModules.map((element) => {
                const standard = standardsList.find((standard) => standard.standard_id == element.standard_id);
                if (standard) {
                    return {
                        ...element,
                        standard_id: standard._id // Use ObjectId directly
                    };
                }
            });

            await Modules.insertMany(updatedModules);
            console.log('Initial Modules data imported successfully.');
        } else {
            console.log('Modules collection is not empty, skipping initial data import.');
        }
    } catch (error) {
        console.error('Error importing initial school data:', error);
    }
};

const importInitialLevels = async () => {
    try {
        const count = await Levels.countDocuments();
        if (count === 0) {
            const modulesList = await Modules.find();
            const standardsList = await Standards.find();
            let updatedLevels = initialLevels.map((element) => {
                const standard = standardsList.find((standard) => standard.standard_id == element.standard_id);
                if (standard) {
                    const modules = modulesList.find((module) => module.module_id == element.module_id && module.standard_id.toString() == standard._id.toString());
                    if (modules) {
                        return {
                            ...element,
                            module_id: modules._id.toString(),
                            standard_id: modules.standard_id.toString() // Use ObjectId directly
                        };
                    }
                }
            });

            updatedLevels = updatedLevels.filter((element) => element != null);

            await Levels.insertMany(updatedLevels);
            console.log('Initial Levels data imported successfully.');
        } else {
            console.log('Levels collection is not empty, skipping initial data import.');
        }
    } catch (error) {
        console.error('Error importing initial school data:', error);
    }
};

const importInitialLessons = async () => {
    try {
        const count = await Lessons.countDocuments();
        if (count === 0) {
            const modulesList = await Modules.find();
            const standardsList = await Standards.find();
            const levelsList = await Levels.find();
            let updatedLessons = initialLessons.map((element) => {
                const standard = standardsList.find((standard) => standard.standard_id == element.standard_id);
                if (standard) {
                    const modules = modulesList.find((module) => module.module_id == element.module_id && module.standard_id.toString() == standard._id.toString());
                    if (modules) {
                        const levels = levelsList.find((levels) => levels.level_id == element.level_id && levels.standard_id.toString() == standard._id.toString() && levels.module_id.toString() == modules._id.toString());
                        if (levels) {
                            return {
                                ...element,
                                level_id: levels._id,
                                module_id: levels.module_id,
                                standard_id: levels.standard_id // Use ObjectId directly
                            };
                        }
                    }
                }
            });

            updatedLessons = updatedLessons.filter((element) => element != null);

            await Lessons.insertMany(updatedLessons);
            console.log('Initial Lessons data imported successfully.');
        } else {
            console.log('Lessons collection is not empty, skipping initial data import.');
        }
    } catch (error) {
        console.error('Error importing initial school data:', error);
    }
};

const importInitialQuestions = async () => {
    try {
        const count = await Questions.countDocuments();
        if (count === 0) {
            const modulesList = await Modules.find();
            const standardsList = await Standards.find();
            const levelsList = await Levels.find();
            let updatedQuestions = initialQuestions.map((element) => {
                const standard = standardsList.find((standard) => standard.standard_id == element.standard_id);
                if (standard) {
                    const modules = modulesList.find((module) => module.module_id == element.module_id && module.standard_id.toString() == standard._id.toString());
                    if (modules) {
                        const levels = levelsList.find((levels) => levels.level_id == element.level_id && levels.standard_id.toString() == standard._id.toString() && levels.module_id.toString() == modules._id.toString());
                        if (levels) {
                            return {
                                ...element,
                                level_id: levels._id,
                                module_id: levels.module_id,
                                standard_id: levels.standard_id // Use ObjectId directly
                            };
                        }
                    }
                }
            });

            updatedQuestions = updatedQuestions.filter((element) => element != null);

            await Questions.insertMany(updatedQuestions);
            console.log('Initial Questions data imported successfully.');
        } else {
            console.log('Questions collection is not empty, skipping initial data import.');
        }
    } catch (error) {
        console.error('Error importing initial school data:', error);
    }
};

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('MongoDB connected successfully');
        await admincreateDefaultAdmin();
        await importInitialSchoolData();
        await importInitialStandards();
        await importInitialModules();
        await importInitialLevels();
        await importInitialLessons();
        await importInitialQuestions();
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });
