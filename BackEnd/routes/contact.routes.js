import express from "express"
import contactSchema from "../models/contactus.model.js"

const router = express.Router();

// ContactUs
router.post("/",async (req,res)=>{
    const {name,email,message} =req.body;
    console.log({name,email,message})
   try {
    
    const contactus = await contactSchema.create({name,email,message})
    res.json({msg:"You have successfully submitted your query"})
   } catch (error) {
    res.json({err:`Something went Wrong please retry`})
   }
})

router.get("/", async (req, res) => {
  try {
    const contactqueries = await contactSchema.find().populate("");
    res.json(contactqueries);
  } catch (error) {
    res.status(500).json({ err: "An error occurred while fetching data." });
  }
});

export default router