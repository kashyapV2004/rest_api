const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const mongoose = require("mongoose");
const Post = require("./models/post.js");
const methodOverride = require('method-override');
const mongo_url = 'mongodb://127.0.0.1:27017/rest';
main()
    .then(() => {
        console.log("connected to mongo successfully..");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
  await mongoose.connect(mongo_url);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: true}));

//show all post route
app.get("/posts", async (req, res) => {
    const posts = await Post.find({});
    res.render("index.ejs", {posts});
});

//creating new post 
app.get("/posts/new", (req, res) => {
    console.log("creating a new post");
    res.render("new.ejs");
});

//created new post
app.post("/posts", async(req, res) => {
    let newPost = new Post(req.body.Post)
    await newPost.save();
    res.redirect("/posts");
});

//show indivisual post
app.get("/posts/:id", async (req, res) =>{
    let{id} = req.params;
    let post = await Post.findById(id);
    console.log(post);
    res.render("show.ejs",{post});
});

//updated post
app.patch("/posts/:id", async(req, res) =>{
    let{id} = req.params;
    await Post.findByIdAndUpdate(id,{...req.body.Post}, {runValidators:true});
    res.redirect("/posts");
});

//updating post
app.get("/posts/:id/edit", async (req, res) =>{
    let{id} = req.params;
    let post = await Post.findById(id);
    console.log(post);
    res.render("edit.ejs",{post});
});

app.delete("/posts/:id", async (req, res) =>{
    let{id} = req.params;
    await Post.findByIdAndDelete(id);  
    res.redirect("/posts");
});

app.get("/", (req, res)=>{
    res.send("Root working..");
})

app.listen(port, () => {
    console.log("Listening to port : 8080");
});