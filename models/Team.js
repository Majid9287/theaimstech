import mongoose from 'mongoose';

const TeamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    photo: { type: String, required: false }
  });

  export default mongoose.models.Team ||mongoose.model("Team",TeamSchema );