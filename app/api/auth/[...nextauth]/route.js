import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";

//Create handler to handle authentication
const handler = NextAuth({

    //prodivers array to specify providers
    providers: [

        //use google client ID and google secret from .env file
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],

    //get
    async session({ session }){},

    //get 
    async signIn({ profile }){

        //try/catch block
        //serverless -> lamba only when it gets called -> dynamodb connection
        //stops server from running constantly

        try {

            await connectToDB();

            //check if a user already exists


            //if not create a new user and save to database

            return true;
            
        } catch (error) {
            console.log(error);
            return false;
            
        }
    }

})

export { handler as GET, handler as POST };