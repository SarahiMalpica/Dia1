const express = require('express');
const connectDB = require('./db');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
app.use(express.json());

const ensureSaraUser = async () => {
    await User.updateOne(
        { email: 'sara@demo.com' },
        { $setOnInsert: { name: 'SARA', email: 'sara@demo.com' } },
        { upsert: true }
    );
};

app.get('/', async (req, res) => {
    await ensureSaraUser();
    const sara = await User.findOne({ email: 'sara@demo.com' });
    res.send(`Usuario en BD: ${sara.name} (${sara.email})`);
});

app.post('/api/users', async (req, res) => {
    const user = await User.create(req.body);
    res.status(201).json(user);
});

app.get('/api/users', async (req, res) => {
    await ensureSaraUser();
    const users = await User.find();
    res.json(users);
});

if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`);
    });
}

module.exports = app;
