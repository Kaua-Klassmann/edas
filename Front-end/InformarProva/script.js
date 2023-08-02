// Verificar erros
import { alertarErro, get, colocarNoSelect, mensagemBotao, http, mensagemErro } from "../exports.js";

const usuarioID = Cookies.get("usuarioID", { path: "/" });
const usuarioCurso = Cookies.get("usuarioCurso", { path: "/" });
const usuarioAno = Cookies.get("usuarioAno", { path: "/" });

if (usuarioID == undefined) {
    mensagemBotao("Efetue login para acessar essa página", "OK", "../Login/")
} else {
    const turmas = await get("turmas", true, true);
    const disciplinas = await get("disciplinas");

    const form = document.querySelector("form");
    const selectTurma = document.querySelector("#turma");
    const selectDisciplina = document.querySelector("#disciplina");
    const inputDia = document.querySelector("#dia");
    const inputHorario = document.querySelector("#horario");
    const divError = document.querySelector("#error");

    colocarNoSelect(turmas, selectTurma);

    // COLOCAR DISCIPLINAS

    function colocarDisciplinas() {
        const disciplinasPossiveis = disciplinas.filter(
            disciplina => disciplina.curso == usuarioCurso && disciplina.ano == usuarioAno
        );

        colocarNoSelect(disciplinasPossiveis, selectDisciplina);
    };

    colocarDisciplinas();

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
            const curso = parseInt(usuarioCurso);
            const ano = parseInt(usuarioAno);
            const turma = parseInt(selectTurma.value);
            const disciplina = parseInt(selectDisciplina.value);
            const dia = inputDia.value;
            const horario = inputHorario.value;
            const usuario = parseInt(usuarioID)

            const prova = {
                curso,
                ano,
                turma,
                disciplina,
                dia,
                horario,
                usuario
            }

            async function cadastrarProva() {
                try {
                    await axios.post(`${http}/prova`, prova);
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
        Cookies.remove("usuarioID", { path: "/" });
        Cookies.remove("usuarioCurso", { path: "/" });
        Cookies.remove("usuarioAno", { path: "/" });
    });
};