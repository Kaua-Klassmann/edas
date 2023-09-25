// Verificar erros
import { alertarErro, get, colocarNoSelect, mensagemBotao, http, mensagemErro, returnGet, config } from "../exports.js";

const token = sessionStorage.getItem("token");

if (!token) {
    mensagemBotao("Efetue login para acessar essa página", "OK", "../Login/")
} else {
    const turmas = await get("turmas", true, true);
    const disciplinas = await returnGet("disciplinasUsuario", "");
    const usuario = await returnGet("usuario", ``);

    const usuarioCurso = usuario.curso;
    const usuarioAno = usuario.ano;

    const form = document.querySelector("form");
    const selectTurma = document.querySelector("#turma");
    const selectDisciplina = document.querySelector("#disciplina");
    const inputDia = document.querySelector("#dia");
    const inputHorario = document.querySelector("#horario");
    const divError = document.querySelector("#error");

    colocarNoSelect(turmas, selectTurma);

    // COLOCAR DISCIPLINAS

    colocarNoSelect(disciplinas, selectDisciplina);

    // INSERIR PROVA

    form.addEventListener("submit", event => {
        event.preventDefault();

        let erro = false;

        divError.classList.remove("alert", "alert-danger");
        divError.innerHTML = "";

        if (!inputDia.value) {
            divError.append(alertarErro(divError, "Data inválida"));
            erro = true;
        }

        if (!inputHorario.value) {
            divError.append(alertarErro(divError, "Horário inválido"));
            erro = true;
        }

        // CADASTRAR PROVA

        if (!erro) {
            const turma = parseInt(selectTurma.value);
            const disciplina = parseInt(selectDisciplina.value);
            const dia = inputDia.value;
            const horario = inputHorario.value;

            const prova = {
                turma,
                disciplina,
                dia,
                horario
            }

            async function cadastrarProva() {
                try {
                    await axios.post(`${http}/prova`, prova, config);
                    mensagemBotao("Prova cadastrada com sucesso!", "OK", "../VisualizarProvas/");
                } catch {
                    mensagemErro("Desculpe, ocorreu algum erro durante o cadastro");
                }
            }

            cadastrarProva();
        };
    });

    // LOGOFF

    document.querySelector("#btnLogoff").addEventListener("click", () => {
        sessionStorage.removeItem("token");
    });
};