const Task = require('../Modal/Taskmodal');

const createTask = async (req, res) => {
    try {
        const { title, description, deadline } = req.body;
        const newTask = new Task({
            title,
            description,
            deadline,
            completed: false,
            favorite: false
        });
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        await Task.findByIdAndDelete(id);
        res.status(204).end(); // No content to return
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = { createTask, getTasks, updateTask ,deleteTask};
