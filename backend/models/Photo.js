const mongoose = require('mongoose');



const PhotoSchema = new mongoose.Schema({
    contentType: String,
    image: {},
    owner: String
})

const Photo = mongoose.model('Photo', PhotoSchema)
module.exports = { Photo };
