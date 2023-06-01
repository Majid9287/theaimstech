import Team from "../../../models/Team";
import connectDb from "../../../middlewhare/mongoos";
import nextConnect from "next-connect";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { join } from "path";
import { parse } from "url";

let filename = uuidv4() + "-" + new Date().getTime();
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const { pathname } = parse(req.url);
      const folderPath = join(process.cwd(), "public", "uploads", "profiles");
      cb(null, folderPath);
    },
    filename: (req, file, cb) => cb(null, getFileName(file)),
  }),
});


const getFileName = (file) => {
  filename +=
    "." +
    file.originalname.substring(
      file.originalname.lastIndexOf(".") + 1,
      file.originalname.length
    );
  return filename;
};

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

apiRoute.use(upload.array("file")); // attribute name you are sending the file by

apiRoute.post(async (req, res) => {
  try {
    const { name, description } = req.body;
    const photo = `/uploads/profiles/${filename}`;
    const newTeam = new Team({ name, description, photo });
    const savedTeam = await newTeam.save();
    res.status(200).json(savedTeam);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Sorry something Happened! ${error.message}` });
  }
});

export default connectDb(apiRoute);

export const config = {
  api: {
    bodyParser: false, 
  },
};
