import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema({
    name: { required: true, type: String },
    profile: { required: false, type: String },
    position: { required: true, type: String },
    isLeaderShip:{required:true, type:Boolean , default:false}
})

export default mongoose.models.Team || mongoose.model("Team", TeamSchema);