import userPostModel from '../models/postSchema.js';
import path from 'path';
const homeController = async (req,res)=>{
    try {
        const allpost = await userPostModel.find({})
        res.render('index', {"allpost": allpost})
    } catch (error) {
        console.log(error.message)
    }
}
export{homeController}