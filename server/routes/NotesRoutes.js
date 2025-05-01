const express = require('express')
const router = express.Router()
const Notes = require('../model/Notes')

router.get('/', async (req,res) =>  {
    const notes = await Notes.find();
    res.send(notes);
})

router.post('/', async (req,res) => {
    const {date,mood,desc}=req.body;
    if(date.length > 0 && mood.length > 0 && desc.length > 0) {
        const note = await Notes(req.body);
        await note.save();
        res.status(200).send(note);
    }
    else {
        res.status(400).json({ message: "Any parameter should not be null" })
    }
})

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