require("dotenv").config();
console.log(process.env.USER_DB);

exports.config = {
    TOKEN_SECRET:process.env.TOKEN_SECRET,
   ATLAS_USER:process.env.ATLAS_USER ,
   ATLAS_PASSWORD:process.env.ATLAS_PASSWORD
}