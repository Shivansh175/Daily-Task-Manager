import express from "express";
import bodyParser from "body-parser";

const port=3000;
const app=express();
var task;

var data=[{"email":"goelshivansh175@gmail.com","password":"hello"}];

app.listen(port,()=>{
    console.log(`Server Running on port ${port}`);
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.render("landingPage.ejs");
});

app.get("/login",(req,res)=>{
    res.render("login.ejs");
});

app.get("/signup",(req,res)=>{
    res.render("signup.ejs");
});

app.get("/index",(req,res)=>{
    res.render("index.ejs");
});

app.post("/createUser",(req,res)=>{
    data.push(req.body);
    console.log(data);
    res.render("index.ejs");
});

app.post("/addTask",(req,res)=>{
    task=req.body["task"];
});

app.post("/checkUser",(req,res)=>{
    data.forEach(element => {
        if(req.body["email"]===element["email"] && req.body["password"]===element["password"])
        {
            res.render("index.ejs");
        }
        else
        {
            res.render("login.ejs");
        }
    });
});
