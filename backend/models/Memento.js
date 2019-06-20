const mongoose = require('mongoose');
// const validator = require('validator')

const MementoSchema = new mongoose.Schema({
    owner: String,
    description: String,
    photos: [String],
    // isProfilePicture: Boolean
    // likes
    country: String,
    city: String
})

// MementoSchema.statics.findByOwner = function (owner) {
//     const Memento = this
//     return new Promise((resolve, reject) => {
//         Memento.findOne({ owner: owner, isProfilePicture: true }).then(memento => {
//             if (!memento) {
//                 reject('No memento found')
//             } else {
//                 resolve(memento)
//             }
//         }).catch(err => reject(err))
//     })
// }

const Memento = mongoose.model('Memento', MementoSchema)
module.exports = { Memento };
