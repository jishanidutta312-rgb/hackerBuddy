import express from "express";
import bodyparser from "body-parser";
import path from "path";
import { fileURLToPath } from "url"; 

const __dirname=path.dirname(fileURLToPath(import.meta.url));
const app=express();
const port=3000;

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"../public")));

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"../public/index.html"));
});
app.get("/login",(req,res)=>{
    res.sendFile(path.join(__dirname,"../public/login.html"));
});
app.get("/signup",(req,res)=>{
    res.sendFile(path.join(__dirname,"../public/signup.html"));
});
app.get("/explore", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/explore.html"));
});
app.get("/hackathons", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/hackathons.html"));
});
app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/about.html"));
});
app.get("/how_It_Works", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/how_It_Works.html"));
});
app.get("/dashBoard", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/dashBoard.html"));
});
app.get("/settings", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/settings.html"));
});
app.get("/myTeam", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/myTeam.html"));
});
app.listen(port,() => {
    console.log(`Server running at port ${port}`);
});