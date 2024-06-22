import {Qoute} from "../models/quote.model.js";

export const exists = async (req,res,next) => {
    const {text, author} = req.body;
    const quotes = await Qoute.find();
    const quote = quotes.find(x => x === text);
    if(quote){
        res.json({'message':'The quote already exists'});
    }else{
        next();
    }
}

export const getAllQuotes = (req, res) => {
    Qoute.find()
        .then(data=>{
            res.status(200).json(data)
        }).catch(err=>{
            console.log(err);
            res.status(500).json({"message":"Error Fetching Quotes"});
        });
}

export const getQuote = async function (req, res){
    const {id} = req.params;
    await Qoute.findOne({
        _id: id
    }).then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        console.error(err);
    })
}

export const createQuote = async function (req, res){
    const {text, author} = req.body;
    try{
        const quote = new Qoute({
            text,
            author
        })

        await quote.save();
        res.status(201).json({"message":"Quote saved successfully"},quote);
    }catch(err){
        res.status(500).json({"message": "Internal server error"});
    }
}