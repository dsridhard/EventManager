import mongoose from "mongoose"
const contactSchema  = new mongoose.Schema(
    {
        name:String,
        email:{type:String},
        message:{type:String},
         timestamp: {
         type: Date, 
         default: Date.now,
  },
    }
)
export default mongoose.model("Contact",contactSchema)