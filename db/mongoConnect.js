const mongoose = require('mongoose');
const {config} = require("../config/secret")
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(`mongodb+srv://${config.ATLAS_USER}:${config.ATLAS_PASSWORD}@cluster0.7tjbdlb.mongodb.net/idf8`);
  // await mongoose.connect('mongodb+srv://Moti770:Mg123456@cluster0.7tjbdlb.mongodb.net/idf8');
  console.log("mongo connect idf8 mongo ");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}