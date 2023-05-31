const express = require("express");
const {ToysModel, validateToys} = require("../models/toysModel");
const { auth } = require("../middlewares/auth");
const router = express.Router();

router.get("/", async(req,res) => {
  try{
    const perPage = req.query.perPage || 10;
    const page = req.query.page - 1 || 0;
    const sort = req.query.sort || "_id";
    const reverse = req.query.reverse == "yes" ? 1 : -1;
    const category = req.query.cat;
    const search = req.query.s;
    const user_id = req.query.user_id;
     const min = req.query.min || 100;
    const max = req.query.max || 500;

    let filterFind = {};

if(search){
  const searchExp = new RegExp(search,"i");
filterFind = {$or:[{ name:searchExp},{info:searchExp}]};
}
if(user_id){
  filterFind = {user_id}
 }
 if(category){
  filterFind = {category}
 }
 if (min && max) {
      filterFind = { price: { $gte: min, $lte: max } };
    }
    const data = await ToysModel
    .find(filterFind)
    .limit(perPage)
    .skip(page * perPage)
    .sort({[sort]:reverse});
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})

router.get("/single/:id",async(req,res)=>{
 try{
  const id = req.params.id;
  const data = await ToysModel
  .find({_id:id})
  .limit(1)
  res.json(data)
 }
 catch(err){
  console.log(err);
  res.status(502).json({err})
 }
})



router.post("/", auth ,async(req,res) => {
  const validBody = validateToys(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details)
  }
  try{
    const toys = new ToysModel(req.body);
    toys.user_id = req.tokenData._id
    await toys.save();
    res.status(201).json(toys);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})



router.put("/:id", auth,async(req,res) => {
  const validBody = validateToys(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details)
  }
  try{
    const id = req.params.id;
    const data = await ToysModel.updateOne({_id:id,user_id:req.tokenData._id},req.body);
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})

router.delete("/:id",auth, async(req,res) => {
  try{
    const id = req.params.id;
    const data = await ToysModel.deleteOne({_id:id,user_id:req.tokenData._id});
    // deletedCount:1
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})

module.exports = router;