import Team from "../../../models/Team";
import connectDb from "../../../middlewhare/mongoos";
import nextConnect from "next-connect";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

let filename = null;
const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads/profiles", // destination folder
    filename: (req, file, cb) => cb(null, getFileName(file)),
  }),
});

const getFileName = (file) => {
  filename = uuidv4() + "-" + new Date().getTime();
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
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single("file")); // attribute name you are sending the file by 

// Update Team API
apiRoute.put(async (req, res) => {
  try {
    const { id, name, description} = req.body;
    let photo = "";
    if (req.file) {
      if (filename) {
        // Remove previous file if photo is being updated
        const prevTeam = await Team.findById(id);
        if (prevTeam.photo) {
          const filePath = "./public" + prevTeam.photo;
          fs.unlinkSync(filePath);
        }
      }
      photo = `/uploads/profiles/${filename}`;
    }
    const updatedTeam = await Team.findByIdAndUpdate(id,
      {
        name,
        description,
        photo,
      },
      { new: true }
    );
    if (!updatedTeam) {
      return res.status(404).json({ error: "Team not found with the given ID" });
    }
    res.status(200).json(updatedTeam);
  } catch (error) {
    res.status(500).json({ error: `Sorry something Happened! ${error.message}` });
  }
});

export default connectDb(apiRoute);




