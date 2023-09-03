const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    releaseDate: { type: Date },
    genre: { type: String },
    description: { type: String },
    thumb: { type: String },
    director: { type: mongoose.Schema.Types.ObjectId, ref: 'Director' },
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
