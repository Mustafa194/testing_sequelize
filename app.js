const express = require("express");
const { sequelize } = require("./models");
// const apiErrorHandler = require("./middlewares/apiErrorHandler");

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", require("./routes/users"));

// app.use(apiErrorHandler);

app.listen({ port: 5000 }, async() => {
    // console.log("Server up on http://localhost:5000");
    await sequelize.authenticate();
    // console.log("Database connected!");
});