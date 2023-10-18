import { alertarErro, http} from "../exports.js";

const form = document.querySelector("form");
const inputEmail = document.querySelector("#email");
const inputSenha = document.querySelector("#senha");
const divError = document.querySelector("#error");

// LOGIN

form.addEventListener("submit", event => {
    event.preventDefault();

    let erro = false;
    let testarEmail = true;

    divError.classList.remove("alert", "alert-danger");
    divError.innerHTML = ""

    const email = inputEmail.value;
    const senha = inputSenha.value;

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
    };

    if(!erro){
        const session = {
            email,
            senha
        };
    
        async function postSession(){
            await axios.post(`${http}/session`, session)
            .then(response => {
                sessionStorage.setItem("token", response.data.token);
                window.location.href = "../VisualizarProvas/";
            })
            .catch((error) => {
                if(error.response.status == "401"){
                    divError.append(alertarErro(divError, "Senha incorreta!"))
                } else{
                    divError.append(alertarErro(divError, "Algo está errado!"))
                }
            });
        };

        postSession();
    }
});