import User from "../../models/User";
var CryptoJS = require("crypto-js");
import connectDb from "../../../middlewhare/mongoos";

const handler = async (req, res) => {
  if (req.method == "POST") {
    console.log(req.body);
    const { name, email,phone,address } = req.body;
    const privateKey = process.env.PRIVATE_KEY;
    let u = new User({
      name,
      email,
      phone,
      address,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        privateKey
      ).toString(),
    });

    await u.save();

    res.status(200).json({ success: "success" });
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};
export default connectDb(handler);
