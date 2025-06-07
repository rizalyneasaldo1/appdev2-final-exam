const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.signin = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: 'Incorrect credentials' });
    }

    const token = jwt.sign(
        { id: user._id }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1d' }
    );
    res.json({ token });
};
