import Usuario from "../models/Usuario.js";
import * as Yup from 'yup';


class UsuarioController {

    async store(req,res) {

        const schema = Yup.object().shape({
            nome: Yup.string().required(),
            email: Yup.string().email().required(),
            senha: Yup.string().required().min(6),
            ano: Yup.number().required().min(1).max(4),
            curso: Yup.number().min(1).required(),
            turma: Yup.number().min(1).required(),
        });

        if(! (await schema.isValid(req.body))) {
            return res.status(400).json({error: "Formato inválido."});
        };

        const usuario = await Usuario.findOne({
            where: {email: req.body.email}
        });

        if(usuario) {
            return res.status(400).json({error: "O email já está cadastrado."});
        };

        const {id, nome, email } = await Usuario.create(req.body);
        return res.json({
            id, 
            nome, 
            email,
        });
    };

    async index(req,res) {
        const usuarios = await Usuario.findAll();
        return res.json(usuarios);
    };
};

export default new UsuarioController();