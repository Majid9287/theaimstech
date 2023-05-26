import User from "../../models/User";
import connectDb from "../../../middleware/mongoose";
import nextConnect from "next-connect";
import CryptoJS from "crypto-js";
import dotenv from "dotenv";

dotenv.config();

const apiRoute = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry, something happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(connectDb);

apiRoute.post(async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if OTP exists and is not expired
    if (!user.otp || !user.otp.value || !user.otp.expiresAt || user.otp.expiresAt < new Date()) {
      return res.status(400).json({ error: "Invalid OTP or OTP expired" });
    }

    // Decrypt the OTP using private key from environment variable
    const privateKey = process.env.PRIVATE_KEY; // Get the private key from environment variable
    const decryptedOTP = CryptoJS.AES.decrypt(user.otp.value, privateKey).toString(CryptoJS.enc.Utf8);

    // Compare the decrypted OTP with the user-provided OTP
    if (otp === decryptedOTP) {
      // Reset the OTP fields in the user document
      user.otp.value = undefined;
      user.otp.expiresAt = undefined;
      await user.save();

      return res.status(200).json({ message: "OTP verified successfully" });
    } else {
      return res.status(400).json({ error: "Invalid OTP" });
    }
  } catch (error) {
    res.status(500).json({ error: `Sorry, something happened! ${error.message}` });
  }
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: true, // Enable body parsing
  },
};
