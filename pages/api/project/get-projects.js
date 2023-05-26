import Project from "../../models/Project";
import connectDb from "../../../middlewhare/mongoos";
import nextConnect from "next-connect";

const apiRoute = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.get(async (req, res) => {
  try {
    const Projects = await Project.find({});
    res.status(200).json(Projects);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Sorry something Happened! ${error.message}` });
  }
});

export default connectDb(apiRoute);

export const config = {
  api: {
    bodyParser: true, // Disallow body parsing, consume as stream
  },
};
