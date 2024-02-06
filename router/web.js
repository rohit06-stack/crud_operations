import express from "express";
import multer from "multer";
import path from 'path';
const router = express.Router();
import{homeController} from '../controller/homeController.js';
import {registerController,userRegisterController,userLoginController,successUserLoginController,userDashboardController,userLogoutController,verifyMailController} from "../controller/registerController.js";
import {isLogin,isLogout,registerMid} from "../middleWares/userMiddleware.js";
import { userPostController,successUserPostController,totalPostController,deletePostController,editPostController,successEditPostController } from "../controller/postController.js";


// image confrigration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(process.cwd(),'/public/images/blogimages'))
    },
    filename: function (req, file, cb) {
      const img_name     = Date.now() + '_' +file.originalname;
      cb(null, img_name)
    }
  })
  
  const upload = multer({ storage: storage })

router.get('/',homeController);
router.get('/register',registerMid,registerController);
router.post('/register', userRegisterController);
router.get('/login',isLogout,userLoginController)
router.post('/login',successUserLoginController)
router.get('/dashboard',isLogin,userDashboardController)
router.get('/logout',isLogin,userLogoutController)
router.get('/userpost', isLogin,successUserPostController)
router.post('/userpost', upload.single('image'),userPostController)
router.get('/deletePost/:id', isLogin,deletePostController)
router.get('/editPost/:id', isLogin, editPostController)
router.post('/editPost/:id', isLogin, successEditPostController)

router.get('/totalPost',isLogin,totalPostController,deletePostController)
router.get('/verify/:id?', verifyMailController)
export default router;