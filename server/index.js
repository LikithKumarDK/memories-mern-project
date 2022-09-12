import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

import swaggerDocs from './swagger.js';
import router from './routes/index.js';
import { connectToDatabase } from './connection.js';

// env 
dotenv.config();

// Normal
// const port = process.env.PORT || 5000;
// const PORT = parseInt(process.env.PORT || '4500');
const HOST = process.env.HOST || 'http://localhost';

// Immediately Populated By Heroku
const { PORT = 5000, LOCAL_ADDRESS = '0.0.0.0' } = process.env

const app = express();

app.use(bodyParser.json({ limit: "300mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "300mb", extended: true }));
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use(router);

// Server Run
app.listen(PORT, LOCAL_ADDRESS, async () => {
	// Database Connection
	await connectToDatabase();

	// Server Status
	console.log(`Server started on URL ${HOST}:${PORT} 🎉`);

	// Swagger Documentation
	swaggerDocs(app, PORT);
});
