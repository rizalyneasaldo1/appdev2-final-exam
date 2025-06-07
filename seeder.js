require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const faker = require('faker');

const Event = require('./models/Event');
const User = require('./models/User');

(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    await User.deleteMany();
    await Event.deleteMany();

    const users = await Promise.all(Array.from({ length: 5 }).map(async () => {
        const hashedPassword = await bcrypt.hash('secret123', 10);
        return User.create(
            { 
                name: faker.name.findName(), 
                email: faker.internet.email().toLowerCase(), 
                password: hashedPassword 
            }
        );
    }));

    for (let i = 0; i < 10; i++) {
        const randomUser = users[Math.floor(Math.random() * users.length)];

        await Event.create({
            title: faker.lorem.words(3),
            location: faker.address.city(),
            date: faker.date.future(),
            description: faker.lorem.sentences(2),
            userId: randomUser._id
        });
    }

    console.log('Seeding complete');
    process.exit();
})();
