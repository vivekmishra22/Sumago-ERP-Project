const mongoose = require('mongoose');

const data = mongoose.Schema({
    paymentStatus: { type: String, default: "unpaid" },
    // paymentId: String,
    // paymentDate: Date,
    student_name:{
        type:String,
        required:true,
    },
    installment_no:{
        type:Number,
        required:true,
    },
    fees_date:{
        type:Date,
        required:true,
    },
    course_name:{
        type:String,
        required:true,
    },
    duration:{
        type:String,
        required:true,
    },
    iamount:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    total_balance:
    {
        type:Number,
        required:true,
    },
    receipt_number: 
    { type: String, 
        unique: true ,
        required: true,
        default: () => `REC-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`, // Generates a unique value
    },
    payment_method: 
    { type: String, enum: ["Cash", "Debit Card","Credit Card", "Bank Transfer", "UPI"], 
        required: true }  
})

module.exports = mongoose.model("Fees Installment", data);