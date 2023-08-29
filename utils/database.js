import mongoose from "mongoose";

//track the connection
let isConnected = false;

export const connectToDB = async () => {

    //create connection to DB

    //sets mongoose options to strict
    mongoose.set('strictQuery', true);

    if(isConnected) {
        console.log("MongoDB is already connected");
        return;
    }

    //if not already connected, try to establish connection
    try {
        //URI of database and database options
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        //if connect executes, set isConnected to true
        isConnected = true

        console.log("MongoDB connected")

    } catch (error) {
        console.log(error)
    }
}
