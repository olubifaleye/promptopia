import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

//GET (read)

// create get astnc function
//dynamic params from folder creation i.e. [id] gets passed as params
export const GET = async (request, { params }) => {{
    try {
        
        //connect to DB
        await connectToDB();
        
        //find posts from specific creator using params.id
        const prompt = await Prompt.findById(params.id).populate

        ('creator');

        //if post doesnt exist then return error code 404
        if(!prompt) return new Response("Prompt not found", {status: 404});

        //stringify JOSN response and return status of 200
        return new Response(JSON.stringify(prompt), {
            status: 200
        })

    } catch (error) {
        
        //return server error
        return new Response("Failed to fetch all prompts", {status: 500 })
    }
}}

//PATCH (update)
export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json();

    try {
        //connect to DB
        await connectToDB();
        
        //find post from specific creator using params.id
        const existingPrompt = await Prompt.findById(params.id)

        //if post doesnt exist then return error code 404
        if(!existingPrompt){
            return new Response("Prompt not found", {status: 404});
        }

        //update the prompt and tag
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        //save updated prompt
        await existingPrompt.save();

        //stringify JOSN response and return status of 200
        return new Response(JSON.stringify(existingPrompt), {
            status: 200
        })

    } catch (error) {
        //return server error
        return new Response("Failed to update prompt", {status: 500 })
    }
}

//DELETE (delete)
export const DELETE = async (request, {params}) => {
    try {
       //connect to DB
       await connectToDB();
       
       //find post from specific creator using params.id and delete it 
       await Prompt.findByIdAndRemove(params.id)

       //stringify JOSN response and return status of 200
       return new Response("Prompt deleted successfully", {
        status: 200
    })

    } catch (error) {
        //return server error
        return new Response("Failed to delete prompt", {status: 500 })
    }
}