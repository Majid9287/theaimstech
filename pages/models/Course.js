const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    duration: { type: Number, required: true },
    description: { type: String, required: true },
    enrollment: { type: String, required: true },
    price: { type: Number, required: true },
    photo: { type: String, required: false }
  });
  //mongoose.models={}
  export default mongoose.models.Course ||mongoose.model("Course",CourseSchema );