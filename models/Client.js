import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name:{required:true, type:String},
    logo:{required:false, type:String},
    sector:{required:true, type:String}
})

export default mongoose.models.Client || mongoose.model("Client", contactSchema);