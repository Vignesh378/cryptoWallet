const UserModel = require('../model/user.model');
const path = require('path');

async function handllingSignupFrom(req, res) {
    try {
        const { username, email, password } = req.body;
         
        // Validate the email field
        if (typeof email !== 'string' || !email.trim()) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        // Check if the email already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Create a new user
        await UserModel.create({ username, email, password });
        return res.status(200).json({redirect:'/seed'});
    } catch (error) {
        console.error('Error:', error);

        // Handle duplicate key error
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            return res.status(400).json({ message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists` });
        }

        // Handle other errors
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    handllingSignupFrom,
};