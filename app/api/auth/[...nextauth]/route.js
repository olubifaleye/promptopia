import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";

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
    callbacks: {
                // get data about user currently in session
        async session({ session }){

            // get user by email currently used
            const sessionUser = await User.findOne({
                email: session.user.email
            })

            //update id to know which user is currently online
            session.user.id = sessionUser._id.toString();

            return session;
        },

        //sign in operations for new and existing users
        async signIn({ profile }){

            //try/catch block
            //serverless -> lamba only when it gets called -> dynamodb connection
            //stops server from running constantly

            try {

                await connectToDB();

                //check if a user already exists by checking if they have an email address
                const userExists = await User.findOne({
                    email: profile.email
                })

                //if not create a new user and save to database
                if(!userExists){
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture
                    })
                }

                return true;
                
            } catch (error) {
                console.log(error);
                return false;
                
            }
        }
        },
})

export { handler as GET, handler as POST };