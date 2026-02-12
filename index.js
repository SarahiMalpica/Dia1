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
