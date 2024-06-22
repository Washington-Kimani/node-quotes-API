import express from "express";
import {createQuote, exists, getAllQuotes, getQuote} from "../controllers/quotes.controllers.js";

const router = express.Router();

router.get('/', (req, res)=>{
    res.json({"message":"API is qwirking properly"});
});

router.get('/api/quotes', getAllQuotes);

router.get('/api/quote/:id', getQuote);

router.post('/api/quotes',exists,createQuote);

export default router;