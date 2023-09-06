// Verificar erros
import { alertarErro, get} from "../exports.js";

const usuarios = await get("usuarios", true, false);

const form = document.querySelector("form");
const inputEmail = document.querySelector("#email");
const inputSenha = document.querySelector("#senha");
const divError = document.querySelector("#error");

// LOGIN

form.addEventListener("submit", event => {
    event.preventDefault();

    let erro = false

    divError.classList.remove("alert", "alert-danger");
    divError.innerHTML = ""

    if (!inputEmail.value) {
        divError.append(alertarErro(divError, "Email inválido"));
        erro = true;
    }

    if (!inputSenha.value || inputSenha.value.length < 6) {
        divError.append(alertarErro(divError, "Senha inválida"));
        erro = true;
    }

    if (!erro) {
        erro = true;

        for(let user of usuarios){
            if(inputEmail.value == user.email){
                erro = false;

                if(inputSenha.value == user.senha){
                    const config = {
                        headers: { Authorization: `Bearer ${token}` }
                    };
                    
                    const bodyParameters = {
                       key: "value"
                    };
                    
                    Axios.post( 
                      'http://localhost:8000/api/v1/get_token_payloads',
                      bodyParameters,
                      config
                    ).then(console.log).catch(console.log);

                    
                    const QuinzeMins = 1/24/4;

                    Cookies.set('usuarioID', user.id, { expires: QuinzeMins, path: "/"});
                    Cookies.set('usuarioCurso', user.curso, { expires: QuinzeMins, path: "/"});
                    Cookies.set('usuarioAno', user.ano, { expires: QuinzeMins, path: "/"});

                    window.location.href = "../VisualizarProvas/";
                } else{
                    divError.append(alertarErro(divError, "Senha incorreta"));
                }
                break;
            }
        }

        if(erro){
            divError.append(alertarErro(divError, "Email não encontrado no sistema"));
        }
    };
});