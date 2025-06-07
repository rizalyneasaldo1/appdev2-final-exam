require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const eventRoutes = require('./routes/eventRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', eventRoutes);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => app.listen(process.env.PORT || 5000, () => {
        console.log('Server is running...');
    }))
    .catch(err => console.error(err));