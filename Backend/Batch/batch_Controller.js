const model = require('../Batch/batch_Model');

// Post API - Add new batch
const add = async (req, res) => {
    const { batch_name, start_date, student_name, end_date, status } = req.body;
    try {
        const data = new model({ batch_name, start_date, student_name, end_date, status });
        const batchData = await data.save();
        res.status(201).send({ batchData });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Get API - Retrieve all batches
const getdata = async (req, res) => {
    try {
        const data = await model.find();
        res.status(200).send({ data });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// GetById API - Retrieve batch by ID
const getbyId = async (req, res) => {
    try {
        const data = await model.findOne({ _id: req.params.id }); // Fixed params issue
        if (!data) {
            return res.status(404).json({ message: 'Batch not found' });
        }
        res.status(200).send({ data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete API - Delete batch by ID
const Delete = async (req, res) => {
    try {
        const result = await model.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Batch not found' });
        }
        res.status(200).json({ message: 'Batch deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update API - Update batch details
const Update = async (req, res) => {
    const { batch_name, start_date, student_name, end_date, status } = req.body;
    try {
        const result = await model.updateOne(
            { _id: req.params.id },
            { $set: { batch_name, start_date, student_name, end_date, status } }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: 'Batch not found or no changes made' });
        }

        res.status(200).json({ message: 'Batch updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { add, getdata, getbyId, Delete, Update };
