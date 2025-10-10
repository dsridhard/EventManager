import express from 'express';
import User from "../models/user.model.js"
import { auth, role } from '../middleware/auth.js';
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const users = await User.find()
            .select("name email role createdAt updatedAt") // Specify the fields to include
            .populate(["name", "email", "role", "createdAt", "updatedAt"]); // Populate if necessary

        res.json(users);
    } catch (error) {
        res.status(500).json({ err: "An error occurred while fetching data." });
    }
});

//Update User
router.put("/:id", async (req, res) => {
    const userUpdate = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(userUpdate)
})

//Delete User
router.delete("/:id", async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: "User Removed Successfully" });
});

export default router; 