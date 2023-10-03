const express = require('express');
require('dotenv').config('.env');

const { MongoClient } = require('mongodb');
const url = process.env.MONGO_URL

const client = new MongoClient(url);
const db = client.db("data")
export const col = db.collection("objects") 

import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import * as middlewares from "./middlewares";
import { postSurvey } from "./controllers/surveys";

require("dotenv").config();

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", postSurvey)

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;