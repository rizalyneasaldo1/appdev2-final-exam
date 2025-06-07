const express = require('express');
const router = express.Router();
const { getEvents, createEvent, getMyEvents } = require('../controllers/eventController');
const auth = require('../middleware/authMiddleware');

router.get('/events', getAllEvents);
router.post('/events', auth, createEvent);
router.get('/my-events', auth, getMyEvents);

module.exports = router;
