const express = require('express');
const connectDB = require('./db');
const tiposUsuarioRoutes = require('./routes/tiposUsuario');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
app.use(express.json());
app.use(express.static('public'));
app.use('/api', tiposUsuarioRoutes);

if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`);
    });
}

module.exports = app;
