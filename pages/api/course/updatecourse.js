import Course from "../../models/Course";
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

// Update Course API
apiRoute.put(async (req, res) => {
  try {
    const { id, name, duration, description, enrollment, price } = req.body;
    let photo = "";
    if (req.file) {
      if (filename) {
        // Remove previous file if photo is being updated
        const prevCourse = await Course.findById(id);
        if (prevCourse.photo) {
          const filePath = "./public" + prevCourse.photo;
          fs.unlinkSync(filePath);
        }
      }
      photo = `/uploads/profiles/${filename}`;
    }
    const updatedCourse = await Course.findByIdAndUpdate(id,
      {
        name,
        duration,
        description,
        enrollment,
        price,
        photo,
      },
      { new: true }
    );
    if (!updatedCourse) {
      return res.status(404).json({ error: "Course not found with the given ID" });
    }
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ error: `Sorry something Happened! ${error.message}` });
  }
});

export default connectDb(apiRoute);

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};


