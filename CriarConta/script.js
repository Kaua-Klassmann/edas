// Verificar erros
import { alertarErro, mensagemBotao, get, http, colocarNoSelect } from "../exports.js";

const cursos = await get("cursos", true, true);
const turmas = await get("turmas");

const form = document.querySelector("form");
const inputNome = document.querySelector("#nome");
const inputEmail = document.querySelector("#email");
const inputSenha = document.querySelector("#senha");
const inputConfirmarSenha = document.querySelector("#confirmar_senha");
const divError = document.querySelector("#error");
const selectCurso = document.querySelector("#cursos");
const selectAno = document.querySelector("#anos");
const selectTurma = document.querySelector("#turmas");

colocarNoSelect(cursos, selectCurso);
colocarNoSelect(turmas, selectTurma);

// ANO

selectCurso.addEventListener("change", event => {
  selectAno.innerHTML = "";

  if (selectCurso.value == 1) {
    const option = document.createElement("option");
    const text = document.createTextNode("1°Ano");

    option.append(text);
    option.value = 1;
    selectAno.append(option);
  } else {
    for (let ano = 1; ano <= 4; ano++) {
      const option = document.createElement("option");
      const text = document.createTextNode(`${ano}°Ano`);

      option.append(text);
      option.value = ano;
      selectAno.append(option);
    };
  };
});

// CADASTRAR USUARIO

form.addEventListener("submit", event => {
  event.preventDefault();

  let erro = false;
  let testarEmail = true;

  divError.classList.remove("alert", "alert-danger");
  divError.innerHTML = "";

  const nome = inputNome.value;
  const email = inputEmail.value;
  const senha = inputSenha.value;

  if (!nome) {
    divError.append(alertarErro(divError, "Nome inválido"));
    erro = true;
  };

  if (!email) {
    divError.append(alertarErro(divError, "Email inválido"));
    erro = true;
    testarEmail = false;
  };

  if(testarEmail && email.split("@")[1] != "aluno.feliz.ifrs.edu.br"){
    divError.append(alertarErro(divError, "Email não corresponde a instuição"));
    erro = true;
  }

  if (!senha || senha.length < 6) {
    divError.append(alertarErro(divError, "Senha inválida"));
    erro = true;
  } else {
    if (inputConfirmarSenha.value != senha) {
      divError.append(alertarErro(divError, "Senhas diferentes"));
      erro = true;
    };
  };

  // CRIAR CADASTRO

  if (!erro) {
    const ano = parseInt(selectAno.value);
    let curso, turma;

    for (let c of cursos) {
      if (c.id == selectCurso.value) {
        curso = parseInt(c.id);
        break;
      };
    };

    for (let t of turmas) {
      if (t.id == selectTurma.value) {
        turma = parseInt(t.id);
        break;
      };
    };

    const usuario = {
      nome,
      email,
      senha,
      ano,
      curso,
      turma
    };

    async function criarUsuario() {
      try {
        await axios.post(`${http}/usuario`, usuario);
        mensagemBotao("Conta criada com sucesso!", "OK", "../Login/");
      } catch {
        divError.append(alertarErro(divError, "Email já está sendo utilizado"));
      };
    };
    
    criarUsuario();
    
  };
});