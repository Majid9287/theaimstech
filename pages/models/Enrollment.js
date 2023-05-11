const mongoose = require("mongoose");

const EnrollmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" }
},
{timestamps:true});
//mongoose.models = {};
export default mongoose.models.Enrollment || mongoose.model("Enrollment", EnrollmentSchema);
