const express = require("express");
const app = express();
const port = 8080;

const path = require("path");

const { v4: uuidv4 } = require('uuid');

const methodOverride = require('method-override');

app.use(methodOverride('_method'));

app.use(express.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id : uuidv4(),
        username : "vinit",
        content : "I love web development."
    },
    {
        id : uuidv4(),
        username : "sonu",
        content : "I love dsa."
    },
    {
        id : uuidv4(),
        username : "shivam",
        content : "I love priyanka."
    },
    {
        id : uuidv4(),
        username : "shivanshu",
        content : "I love ganja."
    }
];

app.get("/posts", (req, res) => {
    console.log("posts send");
    res.render("index.ejs", {posts});
});

app.get("/posts/new", (req, res) => {
    console.log("creating a new post");
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {
    let{username, content} = req.body;
    let id = uuidv4();
    posts.push({id, username, content});
    res.redirect("/posts");
    res.send("sends a post request");
});

app.get("/posts/:id", (req, res) =>{
    let{id} = req.params;
    let post = posts.find((p) => id === p.id);
    console.log(post);
    console.log(id);
    res.render("show.ejs",{post});
});

app.patch("/posts/:id", (req, res) =>{
    let{id} = req.params;
    let post = posts.find((p) => id === p.id);
    let newContent = req.body.content;
    post.content = newContent;
    console.log(post);
    console.log(id);
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) =>{
    let{id} = req.params;
    let post = posts.find((p) => id === p.id);
    console.log(post);
    res.render("edit.ejs",{post});
});

app.delete("/posts/:id", (req, res) =>{
    let{id} = req.params;
    posts = posts.filter((p) => id !== p.id);  
    res.redirect("/posts");
});

app.get("/", (req, res)=>{
    res.send("Root working..");
})

app.listen(port, () => {
    console.log("Listening to port : 8080");
});