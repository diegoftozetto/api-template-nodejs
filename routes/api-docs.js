const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "Template API",
      description: "Template API NodeJS",
      contact: {
        name: "Nome do Desenvolvedor"
      },
      servers: ["http://localhost:5000"]
    }
  },

  apis: ["./routes/user.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = [swaggerUi.serve, swaggerUi.setup(swaggerDocs)];