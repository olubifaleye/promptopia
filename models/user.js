import { Schema, model, models } from "mongoose";

//create a mongoose schema
const UserSchema = new Schema({

    email: {
        type: String,
        unique: [true, "Email already exists!"],
        required: [true, "Email is required!"],
    },

    username: {
        type: String,
        required: [true, "Username is required!"],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    image: {
        type: String,
    }
});

// get user that already exists or create a new user based on the user schema
const User = models.User || model("User", UserSchema);

export default User;