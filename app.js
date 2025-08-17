import express from 'express';
// import bodyParser from 'body-parser';
import path from 'path';
import dotenv from 'dotenv';
import shortnerRoute from './routes/shortnerRoute.js';
import userRoutes from './routes/user.js';
import logout from './routes/logout.js';
import cookieParser from 'cookie-parser';
import { restrictToLoggedInOnly } from './middleware/auth.js';
import session from 'express-session';
import flash from 'connect-flash';
const app = express();


 


dotenv.config({'path':'./Private.env'});
import { fileURLToPath } from 'url'; //learn
import { verifyJWTToken } from './service/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));


app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({secret:"089081",resave:true,saveUninitialized:false}));
app.use(flash());

app.use((req,res,next)=>{
  const token = req.cookies?.uid;
  if(!token){
    res.locals.user = null;
  }else{
    try{
      res.locals.user = verifyJWTToken(token);
    }catch(err){
      res.locals.user = null;
    }
  }
  next();
})
app.use("/",logout);
app.use("/", userRoutes);
app.use("/", shortnerRoute);


const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
