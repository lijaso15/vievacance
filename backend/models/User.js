const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs')

// const PhotoSchema = new mongoose.Schema({
//     contentType: String,
//     image: {}
// })


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true, // trim whitespace
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isadmin: Boolean,
    profilePicture: String
});


UserSchema.statics.findByEmail = function (email) {
    const User = this
    return new Promise((resolve, reject) => {

        User.findOne({ email: email }).then((user) => {
            if (!user) {
                reject('no user found')
            } else {
                resolve(user)
            }
        }).catch(err => {
            reject(err)
        })
    })
}

UserSchema.statics.findByUsername = function (username) {
    const User = this
    return new Promise((resolve, reject) => {

        User.findOne({ username: username }).then((user) => {
            if (!user) {
                reject('no user found')
            } else {
                resolve(user)
            }
        }).catch((err) => {
            reject(err)
        })
    })
}

// This function runs before saving user to database
UserSchema.pre('save', function (next) {
    const user = this
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (error, salt) => {
            bcrypt.hash(user.password, salt, (error, hash) => {
                user.password = hash
                next()
            })
        })
    } else {
        next();
    }
})

// Our own student finding function 
UserSchema.statics.findByEmailPassword = function (email, password) {
    const User = this
    return new Promise((resolve, reject) => {
        User.findByEmail(email).then((user) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    resolve(user)
                } else {
                    reject({ password: 'incorrect password' })
                }
            })
        }, (nothing) => {
            reject({ email: 'incorrect email' })
        })
    })
}




const User = mongoose.model('User', UserSchema);

module.exports = { User };
