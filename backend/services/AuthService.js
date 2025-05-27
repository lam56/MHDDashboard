const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

exports.login = async (email, password) => {
    return new Promise((resolve, reject) => {
        UserModel.findByEmail(email, async (err, results) => {
            if (err || results.length === 0) return reject(new Error("Invalid email"));

            const user = results[0];

            if (password !== user.password) {
                return reject(new Error("Invalid password"));
            }

            const token = jwt.sign(
                { id: user.id, role: user.role, team: user.team },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
            );

            resolve({ token, role: user.role });
        });
    });
};
