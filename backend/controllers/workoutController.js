const Workout = require('../model/Workout');
const mongoose = require('mongoose');

const getWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find().lean().sort({ createdAt: -1 });
        return res.status(200).json(workouts);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getWorkout = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'valid id is required' });
        }
        const workout = await Workout.findOne({ _id: id }).lean().exec();
        if (!workout) return res.status(404).json({ message: 'no such workout exists' });
        res.status(200).json(workout);

    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }

}

const createWorkout = async (req, res) => {
    try {
        const { title, load, reps } = req.body;
        if (!title || !load || !reps || typeof load !== 'number' || typeof reps !== 'number') {
            return res.status(400).json({ message: 'invalid data' });
        }
        const workout = await Workout.create({ title, reps, load });
        return res.status(200).json(workout);
    }
    catch (err) {
        return res.status(500).json({ message: 'internal server error' });
    }


}

const updateWorkout = async (req, res) => {
    try {
        const { id } = req.params;
        const { ...updates } = req.body;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'valid id is required' });
        }
        const workout = await Workout.findOneAndUpdate(
            { _id: id },
            { ...updates }
        ).exec();
        if (!workout) return res.status(404).json({ message: 'no such workout exists' });
        res.status(200).json(workout);
    }
    catch (err) {
        res.status(500).json({ message: 'internal server error' });
    }
}

const deleteWorkout = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "valid id is required" });
        }

        const deleteItem = await Workout.findByIdAndDelete({ _id: id });
        if (!deleteItem) return res.status(400).json({ message: `workout with id:${id} does not exist` });
        res.status(200).json(deleteItem);
    }
    catch (err) {
        res.status(500).json({ message: "internal server error" });
    }

}

module.exports = { createWorkout, getWorkouts, getWorkout, updateWorkout, deleteWorkout };