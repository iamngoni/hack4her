require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const bp = require("body-parser");
const cors = require("cors");
const path = require("path");

let app = express();
app.use(logger("dev"));
app.use(bp.json());