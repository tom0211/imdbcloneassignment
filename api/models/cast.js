const mongoose = require('mongoose');

const castSchema = new mongoose.Schema({
    movieid: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
    actorid: { type: mongoose.Schema.Types.ObjectId, ref: 'Actor' },
    role: { type: String },
});

const Cast = mongoose.model('Cast', castSchema);

module.exports = Cast;
