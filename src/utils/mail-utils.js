'use strict';

var config  = require('../config/config'),
    mailgun = require('mailgun-js')({ apiKey: config.mailer.key, domain: config.mailer.domain });

exports.sendEmail = sendEmail;

function sendEmail (to, title, content) {
    if (to) {
        var data = {
            from: 'uLiv <noreply@uLiv.com>',
            to: to,
            subject: title,
            text: content
        };

        mailgun.messages().send(data, function (error, body) {
            if (error) throw error;
        });
    }
}