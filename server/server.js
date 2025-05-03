const express = require('express')
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const NotesRouter = require('./routes/NotesRoutes')

dotenv.config();

const PORT = 3000;
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/MemoMate';

app.use(express.json());
app.use(cors());

app.use('/api/notes', NotesRouter);

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("DB Connected Successfully")
    })
    .catch((err) => {
        console.error(err)
        process.exit(1);
    })

app.listen(PORT, () => {
    console.log(`Running on server localhost:${PORT}`)
});