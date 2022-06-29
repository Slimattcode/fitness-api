"use strict";

const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Basic Meta information of the API
const options = {
  definition: {
    openapi: "3.0.0",
    info: { title: "Fitness API", version: "1.0.0" },
  },
  apis: [
    "./src/v1/routes/workoutRoutes.js",
    "./src/v1/routes/memberRoutes.js",
    "./src/v1/routes/recordRoutes.js",
    "./src/models/workout.js",
    "./src/models/record.js",
    "./src/models/member.js",
  ],
};

// Docs in JSON format
const swaggerSpec = swaggerJSDoc(options);

// Function to setup docs
const swaggerDocs = (app, port) => {
  // Route-Handler to visit our docs
  app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  // Make our docs in JSON format available
  app.get("/api/v1/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
  console.log(
    `Version 1 Docs are avialable on http://localhost:${port}/api/v1/docs`
  );
};

module.exports = { swaggerDocs };
