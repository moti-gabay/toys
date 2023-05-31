const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const toysSchema = new mongoose.Schema({
  name:String,
  info:String,
  category:String,
 img_url:String,
 price:Number,
 user_id:String
},{timestamps:true});

exports.ToysModel = mongoose.model("toys",toysSchema);




exports.validateToys = (_reqBody) => {
  const joiSchema = Joi.object({
    name:Joi.string ().min(2).max(100).required(),
    info:Joi.string().min(2).max(200).required(),
    category:Joi.string().min(3).max(100).required(),
    img_url:Joi.string().min(3).max(300).required(),
    price:Joi.number().min(3).max(99999).required(),
  })

  return joiSchema.validate(_reqBody);
}

