import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description :{
        type:String,
        required:true
    },
    image :{
        type:String,
        required:true
    }
});

const userPostModel = mongoose.model("Post", postSchema);
export default userPostModel;