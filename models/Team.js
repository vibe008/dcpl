import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema({
    name: { required: true, type: String },
    profile: { required: false, type: String },
    position: { required: true, type: String },
    isLeaderShip:{required:true, type:Boolean , default:false},
    description: { required: false, type: String },
    email: { required: false, type: String }
})

if (mongoose.models.Team) {
    delete mongoose.models.Team;
}

export default mongoose.models.Team || mongoose.model("Team", TeamSchema);