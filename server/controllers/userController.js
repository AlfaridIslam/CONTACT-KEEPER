const User = require("../models/userModel");
const createToken = require("../utils/token");

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user.id); // Use id for token creation

        res.status(200).json({ id: user.id, token }); // Return id and token
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const signupUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.signup(email, password);
        const token = createToken(user.id); // Use id for token creation

        res.status(200).json({ id: user.id, token }); // Return id and token
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    loginUser,
    signupUser,
};
