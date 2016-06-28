'use strict';

var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema;

var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        default: ''
    },
    birth: {
        type: Date,
        default: Date.now
    },
    weight: {
        type: String,
        default: ''
    },
    height: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    picture: {
        type: String,
        default: ''
    },
    created: {
        type: Date,
        default: Date.now
    },
    account_id: {
        type: Schema.ObjectId,
        ref: 'Account',
        required: true
    }
});

module.exports = mongoose.model('User', UserSchema);
