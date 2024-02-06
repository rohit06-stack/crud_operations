import userPostModel from "../models/postSchema.js";
import registerModel from "../models/registrationSchema.js";
const successUserPostController = async(req,res)=>{
    try {
        const userData = await registerModel.findById({_id:req.session.user_id})
        res.render('userpost',{"name":userData.name})
    } catch (error) {
        console.log(error.message)
    }
}
// post request 
const userPostController = async(req,res)=>{
    try {
        const postData = new userPostModel({
            title:req.body.title,
            description:req.body.description,
            image:req.file.filename

        })
         await postData.save();
        console.log("post saved")
        res.redirect('/dashboard')
    } catch (error) {
        console.log(error.message)
    }
}
// total post 
const totalPostController = async(req,res)=>{
    try {
        const allPost = await userPostModel.find({})
        res.render('totalPost',{allPost:allPost})
    } catch (error) {
        console.log(error.message)
    }
}

//delete post 
const deletePostController =async(req,res)=>{
    try {
        console.log(req.params.id)
       const postDelete= await userPostModel.findByIdAndDelete(req.params.id)
       if(postDelete){
        console.log("Post Delete")
        res.redirect("/totalPost")
       }else{
        console.log("Post not Delete")
       }
    } catch (error) {
        console.log(error.message)
    }
}
//edit post
const editPostController = async(req,res)=>{
    try {
        console.log(req.params.id)
       const result = await userPostModel.findById(req.params.id)
       console.log(result)
        res.render("editPost",{"result": result})
    } catch (error) {
        console.log(error.message)
    }
}
const successEditPostController = async(req,res)=>{
    try {
        // console.log(req.params.id)
        // console.log(req.body)
        const updatePost = await userPostModel.findByIdAndUpdate(req.params.id, req.body)
        if(updatePost){
            console.log("Post updated Successfully")
            res.redirect('/totalPost')
        }else{

        }
    } catch (error) {
        console.log(error.message)
    }

}
export {userPostController,successUserPostController,totalPostController,deletePostController,editPostController,successEditPostController}