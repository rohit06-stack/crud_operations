const isLogin = async(req,res,next)=>{
    try {
        if(req.session.user_id){
            
        }else{
            res.redirect('/login')
        }
        next()
    } catch (error) {
        console.log(error.message)
    }
}

// islogout middleWare
const isLogout = async(req,res,next)=>{
    try {
        if(req.session.user_id){
            res.redirect('/dashboard');
        }else{
            res.render('login');
        }
        next()
    } catch (error) {
        console.log(error.message)
    }
}

// user register middle ware
const registerMid = async(req,res,next)=>{
    try {
        if(req.session.user_id){
            res.redirect('/dashboard')
        }else{
            res.render('register');
        }
        next()
    } catch (error) {
        console.log(error.message)
    }
}

export {isLogin,isLogout, registerMid}