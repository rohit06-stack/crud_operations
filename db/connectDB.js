import mongoose from 'mongoose';
const connectDB = async(DATABASE_URL)=>{
    try {
        const DB_OPTIONS ={
            dbName :"laptop"
        }
       await mongoose.connect(DATABASE_URL,DB_OPTIONS)
       console.log("MongoDB Connected")
    } catch (error) {
        console.log(error.message);
        
    }
}
export default connectDB