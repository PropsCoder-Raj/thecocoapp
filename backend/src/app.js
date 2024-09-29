// Import required dependencies
const express = require('express'); // Express.js framework
const morgan = require('morgan'); // HTTP request logger middleware
const helmet = require('helmet'); // Security middleware
const cors = require('cors'); // Cross-origin resource sharing middleware
const swaggerJsdoc = require('swagger-jsdoc'); // Package to generate Swagger documentation
const swaggerUi = require('swagger-ui-express'); // Package to serve Swagger UI
const bodyParser = require('body-parser'); // Package to body parsing

require("./api/helper/cron-jobs");

require('dotenv').config(); // Load environment variables from .env file

// Import custom middleware functions
const middlewares = require('./middlewares');

// Import API routes
const api = require('./api');

// Create an instance of the Express application
const app = express();

// Middleware setup
app.use(morgan('dev')); // Log HTTP requests to the console in development mode
app.use(helmet()); // Set various HTTP headers to secure the application
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

const root = process.cwd();
const port = process.env.PORT || 5000;

// Define Swagger options
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0', // OpenAPI version
        info: {
            title: 'THECOCOAPP APIs Documentation', // Title of the API documentation
            version: '1.0.0', // API version
            // description: 'This is a sample API', // Description of the API
        },
        servers: [
            {
                url: `http://localhost:${port}/api/v1`, // Base URL
                description: "Local development server",
            },
            // Add more server configurations if needed for other environments
        ],
    },
    apis: [`${root}/api.yaml`, `${root}/src/api/**/*.js`], // Path to your Swagger documentation file (update this)
};

// Generate Swagger documentation based on options
const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Serve Swagger UI at /api-docs endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Mount API routes
app.use('/api/v1', api); // Mount the API routes under /api/v1

// Handle 404 Not Found errors using custom middleware
app.use(middlewares.notFound);

// Error handling middleware
app.use(middlewares.errorHandler);

app.get("/webhooks", (req, res) => {
    return res.send(req.body);
})

// Export the Express application instance
module.exports = app;