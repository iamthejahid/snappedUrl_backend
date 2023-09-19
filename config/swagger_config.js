const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Snapped URL',
      version: '1.0.0',
      description: 'API documentation for Snapped URL project',
    },
    components: {
      responses: {
        UnauthorizedError: {
          description: 'Unauthorized error response',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
        InternalServerError: {
          description: 'Internal server error response',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
        ClientError: {
          description: 'Client error response',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: [
    './features/app_version/version_routes.js',
    './features/link_shortner/link_shortner_routes.js',
    './features/login/login_routes.js',
    './features/registration/registration_routes.js',
  ],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
