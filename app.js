import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import {connectAtlas} from "./db/connectAtlas.js";

// import router
import quoteRoutes from './routes/quotes.routes.js'


dotenv.config()

//connect to database
connectAtlas();

//create server
const PORT = process.env.PORT || 5050;
const app = express();
const server = http.createServer(app);

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('combined'))
app.use(cors());
app.use('/', quoteRoutes);


server.listen(PORT, console.log(`Server is running on port ${PORT}`));