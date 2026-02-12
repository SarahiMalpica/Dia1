const express = require('express');
const connectDB = require('./db');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
app.use(express.json());

app.post('/api/users', async (req, res) => {
    const user = await User.create(req.body);
    res.status(201).json(user);
});

app.get('/api/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
