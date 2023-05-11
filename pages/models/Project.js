const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    photo: { type: String, required: false }
  });
  //mongoose.models={}
  export default mongoose.models.Project ||mongoose.model("Project",CourseSchema );