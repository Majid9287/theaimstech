import Enrollment from "../models/Enrollment";
import User from "../models/User";
import Course from "../models/Course";

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

apiRoute.get(async (req, res) => {
  try {
    const userId = req.query.userId;
    const enrollments = await Enrollment.find({ user: userId })
      .populate('user', 'name email phone address')
      .populate('course', 'name duration description price photo')
      .select('createdAt user course');

    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ error: `Sorry something happened! ${error.message}` });
  }
});

export default connectDb(apiRoute);
