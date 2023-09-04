import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// create get astnc function
export const GET = async (request) => {{
    try {
        
        //connect to DB
        await connectToDB();

        const prompts = await Prompt.find({}).populate

        ('creator');

        //stringify JOSN response and return status of 200
        return new Response(JSON.stringify(prompts), {
            status: 200
        })

    } catch (error) {
        
        //return server error
        return new Response("Failed to fetch all prompts", {status: 500 })
    }
}}