import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.DB_URI!)
        console.log("Connected to the db");
    } catch (error) {
        console.log(error);
    }
}

export default dbConnect;