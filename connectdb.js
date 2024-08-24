import mongoose from "mongoose";


const connectDb = async () => {
    try {
        const myconn = await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.azlxjml.mongodb.net/MoneyTrackingDB`);
        console.log("\n MongoDb Connected!!");
    }catch(error){
        console.log("MONGO DB CONNECTION FAILED!! Error: ",error);

    }
}

export default connectDb;