import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema({
    text:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    }
},{timestamps: true});

export const Qoute = mongoose.model('quote', quoteSchema);