import { Schema, model, models} from "mongoose";

//schema for prompts created by users 
const PromptSchema = new Schema({

    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    prompt: {
        type: String,
        required: [true, 'Prompt is required'] 
    },
    tag: {
        type: String,
        required: [true, "Tag is required"]
    }
});

// get prompt that already exists or create a new prompt based on the prompt schema
const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;