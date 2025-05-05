const mongoose = require ("mongoose");

const data = mongoose.Schema({

    batch_name: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
        required: true,
    },
    student_name: {
        type: String,
        // required: true
    },
    end_date: {
        type: Date,
        required: true
        // validate: {
        //     validator: function (value) {
        //         return this.start_date && this.start_date < value;
        //     },
        //     message: 'End date must be after start date.'
        // }
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'], // Restrict possible values
        required: true,
    }
})

module.exports = mongoose.model("Students_Batch", data)