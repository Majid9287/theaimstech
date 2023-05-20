import User from "../../models/User";
import connectDb from "../../../middlewhare/mongoos";
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { email, password } = req.body;

    // Check if user with the given email exists
    const user = await User.findOne({ email });
    var bytes  = CryptoJS.AES.decrypt(user.password, 'majidmuskan123');
       var originalText = bytes.toString(CryptoJS.enc.Utf8);
    if (user) {
        if(req.body.email==user.email && req.body.password== originalText){
          var token = jwt.sign({ _id:user._id,isAdmin:user.isAdmin}, 'majidmuskankey0306',{ expiresIn: '1d' });
            res.status(200).json({ success: true,token });
        }
        else{
            return res.status(401).json({ error: "Invalid email or password" });
        }
     
    }

    else{
        return res.status(401).json({ error: "Invalid email or password" });
    }
    

   

    
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};

export default connectDb(handler);
