const express = require('express');
const router = express.Router();
const tipoUsuariosController = require('../controllers/tipoUsuariosController');

router.post('/tiposUsuarios', tipoUsuariosController.crearTipoUsuario);
router.get('/tiposUsuarios', tipoUsuariosController.obtenerTiposUsuarios);
router.put('/tiposUsuarios/:id', tipoUsuariosController.actualizarTipoUsuario);
router.delete('/tiposUsuarios/:id', tipoUsuariosController.eliminarTipoUsuario);

module.exports = router;