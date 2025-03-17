const mongoose = require('mongoose');
const data = mongoose.Schema({
    office_name: {
        type: String,
        required: true
    },
    office_city_name: {
        type: String,
        required: true,
    },
    office_city_address: {
        type: String,
        required: true,
    },
    status: {
        // type:active/inactive,
        type: String,
        required: true,
    }


})

module.exports = mongoose.model('office', data);

