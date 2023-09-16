import Disciplina from "../models/Disciplina.js";
import * as Yup from 'yup';

class DisciplinaController{

    async show(req,res) {

        const schema = Yup.object().shape({
            id: Yup.number().min(1)
        });

        if(! (await schema.isValid(req.query))) {
            return res.status(400).json({error: "Formato inválido."});
        };

        const { id } = req.query;
        const disciplina = await Disciplina.findByPk(id);

        if(!disciplina) {
            return res.status(400).json({error: "Disciplina não encontrada"});
        };

        const { nome, ano, curso } = disciplina;

        return res.json({
            id, 
            nome,
            ano,
            curso,
        });
    };

    async index(req,res) {
        const disciplinas = await Disciplina.findAll();
        return res.json(disciplinas);
    };

    async disciplinasUsuario(req,res) {
        const schema = Yup.object().shape({
            curso: Yup.number().min(1).required(),
            ano: Yup.number().min(1).required()
        });

        if(! (await schema.isValid(req.body))) {
            return res.status(400).json({error: "Formato inválido."});
        };

        const disciplinas = await Disciplina.findAll({
            where: {curso: req.body.curso,
                ano: req.body.ano}
        });

        return res.json(disciplinas);
    };
};

export default new DisciplinaController();