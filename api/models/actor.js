const mongoose = require('mongoose');

const actorSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthDate: { type: Date },
    gender: { type: String },
    thumb: { type: String }
});

const Actor = mongoose.model('Actor', actorSchema);

module.exports = Actor;
