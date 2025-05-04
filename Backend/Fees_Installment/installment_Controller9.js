const model = require('./installment_Model')
const fs = require("fs");
const path = require("path");
const pdf = require("pdfkit");

// post API
const add = async(req, res) => {
    const {student_name,installment_no,course_name,fees_date,duration,amount,iamount, status,payment_method} = req.body;
    try {
          // Get previous installments for the student and course
        const previousInstallments = await model.find({ student_name, course_name });

        // Calculate the total amount paid so far
        const totalPaidSoFar = previousInstallments.reduce((sum, inst) => sum + inst.iamount, 0);

        // Calculate the new balance
        const total_balance = amount - (totalPaidSoFar + iamount);
        const data = new model({
            student_name, installment_no, course_name,fees_date,duration,amount,iamount, status,total_balance,payment_method
        });
        const userdata = await data.save()
        res.send({userdata});
    }
    catch (error){
        console.log(error);
        return res.status(500).json({ message:'Internal servar error'})
    }
}

// Get API
const getdata = async(req, res) => {
    try{
        const data = await model.find()
        res.status(200).send({data});
    }catch(err){
        console.log(err);
        return res.status(500).json({message : "Internal server error"})
    }
}

// getById API
const getbyId = async (req, res) => {
    try{
        const data = await model.findOne({_id: req.params._id})
        res.status(200).send({data});
    }catch (error) {
        console.log(error);
    }
}

// Delete API
const Delete = async (req, res) => {
    try{
        const userdata = await model.deleteOne({_id: req.params._id})
        res.status(200).send({userdata});
    }catch (error) {
        // console.log(err);
        res.status(500).send(err);
    }
}


//Update API
const Update = async (req, res) => {
    const {student_name,installment_no,course_name,fees_date,duration,amount,iamount, status,receipt_number,payment_method} = req.body;
    try{
          // Get all previous installments except the current one
        const previousInstallments = await model.find({ student_name, course_name, _id: { $ne: req.params._id } });

        // Sum previous installment amounts
        const totalPaidSoFar = previousInstallments.reduce((sum, inst) => sum + inst.iamount, 0);

        // Calculate the new balance
        const total_balance = amount - (totalPaidSoFar + iamount);
        const data = await model.updateOne(
            {_id: req.params._id},
            { $set: {
                student_name,installment_no,course_name,fees_date,duration,amount,iamount, status,receipt_number, total_balance,payment_method
            },}
            
        );
        if (data.modifiedCount > 0) {
            res.status(200).send({ message: "User updated successfully" });
        } else {
            res.status(404).send({ message: "User not found or no changes made" });
        }
        

    }catch (error) {
        console.log(error);
        res.status(500).send({message: " Internal server error"})
    }
};
const generateReceiptNumber = () => {
    return `REC-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`; // Adds a 4-digit random number
};


const generateReceipt = async (req, res) => {
    try {
        const { id } = req.params; // Ensure id is extracted correctly
        const installment = await model.findById(id);

        if (!installment) {
            return res.status(404).json({ message: "Installment not found" });
        }

        // Ensure receipt_number is generated
        if (!installment.receipt_number) {
            installment.receipt_number = generateReceiptNumber();
            await installment.save();
        }

        const receiptPath = path.join(__dirname, `../receipts/receipt_${installment.receipt_number}.pdf`);
        const doc = new pdf();
        doc.pipe(fs.createWriteStream(receiptPath));

        doc.fontSize(20).text("Payment Receipt", { align: "center" });
        doc.moveDown();
        doc.fontSize(14).text(`Receipt Number: ${installment.receipt_number}`);
        doc.text(`Student Name: ${installment.student_name}`);
        doc.text(`Course Name: ${installment.course_name}`);
        doc.text(`Installment No: ${installment.installment_no}`);
        doc.text(`Fees Date: ${new Date(installment.fees_date).toLocaleDateString()}`);
        doc.text(`Course Duration: ${installment.duration}`);
        doc.text(`Course Fees: ₹${installment.amount}`);

        doc.text(`Payment Status: ${installment.status}`);
        doc.text(`Payment Method: ${installment.payment_method}`);
        doc.text(`Amount Paid: ₹${installment.iamount}`);
        doc.text(`Total Balance: ₹${installment.total_balance}`);
        doc.moveDown();
        doc.text("Thank you for your payment!", { align: "center" });

        doc.end();

        res.json({
            message: "Receipt generated successfully",
            receiptData: installment, // ✅ Include receipt data here
            
            receiptUrl: `/receipts/receipt_${installment.receipt_number}.pdf`,
        });
       
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {add, getdata, getbyId, Delete , Update,generateReceipt}

