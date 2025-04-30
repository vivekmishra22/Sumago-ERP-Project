// Import the model (from the documentModel.js file) which is used to interact with the database.
const model = require('../Documents/documents_Model');

// GET API (fetch all documents from the database)
const getdata = async (req, res) => {
    try {
        const data = await model.find(); // Fetch all documents
        res.status(200).send({ data });  // Respond with data
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// GET API ONLY FIND ONE (fetch a user's document by ID)
const GetuserById = async (req, res) => {
    try {
        const { _id } = req.params;  // Extract ID from URL
        const userData = await model.findOne({ _id: _id }); // Find document
        res.status(200).send({ userData }); // Respond with found document
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// POST API (Add new document)
const add = async (req, res) => {
    // const {
    //     // userId,
    //     aadharCard,
    //     panCard,
    //     tenthMarksheet,
    //     twelfthMarksheet,
    //     graduationMarksheet,
    //     postGraduationMarksheet
    // } = req.body;

    try {

        const data = new model({
            studentName: req.body.studentName,
            aadharCard: req.files['aadharCard']?.[0]?.filename,
            panCard: req.files['panCard']?.[0]?.filename,
            tenthMarksheet: req.files['tenthMarksheet']?.[0]?.filename,
            twelfthMarksheet: req.files['twelfthMarksheet']?.[0]?.filename,
            graduationMarksheet: req.files['graduationMarksheet']?.[0]?.filename,
            postGraduationMarksheet: req.files['postGraduationMarksheet']?.[0]?.filename || null
        });
        
        // const data = new model({
        //     // userId,
        //     aadharCard,
        //     panCard,
        //     tenthMarksheet,
        //     twelfthMarksheet,
        //     graduationMarksheet,
        //     postGraduationMarksheet: postGraduationMarksheet || null
        // });

        const userdata = await data.save(); // Save to DB
        res.send({ userdata }); // Respond with saved document
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// DELETE API (Delete document by ID)
const deletedata = async (req, res) => {
    try {
        const data = await model.deleteOne({ _id: req.params.id }); // Delete by ID
        res.status(200).send({ data }); // Respond with result
    } catch (error) {
        res.status(500).send(error);
    }
};

// PUT API (Update document by ID)
const putdata = async (req, res) => {
    // const {
    //     aadharCard,
    //     panCard,
    //     tenthMarksheet,
    //     twelfthMarksheet,
    //     graduationMarksheet,
    //     postGraduationMarksheet
    // } = req.body;

    try {

        // const data = await model.updateOne(
        //     { _id: req.params._id }, // Match by ID
        //     {
        //         $set: {
        //             aadharCard,
        //             panCard,
        //             tenthMarksheet,
        //             twelfthMarksheet,
        //             graduationMarksheet,
        //             postGraduationMarksheet: postGraduationMarksheet || null
        //         }
        //     }
        // );

        const data = await model.updateOne(
            { _id: req.params._id },
            {
                $set: {
                    studentName: req.body.studentName,
                    aadharCard: req.files['aadharCard']?.[0]?.filename,
                    panCard: req.files['panCard']?.[0]?.filename,
                    tenthMarksheet: req.files['tenthMarksheet']?.[0]?.filename,
                    twelfthMarksheet: req.files['twelfthMarksheet']?.[0]?.filename,
                    graduationMarksheet: req.files['graduationMarksheet']?.[0]?.filename,
                    postGraduationMarksheet: req.files['postGraduationMarksheet']?.[0]?.filename || null
                }
            }
        );

        if (data.modifiedCount > 0) {
            res.status(200).send({ message: "Document updated successfully" });
        } else {
            res.status(404).send({ message: "Document not found or no changes made" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal server error" });
    }
};

// Export all the API handler functions
module.exports = { getdata, add, GetuserById, deletedata, putdata };
