import mongoose from 'mongoose';
const registrationSchema = new mongoose.Schema({
    name : {
        type:String,
        required:true,
        trim:true
    },
    age:{
        type:Number,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    city:{
        type:String,
        required:true,
        trim:true
    },
    is_verified:{
        type:String,
        default:'false'
    }

});

// modal
const registerModel = mongoose.model("userRegistration",registrationSchema);

export default registerModel;