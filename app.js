import express from 'express';
import session from 'express-session';
import { secretKey } from './config/config.js';
const app = express();
const port = process.env.Port||8080;
import router from './router/web.js';
import path from 'path';
import connectDB from "./db/connectDB.js";
    const DATABASE_URL = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017";
    connectDB(DATABASE_URL);

// session set-up
app.use(session({secret: secretKey}))

//setup for static files
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(process.cwd(),'public')))


//set for ejs
app.set('views','./views');
app.set('view engine','ejs');

app.use('/', router)
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})

