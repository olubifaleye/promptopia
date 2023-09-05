import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// create get astnc function
//dynamic params from folder creation i.e. [id] gets passed as params
export const GET = async (request, { params }) => {{
    try {
        
        //connect to DB
        await connectToDB();
        
        //find posts from specific creator using params.id
        const prompts = await Prompt.find({
            creator: params.id
        }).populate

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