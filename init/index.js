const mongoose = require("mongoose");
const initdata = require("./data.js");
const Post = require("../models/post.js");
const mongo_url = 'mongodb://127.0.0.1:27017/rest';

main()
    .then(() => {
        console.log("connected to mongo successfully..");
    })
    .catch((err) => {
        console.log(err)
    });

async function main() {
  await mongoose.connect(mongo_url);
}

const initDB = async () => {
    await Post.deleteMany({});
    await Post.insertMany(initdata.data);
    console.log("data have been initilized...");
}
initDB();