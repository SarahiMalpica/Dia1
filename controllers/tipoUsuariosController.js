const TipoUsuario=require('../models/TipoUsuario');

exports.crearTipoUsuario=async(req,res)=>{
    try {
        let tipoUsuario = new TipoUsuario(req.body);
        await tipoUsuario.save();
        res.send(tipoUsuario);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.obtenerTiposUsuarios=async(req,res)=>{
    try {
        const tiposUsuarios = await TipoUsuario.find();
        res.json(tiposUsuarios);
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.actualizarTipoUsuario=async(req,res)=>{
    try {
        const tipoUsuario 
        = await TipoUsuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(tipoUsuario);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.eliminarTipoUsuario=async(req,res)=>{
    try {
        await TipoUsuario.findByIdAndDelete(req.params.id);
        res.json({ message: 'Tipo de usuario eliminado' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};