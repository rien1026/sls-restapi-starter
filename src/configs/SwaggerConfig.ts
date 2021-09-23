import swaggerJSDoc from 'swagger-jsdoc';
import { API_INFO } from '../utils';

// Options for the swagger docs
const options = {
	// Import swaggerDefinitions
	swaggerDefinition: {
		info: {
			// API informations (required)
			title: 'REST API', // Title (required)
			version: API_INFO.VERSION, // Version (required)
			basePath: '/',
		},
		host: API_INFO.URI, // Host (optional)
		components: {
			parameters: {},
			schemas: {},
			responses: {},
			headers: {},
			securitySchemes: {},
		},
	},

	// Path to the API docs
	apis: ['src/components/**/*.ts', 'src/components/**/*.js'],
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
export const swaggerSpec = swaggerJSDoc(options);

// to know when object is configured.
export const configSwagger = () => { };
