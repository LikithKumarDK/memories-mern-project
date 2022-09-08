import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({limit: "300mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "300mb", extended: true}));
app.use(cors());

app.use('/posts', postRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello to Memories API')
})

// const CONNECTION_URL = 'mongodb+srv://LikithKumarDK:Vf6nQyBQNrVTOIaP@cluster0.sxrhdub.mongodb.net/?retryWrites=true&w=majority';

// Immediately Populated By Heroku
// const port = process.env.PORT || 5000;
const { PORT=3000, LOCAL_ADDRESS='0.0.0.0' } = process.env

// mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
//     .then(() => app.listen(port, () => console.log(`Server running on port ${port}`)))
//     .catch((err) => console.log(err.message));

// mongoose.set('useFindAndModify', false);

mongoose.connect(process.env.CONNECTION_URL)
    .then(() => app.listen(PORT, LOCAL_ADDRESS, () => console.log(`Server running on port ${PORT}`)))
    .catch((err) => console.log(err.message));
