const mongoose = require('mongoose');
let IosTesting = new mongoose.Schema({
    author: {
        type: String,
        unique: true,
        required: true
    },
    title: {
        type: String,
        required: true
    },
   
});
module.exports = mongoose.model('IosTesting', IosTesting);