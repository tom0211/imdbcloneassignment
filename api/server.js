const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const imdbCloneRoutes = require('./routes/imdbCloneRoutes')
require('dotenv').config()

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

mongoose.connect(`mongodb+srv://${process.env.MONGO_USR}:${process.env.MONGO_PASS}@cluster0.zfpb7fb.mongodb.net/${process.env.MONGO_DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.use("/api", imdbCloneRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
