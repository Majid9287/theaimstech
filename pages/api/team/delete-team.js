import Team from "../../models/Team";
import connectDb from "../../../middlewhare/mongoos";
import nextConnect from "next-connect";
import fs from "fs";
import { join } from "path";

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.delete(async (req, res) => {
  try {
   
    const { id } = req.query;
   
    const team = await Team.findById(id);
    if (!team) {
      return res.status(404).json({ error: "team not found" });
    }
    const photoPath = join(process.cwd(), "public", team.photo);
    await Team.findByIdAndDelete(id);
    fs.unlinkSync(photoPath);
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: `Sorry something Happened! ${error.message}` });
  }
});

export default connectDb(apiRoute);

export const config = {
  api: {
    bodyParser: false,
  },
};
