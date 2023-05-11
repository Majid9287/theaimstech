import Enrollment from "../models/Enrollment";

import nextConnect from "next-connect";
import connectDb from "../../middlewhare/mongoos";

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.delete(async (req, res) => {
  try {
    const { id } = req.query;
    const deletedEnrollment = await Enrollment.findByIdAndDelete(id);
    res.status(200).json(deletedEnrollment);
  } catch (error) {
    res.status(500).json({ error: `Sorry something happened! ${error.message}` });
  }
});

export default connectDb(apiRoute);
