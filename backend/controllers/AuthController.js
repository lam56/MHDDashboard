const AuthService = require("../services/AuthService");

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const tokenData = await AuthService.login(email, password);
        res.json(tokenData);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};
