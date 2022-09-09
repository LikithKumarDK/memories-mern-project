import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import morgan from "morgan";
import { Low, JSONFile, LowSync, JSONFileSync } from 'lowdb'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Library API",
			version: "1.0.0",
			description: "A simple Express Library API",
		},
		servers: [
			{
				url: "http://localhost:5000",
			},
		],
	},
	apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "300mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "300mb", extended: true }));
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get('/', (req, res) => {
    res.send('Hello to Memories API')
})

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use('/users', userRoutes);
app.use('/posts', postRoutes);

// Normal
// const port = process.env.PORT || 5000;

// Immediately Populated By Heroku
const { PORT = 3000, LOCAL_ADDRESS = '0.0.0.0' } = process.env

mongoose.connect(process.env.CONNECTION_URL)
    .then(() => app.listen(PORT, LOCAL_ADDRESS, () => console.log(`Server running on port ${PORT}`)))
    .catch((err) => console.log(err.message));
