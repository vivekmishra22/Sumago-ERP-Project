const ProjectModel = require('./project_Model'); // Adjust the path to your Project model

// POST API
const addProject = async (req, res) => {
    const { projectTitle, startDate, description, completionDate, status } = req.body;
    try {
        const data = new ProjectModel({
            projectTitle, startDate, description, completionDate, status
        });
        const projectData = await data.save();
        res.send({ projectData });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// GET API (Get all projects)
const getProjects = async (req, res) => {
    try {
        const data = await ProjectModel.find();
        res.status(200).send({ data });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// GET BY ID API (Get a single project by ID)
const getProjectById = async (req, res) => {
    try {
        const data = await ProjectModel.findOne({ _id: req.params._id });
        if (!data) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).send({ data });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// DELETE API (Delete a project by ID)
const deleteProject = async (req, res) => {
    try {
        const projectData = await ProjectModel.deleteOne({ _id: req.params._id });
        if (projectData.deletedCount === 0) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).send({ message: "Project deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

// UPDATE API (Update a project by ID)
const updateProject = async (req, res) => {
    const { projectTitle, startDate, description, completionDate, status } = req.body;
    try {
        const data = await ProjectModel.updateOne(
            { _id: req.params._id },
            {
                $set: {
                    projectTitle, startDate, description, completionDate, status
                },
            }
        );
        if (data.matchedCount === 0) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).send({ message: "Project updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

module.exports = { addProject, getProjects, getProjectById, deleteProject, updateProject };