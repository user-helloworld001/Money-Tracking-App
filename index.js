import express from "express";
import dotenv from "dotenv";
import connectDb from "./connectdb.js";
import mongoose, { Schema } from "mongoose";


const app = express();


dotenv.config({
    path: "./.env"
});

const port = process.env.PORT || 6666



connectDb()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server listening at port ${port}`);
        })
    })
    .catch((error) => {
        console.log("Mongo Db Connection Failed!!", error);
    })


app.get("/", (req, res) => {
    res.sendFile("E:\\WebDevelopment\\BharatInternProjects\\MoneyTracker\\Files\\index.html")
})



const moneyTrackingSchema = new Schema(
    {
        Category: {
            type: String

        },
        Amount: {
            type: Number

        },
        Description: {
            type: String

        },
        Date: {
            type: String
        }
    }
)

const Transaction = mongoose.model("transaction", moneyTrackingSchema);


app.use(express.urlencoded({ extended: true }));

app.use("/add",async (req,res)=>{
    try {
        const{Category,Amount,Description,Date}=req.body;
        
    
        const user= await Transaction.create({
            Category:Category.toUpperCase(),
            Amount,
            Description,
            Date
        })
        res.redirect("/success")
    } catch (error) {
        console.log(error);
        res.redirect("/error")
    }
})


app.get("/success",(req,res)=>{
    res.sendFile("E:\\WebDevelopment\\BharatInternProjects\\MoneyTracker\\pages\\added.html");
})
app.get("/error",(req,res)=>{
    res.sendFile("E:\\WebDevelopment\\BharatInternProjects\\MoneyTracker\\pages\\error.html");
})


