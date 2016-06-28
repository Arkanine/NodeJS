'use strict';

var multer  = require('multer'),
    mime    = require('mime'),
    fs      = require('fs'),
    storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads/')
        },
        filename: function (req, file, cb) {
            var fileFormat      = '.' + mime.extension(file.mimetype),
                validFormats    = ['.png', '.jpg', '.gif'],
                fileName        = 'file-' + Date.now() + fileFormat;

            if(validFormats.indexOf(fileFormat) >= 0) cb(null, fileName);
        }
    }),
    limits = {
        fileSize: 10 * 1024 * 1024
    },
    multerUpload = multer({storage: storage, limits: limits}).single('file');

function upload(req, res) {
    multerUpload(req, res, function(err) {
        if(err) return res.status(500).send({error: 'Something wrong with file uploading'});
        if(!req.file) return res.status(500).send({error: 'File is not exist'});

        var path        = req.file.path,
            callback    = { path: path };

        fs.writeFile(path, req.file);

        return res.status(200).json(callback);
    });
}

module.exports = {
    upload: upload
};