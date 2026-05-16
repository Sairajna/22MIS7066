const express = require("express");
const cors = require("cors");

const logger = require("./middleware/logger");

const app = express();

app.use(cors());
app.use(express.json());

app.use(logger);

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Notification API running"
    });
});

module.exports = app;