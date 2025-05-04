const express = require('express')
const router = express.Router()
const Notes = require('../model/Notes')

router.get('/:id', async (req,res) =>  {
    const notes = await Notes.find({ userId: req.params.id });
    res.send(notes);
})

router.post('/', async (req, res) => {
    const { userId, date, mood, desc } = req.body;

    // Check if the user is authorized
    if (!userId) {
        return res.status(401).json({
            message: "Unauthorized access. Please sign in to your account to continue."
        });
    }

    // Validate the input fields
    if (!date || !mood || !desc || date.length === 0 || mood.length === 0 || desc.length === 0) {
        return res.status(400).json({
            message: "Invalid input. All fields (date, mood, and description) are required and cannot be empty."
        });
    }

    try {
        // Create and save the note
        const note = new Notes(req.body);
        await note.save();
        res.status(200).send(note);
    } catch (err) {
        res.status(500).json({
            message: "An error occurred while saving the note: " + err.message
        });
    }
});

router.delete('/:id', async (req,res) => {
    try{
        await Notes.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Note deleted successfully' });
    }
    catch(err) {
        res.status(500).json({ message: 'Error deleting Note: '+err });
    }
})

module.exports = router;