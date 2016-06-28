'use strict';

var bcrypt      = require('bcryptjs'),
    mongoose    = require('mongoose'),
    Schema      = mongoose.Schema;

var AccountSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        select: false
    },
    created: {
        type: Date,
        default: Date.now
    }
});

AccountSchema.pre('save', function(next) {
    var account = this;
    if (!account.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            return next(err);
        }
        bcrypt.hash(account.password, salt, function(err, hash) {
            if (err) {
                return next(err);
            }
            account.password = hash;
            next();
        });
    });
});

AccountSchema.methods.comparePassword = function(password, callback) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        callback(err, isMatch);
    });
};

module.exports = mongoose.model('Account', AccountSchema);
