import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

export const connectAtlas = async function (){
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Connected to Atlas`);
    }catch (err){
        console.log(`Error: ${err.message}`)
    }
}
