const Profile = require("../models/profile");

exports.register = async (req, res) => {
    console.log(req.body);
    const profile = new Profile(req.body);
    try {
        const user = await profile.save();
        return res.status(200).json(user);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(500).json({ error: "Duplicate user" });
        }
        return res.status(500).json({ error: "Failure" });
    }
};

exports.login = async (req, res) => {
    try {
        const user = await Profile.findOne({ username: req.body.username });
        if (!user) return res.status(404).json({ error: "User not found" });

        if (user.password !== req.body.password) {
            return res.status(401).json({ error: "Incorrect password" });
        }
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({ error: "Failure" });
    }
};
