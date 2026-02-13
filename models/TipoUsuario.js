const mongoose = require('mongoose');

const TipouUsuarioSchema = new mongoose.Schema({
    tipo: {
        type: String,
        required: true,
        unique: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('TipouUsuario', TipouUsuarioSchema);
