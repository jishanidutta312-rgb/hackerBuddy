import express from "express";
import bodyparser from "body-parser";
import path from "path";
import { fileURLToPath } from "url"; 

const _dirname=path.dirname(fileURLToPath(import.meta.url));
const app=express();
const port=3000;

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(path.join(_dirname,"..")));

app.get("/",(req,res)=>{
    res.sendFile(path.join(_dirname,"../public/index.html"));
});
app.get("/login",(req,res)=>{
    res.sendFile(path.join(_dirname,"../public/login.html"));
});
app.get("/signup",(req,res)=>{
    res.sendFile(path.join(_dirname,"../public/signup.html"));
});

app.listen(3000,() => {
    console.log(`Server running at port ${port}`);
});