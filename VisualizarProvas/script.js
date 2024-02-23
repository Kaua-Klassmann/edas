import { returnGet, mensagemBotao, link, config } from "../exports.js"

const token = sessionStorage.getItem("token");

if (!token) {
    mensagemBotao("Efetue login para acessar essa página", "OK", "../Login/")
} else {
    let provas = await returnGet("provasUsuario", "")
    
    document.querySelector(".alinharLoading").style.display = "none";
    
    const divProvas = document.querySelector("#provas");

    // COLOCAR PROVAS
    if (provas[0]) {
        function criarLinhaTabela(th, nome, atributoScope) {
            const t = document.createElement(th);
            const text = document.createTextNode(nome)
            t.append(text);
            t.scope = atributoScope;
    
            t.classList.add("px-3");
    
            return t;
        }

        // ORDENAÇÂO DAS PROVAS POR DATA E HORÁRIO

        provas.sort((a, b) => {
            if (a.dia > b.dia) {
                return 1;
            } else if (a.dia < b.dia) {
                return -1;
            } else if (a.horario > b.horario) {
                return 1
            } else if (a.horario < b.horario) {
                return -1
            }

            return 0;
        })

        let temProva = false;

        for (let prova of provas) {
            if (!temProva) {
                divProvas.innerHTML = "";

                var table = document.createElement("table");
                table.classList.add("table", "table-hover", "align-middle");
                const thead = document.createElement("thead");
                thead.classList.add("table-dark");
                let tr = document.createElement("tr");
                thead.append(tr);
                table.append(thead);
                divProvas.append(table);

                tr.append(criarLinhaTabela("th", "Disciplina", "col"))
                tr.append(criarLinhaTabela("th", "Turma", "col"))
                tr.append(criarLinhaTabela("th", "Data", "col"))

                temProva = true;
            };

            const tbody = document.createElement("tbody");
            const tr = document.createElement("tr");

            tr.append(criarLinhaTabela("td", prova.disciplina.nome, ""))
            tr.append(criarLinhaTabela("td", prova.turma.nome, ""))

            const mes = prova.dia.slice(5, 7);
            const dia = prova.dia.slice(8,)

            tr.append(criarLinhaTabela("td", `${dia}/${mes}`, ""))

            tr.id = prova.id;
            tr.classList.add("tr")
            tbody.append(tr);
            table.append(tbody);
        }
    }

    // ABRIR DETALHES
    const trs = document.querySelectorAll(".tr");

    const detalhes = document.querySelector("#detalhes");
    const pTurma = document.querySelector("#pTurma");
    const pDisciplina = document.querySelector("#pDisciplina");
    const pData = document.querySelector("#pData");
    const pHorario = document.querySelector("#pHorario");
    const pDescrição = document.querySelector("#pDescrição");
    const pUsuario = document.querySelector("#pUsuario");

    const btnDeletar = document.querySelector("#btnDeletar");
    
    trs.forEach(tr => {
        tr.addEventListener("click", async () => {
            detalhes.style.display = "block";

            let idProva;
            for (let prova of provas) {
                if (tr.id == prova.id) {
                    idProva = prova.id;

                    pDisciplina.replaceChildren(document.createTextNode(prova.disciplina.nome));

                    pTurma.replaceChildren(document.createTextNode(prova.turma.nome));

                    const mes = prova.dia.slice(5, 7);
                    const dia = prova.dia.slice(8,)
                    const ano = prova.dia.slice(0, 4)

                    const date = new Date(`${mes} ${dia}, ${ano} ${prova.horario}`)
                    const diasDaSemana = [
                        "Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira",
                        "Quinta-feira", "Sexta-feira", "Sábado"
                    ];

                    const diaSemana = diasDaSemana[date.getDay()];

                    pData.replaceChildren(document.createTextNode(`${dia}/${mes} - ${diaSemana}`));
                    pHorario.replaceChildren(document.createTextNode(prova.horario.slice(0, 5)));

                    pDescrição.replaceChildren(document.createTextNode(prova.descrição));

                    pUsuario.replaceChildren(document.createTextNode(prova.usuario.nome));
                };
            };

            btnDeletar.addEventListener("click", () => {
                async function deletarProva(){
                    await axios.delete(`${link}/prova?id=${idProva}`, config);
                    location.reload();
                }

                deletarProva();
            });
        });
    });
    

    // FECHAR DETALHES
    document.querySelector("#btnFechar").addEventListener("click", () => {
        detalhes.style.display = "none"
    });

    // LOGOFF
    document.querySelector("#btnLogoff").addEventListener("click", () => {
        sessionStorage.removeItem("token")
    });
};