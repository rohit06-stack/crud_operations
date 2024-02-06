import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import registerModel from "../models/registrationSchema.js";

// mail varification 
const verifyMail = (name,email,id)=>{
    try {
        const transporter = nodemailer.createTransport({
            host:"smtp.gmail.com",
            port: 587,
            requireTLS: true,
            secure: false,
            auth:{
                user:'princesandhu1011@gmail.com',
                pass:'ylqgjkidlykmtdde',
            },
        });

        const mailOption = {
            from:"princesandhu1011@gmail.com",
            to: email,
            subject: "For varification Mail",
            html: '<p>Hello'  + name +',Please<a href="http://127.0.0.1:8080/verify?id='+id+'">Click Here</a> Your Account</p>'
        };

        transporter.sendMail(mailOption,(error,info)=>{
            if (error) {
                console.log(error)
            }else{
                console.log("Email has been send" + info.response)
            }
        });

    } catch (error) {
        console.log(error.message)
    }
}

const registerController = (req,res)=>{
    res.render('register')
}

const securepassword = async(password)=>{
    try {
        const passwordHash = await bcrypt.hash(password,10)
        return passwordHash
    } catch (error) {
        console.log(error.message)
        
    }
}   

const userRegisterController = async(req,res)=>{
    const password = await  securepassword(req.body.pwd)
    const doc = new registerModel({
        name:req.body.name,
        age:req.body.age,
        email:req.body.email,
        password:password,
        city:req.body.city
    });
   const userDataSave =  await doc.save()
   if(userDataSave){
    console.log(userDataSave)
   verifyMail(userDataSave.name, userDataSave.email, userDataSave._id)
   }
    console.log("registration successful")
    res.redirect('/login')
}

const userLoginController = async(req,res)=>{
    try {
        res.render('login')
    } catch (error) {
        console.log(error.message)
    }
}

const successUserLoginController = async(req,res)=>{
    try {
        // console.log(req.body.email)
        // console.log(req.body.pwd)
        const email = req.body.email;
        const password = req.body.pwd;
        const data = await registerModel.findOne({email:email})
        if (data) {
            console.log(data.password)
            const encryptPassword = await bcrypt.compare(password, data.password)
            // console.log(encryptPassword);
            if (encryptPassword) { 
                req.session.user_id = data._id;
                res.redirect('/dashboard');
            }else{
                res.render('login')
            }
        }else{
            res.render('login')
        }
    } catch (error) {
        console.log(error.message)
    }

}

// userDashboard
const userDashboardController = async(req,res)=>{
    try {
        if(req.session.user_id){
           const userData = await registerModel.findById({_id:req.session.user_id})
           console.log(userData)
            res.render("dashboard",{"name":userData.name})
        }
    
    } catch (error) {
        console.log(error.message)
    }

}
// logout controller
const userLogoutController = async(req,res)=>{
    try {
        if(req.session.user_id){
            req.session.destroy()
            res.redirect('/login')     
        }
    } catch (error) {
        console.log(error.message)
    }
}

// mail controller
const verifyMailController = async(req,res)=>{
    try {
      const Data =  await registerModel.findByIdAndUpdate(req.query.id, {$set:{is_verified: "true"}})
      if (Data) {
        res.render('verify')
      }
    } catch (error) {
        console.log(error.message)
    }
}

export {registerController, userRegisterController, userLoginController, successUserLoginController,userDashboardController,userLogoutController,verifyMailController}