import mongoose from 'mongoose';

const EnrollmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" }
},
{timestamps:true});

export default mongoose.models.Enrollment || mongoose.model("Enrollment", EnrollmentSchema);
