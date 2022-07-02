import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import AuthRoute from './Routes/AuthRoute.js';
import UserRoute from './Routes/UserRoute.js';
import PostRoute from './Routes/PostRoute.js';
import UploadRoute from './Routes/UploadRoute.js';
import cors from 'cors';
import MessageRouter from './Routes/MessageRoute.js';
import chatRouter from './Routes/ChatRoute.js';

const app = express();

// to serve images for public 
app.use(express.static('public'));
app.use('/images', express.static("images"));

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

mongoose.connect('mongodb://localhost:27017/socialMedia')
    .then(() =>
        app.listen(5000, () =>
            console.log(`Listening at port 5000`)
        )
    )
    .catch((error) => console.log(error));


// usage of routes
app.use('/auth', AuthRoute);
app.use('/user', UserRoute);
app.use('/post', PostRoute);
app.use('/upload', UploadRoute);
app.use('/chat', chatRouter);
app.use('/message', MessageRouter);

