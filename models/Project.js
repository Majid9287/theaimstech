import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    photo: { type: String, required: false }
  });

  export default mongoose.models.Project ||mongoose.model("Project",ProjectSchema );