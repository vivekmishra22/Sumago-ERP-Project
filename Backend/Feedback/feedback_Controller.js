const Feedback = require('./feedback_Model'); // Make sure the correct model is imported

// Create New Feedback
const add = async (req, res) => {
    const {
        user_name, course_name, trainer_name, current_date, training_rating, trainer_explanation,
        materials_helpful, practical_exercises, confidence_using_skills, learning_expectations_met,
        liked_most, improvements, other_comments
    } = req.body;
    
    try {
        const data = new Feedback({
            user_name, course_name, trainer_name, current_date, training_rating, trainer_explanation,
            materials_helpful, practical_exercises, confidence_using_skills, learning_expectations_met,
            liked_most, improvements, other_comments
        });

        const feedbackData = await data.save();
        res.status(201).json({ success: true, feedbackData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Get All Feedbacks
const getdata = async (req, res) => {
    try {
        const data = await Feedback.find();
        res.status(200).json({ success: true, data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Get Feedback by ID
const getbyId = async (req, res) => {
    try {
        const data = await Feedback.findById(req.params.id);
        if (!data) {
            return res.status(404).json({ success: false, message: "Feedback not found" });
        }
        res.status(200).json({ success: true, data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Delete Feedback
const Delete = async (req, res) => {
    try {
        const deletedData = await Feedback.findByIdAndDelete(req.params.id);
        if (!deletedData) {
            return res.status(404).json({ success: false, message: "Feedback not found" });
        }
        res.status(200).json({ success: true, message: "Feedback deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Update Feedback
const Update = async (req, res) => {
    const {
        user_name, course_name, trainer_name, current_date, training_rating, trainer_explanation,
        materials_helpful, practical_exercises, confidence_using_skills, learning_expectations_met,
        liked_most, improvements, other_comments
    } = req.body;
    
    try {
        const updatedData = await Feedback.findByIdAndUpdate(
            req.params.id,
            {
                user_name, course_name, trainer_name, current_date, training_rating, trainer_explanation,
                materials_helpful, practical_exercises, confidence_using_skills, learning_expectations_met,
                liked_most, improvements, other_comments
            },
            { new: true } // Returns updated document
        );

        if (!updatedData) {
            return res.status(404).json({ success: false, message: "Feedback not found" });
        }
        res.status(200).json({ success: true, message: "Feedback updated successfully", updatedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = { add, getdata, getbyId, Delete, Update };
