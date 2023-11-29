import { get, returnGet, mensagemBotao } from "../exports.js"

const token = sessionStorage.getItem("token");

if (!token) {
    mensagemBotao("Efetue login para acessar essa página", "OK", "../Login/")
} else {
    const [provas, turmas, disciplinas] =
        await Promise.all([returnGet("provasUsuario", ""),
        get("turmas"), returnGet("disciplinasUsuario", "")]);
    
    const divProvas = document.querySelector("#provas");

    function criarLinhaTabela(th, nome, atributoScope) {
        const t = document.createElement(th);
        const text = document.createTextNode(nome)
        t.append(text);
        t.scope = atributoScope;

        t.classList.add("px-3");

        return t;
    }

    // COLOCAR PROVAS

    
    if (provas[0]) {
        let temProva = false;

        let datas = [], horarios = [];

        for (let prova of provas){
            datas.push(prova.dia);
            horarios.push(prova.horario);
        }

        datas = new Set(datas.sort());
        horarios = new Set(horarios.sort());

        for (let data of datas){
            for(let horario of horarios){
                for (let prova of provas) {
                    if (prova.dia == data && prova.horario == horario) {
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
        
                        for (let disciplina of disciplinas) {
                            if (prova.disciplina == disciplina.id) {
                                tr.append(criarLinhaTabela("td", disciplina.nome, ""))
                            }
                        }
        
                        for(let turma of turmas){
                            if(turma.id == prova.turma){
                                tr.append(criarLinhaTabela("td", turma.nome, ""))
                                break;
                            }
                        }
    
                        const mes = prova.dia.slice(5, 7);
                        const dia = prova.dia.slice(8,)
        
                        tr.append(criarLinhaTabela("td", `${dia}/${mes}`, ""))
        
                        tr.id = prova.id;
                        tr.classList.add("tr")
                        tbody.append(tr);
                        table.append(tbody);
                    }
                }
            }
        }
    }/* else {
        divProvas.innerHTML = "";

        const p = document.createElement("p");
        p.classList.add("text-center");
        const text = document.createTextNode("Nenhuma prova inserida no sistema");
        p.append(text);

        divProvas.append(p);
    }*/

    // ABRIR DETALHES

    const trs = document.querySelectorAll(".tr");
    const detalhes = document.querySelector("#detalhes");
    const pTurma = document.querySelector("#pTurma");
    const pDisciplina = document.querySelector("#pDisciplina");
    const pData = document.querySelector("#pData");
    const pHorario = document.querySelector("#pHorario");
    const pUsuario = document.querySelector("#pUsuario");

    //const btnDeletar = document.querySelector("#btnDeletar");

    
    trs.forEach(tr => {
        tr.addEventListener("click", async () => {
            for (let prova of provas) {
                if (tr.id == prova.id) {
                    for (let disciplina of disciplinas) {
                        if (disciplina.id == prova.disciplina) {
                            pDisciplina.replaceChildren(document.createTextNode(disciplina.nome));
                            break;
                        }
                    }

                    for (let turma of turmas) {
                        if (turma.id == prova.turma) {
                            pTurma.replaceChildren(document.createTextNode(turma.nome));
                            break;
                        }
                    }

                    const mes = prova.dia.slice(5, 7);
                    const dia = prova.dia.slice(8,)
                    const ano = prova.dia.slice(0, 4)

                    const date = new Date(`${mes} ${dia}, ${ano} ${prova.horario}`)
                    const diasDaSemana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];

                    let diaSemana = diasDaSemana[date.getDay()];

                    pData.replaceChildren(document.createTextNode(`${dia}/${mes} - ${diaSemana}`));
                    pHorario.replaceChildren(document.createTextNode(prova.horario.slice(0, 5)));

                    async function returnUsuarioProva(id){
                        return await returnGet("usuario", `?id=${id}`)
                        .then(response => response.nome)
                        .catch(() => console.log("sla"))
                    }

                    const usuarioProva = await returnUsuarioProva(prova.usuario);

                    pUsuario.replaceChildren(document.createTextNode(usuarioProva));
                };
            };

            detalhes.style.display = "block";

            /*
            btnDeletar.addEventListener("click", () => {
                async function deletarProva(){
                    await axios.delete(`${http}/prova/${tr.id}`);
                }
    
                deletarProva();
    
                tr.remove();
                detalhes.style.display = "none";
            });
            */
        });
    });
    

    // FECHAR DETALHES

    document.querySelector("#btnFechar").addEventListener("click", () =>
        detalhes.style.display = "none"
    );

    // LOGOFF

    document.querySelector("#btnLogoff").addEventListener("click", () => {
        sessionStorage.removeItem("token");
    });
};