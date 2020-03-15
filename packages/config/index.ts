export default {
    API_VERSION:  process.env.API_VERSION || 'v1',
    PORT: process.env.PORT || '3000',
    DB_HOST: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017',
    SWAGGER_OPTIONS: {
        swaggerDefinition: {
            openapi: "3.0.0",
            info: {
                title: "Extremely fast express-based API",
                version: "1.0.0",
                description:
                    "This is an api service for handling frontend app requests",
                contact: {
                    name: "Maciej Kocik",
                    email: "maciex36@gmail.com"
                }
            },
            servers: [
                {
                    url: "http://127.0.0.1:3000/v1"
                }
            ]
        },
        apis: ["src/api/**/*.ts", "../packages/db/src/models/**/*.ts"]
    }
};
