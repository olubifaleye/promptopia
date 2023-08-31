import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

//create post route
export const POST = async (req) => {

    //collect variables through post request
    const { userId, prompt, tag } = await req.json();

    try {
        //attempt to connect ot DB
        await connectToDB();

        // create a new prompt 
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        })
        
        // save new prompt to the database
        await newPrompt.save();

        //stringify JOSN response and return status of 201
        return new Response(JSON.stringify(newPrompt), {status: 201})

    } catch (error) {
        //return server error
        return new Response("Failed to create a new prompt", {status: 500})
    }
}