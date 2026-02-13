const express = require('express');
const connectDB = require('./db');
const User = require('./models/user');

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
app.use(express.json());

app.use(express.static('public'));
//app.get('/', async (req, res) => {
   // try {
     //   await ensureCarlosUser();
    //    const carlos = await User.findOne({ email: 'carlos@demo.com' });
     //   res.send(`Usuario: ${carlos.name} (${carlos.email})`);
  //  } catch (error) {
    //    res.status(500).json({ msg: 'Error fetching user data' });
   // }
//});

app.post('/api/users', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ msg: 'Email already exists' });
        }
        return res.status(400).json({ msg: 'Invalid user data' });
    }
});

app.get('/api/users', async (req, res) => {
    try {
        await ensureCarlosUser();
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ msg: 'Error fetching users' });
    }
});

if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`);
    });
}

module.exports = app;