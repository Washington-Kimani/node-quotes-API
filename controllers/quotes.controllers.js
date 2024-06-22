import {Qoute} from "../models/quote.model.js";

export const exists = async (req,res,next) => {
    const {text} = req.body;
    const quote = await Qoute.findOne({text: text});
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

export const randomQuote = async (req,res)=>{
    const quotes = await Qoute.find();
    const rand = ~~(Math.random()*quotes.length);
    try{
        const quote = quotes[rand];
        res.status(200).json(quote)
    }catch(err){
        console.log(err);
        res.status(500).json("Error getting the quote");
    }
}

export const createQuote = async function (req, res){
    const {text, author} = req.body;
    try{
        const quote = new Qoute({
            text,
            author
        })

        await quote.save();
        res.status(201).json({"message":"Quote saved successfully", quote});
    }catch(err){
        res.status(500).json({"message": "Internal server error"});
    }
}

export const editQuote = async (req,res) => {
    const {id} = req.params;
    const update = req.body;
    //console.log('update', update);
    await Qoute.findByIdAndUpdate(id, update, { new: true })
        .then(update_quote => {
            //console.log('updatedUser', updatedUser);
            res.status(200).json(update_quote);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "Error updating the quote" });
        });
}

export const deleteQuote = async (req,res)=>{
    const {id} = req.params;
    try{
        await Qoute.findByIdAndDelete({_id: id})
            .then(deleted=>{
                res.status(200).json({"message":"The quote was deleted successfully", deleted});
            })
    }catch(err){
        console.log(err);
        res.status(500).json({"message":"the delete was unsuccessful"});
    }
}