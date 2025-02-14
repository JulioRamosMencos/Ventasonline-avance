import {Schema, model} from "mongoose";

const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        unique: true
    },

    description: {
        type: String,
        required: [true, "Description is required"]
    },

    status: {
        type: Boolean,
        default: true
    }

},

{
    versionKey: false,
    timeStamps: true
});

export default model("Category", categorySchema)