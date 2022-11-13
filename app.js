const express = require("express");
const cors = require("cors");
const app = express();
const port = 3333;
// Your github page origin has to be written EXACTLY like this! https://behu-kea.github.io
const URL_FOR_FRONTEND = "YOUR_GITHUB_PAGE_ORIGIN_HERE";

app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

// If the application is running localhost allow all requests,
// otherwise add cors for specific website
// Remember to add the NODE_ENV="prod" on server!
const cors_url = process.env.NODE_ENV === "prod" ? URL_FOR_FRONTEND : "*";
app.use(
    cors({
        origin: cors_url
    })
);

// ========== Import / require posts from data.js ========== //
// Todo

// ========== REST API Implementation ========== //

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// ========== READ: read all posts from posts ========== //
// Todo

let articles = require("./data.js");
const {response} = require("express");

app.get("/articles", (req, response) => {
    return response.json(articles);
});

// ========== READ: get post by id ========== //
// Todo

app.get("/articles/:id", (req, res) => {
    const id = req.params.id;
    const post = articles.find(item => item.id == id);
    return res.json(post);
});

// ========== CREATE: create new post and add to posts ========== //
// Todo

app.post("/articles",(req, res)=>{
    let newPost = req.body;
    newPost.id = Date.now();
    articles.push(newPost);
    return res.json(newPost);
})

// ========== UPDATE: update existing post ========== //
// Todo

app.put("/articles/:id", (req, res) => {
    const id = req.params.id;
    const articlesData = req.body;
    let post = articles.find(item => item.id == id);
    post.name = articlesData.name;
    post.title = articlesData.title;
    post.mail = articlesData.mail;
    post.image = articlesData.image;
    return res.json(articles);
});

// ========== DELETE: delete post ========== //
// Todo

app.delete("/articles/:id", (req, res) => {
    const id = req.params.id;
    articles = articles.filter(post => post.id != id);
    return res.json(articles);
});

app.listen(port, () => {
    console.log(`Node.js REST API listening at http://localhost:${port}`);
});