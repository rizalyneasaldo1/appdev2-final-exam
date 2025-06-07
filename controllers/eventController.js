const Event = require('../models/Event');
const transporter = require('../config/nodemailer');

exports.getAllEvents = async (req, res) => {
    const events = await Event.find();
    res.json(events);
};

exports.createEvent = async (req, res) => {
    const event = await Event.create({ ...req.body, userId: req.user.userId });
    const { email } = req.user; 
    await transporter(email, event);
    res.status(201).json(event);
};

exports.getMyEvents = async (req, res) => {
    const events = await Event.find({ userId: req.user.userId });
    res.json(events);
};
