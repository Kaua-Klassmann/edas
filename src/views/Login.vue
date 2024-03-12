<script setup>
import { ref, defineEmits } from "vue";
import { RouterLink, useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const emit = defineEmits(["receberToken"]);

const user = ref({
  email: "",
  senha: "",
});

const passwordType = ref("password");
const passwordReveling = ref(false);
const erros = ref([]);
const mostrarLoading = ref(false);

function changePasswordType() {
  if (passwordType.value == "text") {
    passwordType.value = "password";
    passwordReveling.value = false;
  } else {
    passwordType.value = "text";
    passwordReveling.value = true;
  }
}

function login() {
  erros.value = [];

  if (
    !user.value.email ||
    user.value.email.split("@")[1] != "aluno.feliz.ifrs.edu.br"
  ) {
    erros.value.push("Email inválido!");
    return;
  }

  if (!user.value.senha || user.value.senha.length < 6) {
    erros.value.push("Senha inválida!");
    return;
  }

  async function postSession() {
    mostrarLoading.value = true;
    const { email, senha } = user.value;

    await axios
      .post("session", {
        email,
        senha,
      })
      .then((response) => {
        emit("receberToken", response.data.token);
        router.push("/VizualizarProvas");
      })
      .catch((error) => {
        if (error.response.status == "402") {
          erros.value.push("Senha incorreta!");
        } else if (error.response.status == "401") {
          erros.value.push("Conta não ativada!");
        } else {
          erros.value.push("Algo está errado!");
        }
      });

    mostrarLoading.value = false;
  }

  postSession();
}
</script>

<template>
  <main class="d-grid">
    <div class="box p-3 rounded-3">
      <h1 class="text-center">Login</h1>
      <div @keydown.enter="login">
        <div class="my-3 mx-2">
          <label class="form-label px-2" for="email">Email</label>
          <input
            class="form-control rounded-4"
            type="email"
            id="email"
            v-model="user.email"
          />
        </div>
        <div class="my-3 mx-2">
          <label class="form-label px-2" for="senha">Senha</label>
          <input
            class="form-control rounded-4"
            :type="passwordType"
            id="senha"
            v-model="user.senha"
          />
          <div id="passwordReveling" @click="changePasswordType">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              class="bi bi-eye"
              viewBox="0 0 16 16"
              v-if="passwordReveling"
            >
              <path
                d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"
              />
              <path
                d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              class="bi bi-eye-slash"
              viewBox="0 0 16 16"
              v-else
            >
              <path
                d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"
              />
              <path
                d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"
              />
              <path
                d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"
              />
            </svg>
          </div>
        </div>
        <div class="div-botao d-flex p-3">
          <button class="botao btn text-bg-dark rounded-4" @click="login">
            Entrar
          </button>
        </div>
        <RouterLink to="/CriarConta" class="link float-end"
          >Criar conta</RouterLink
        >
        <div
          id="error"
          class="error"
          :class="{ 'alert alert-danger': erros.length > 0 }"
          role="alert"
        >
          <div v-for="erro in erros" :key="erro">
            {{ erro }}
          </div>
        </div>
      </div>
    </div>
  </main>
  <!-- LOADING -->
  <div class="alinharLoading" v-show="mostrarLoading">
    <div class="spinner-border"></div>
  </div>
</template>

<style scoped>
main {
  height: 93vh;
  place-items: center;
}

.box {
  background-color: #f1f1f1;
  width: 80vw;
}

.form-control {
  background-color: #e1e1e1;
}

#passwordReveling {
  position: relative;
  bottom: 2rem;
  right: 1rem;
  float: right;
}

.div-botao {
  justify-content: center;
}

.botao {
  height: 40px;
  width: 90%;
}

.link {
  color: #01b4bd;
  text-decoration: none;
}

.error {
  margin-top: 30px;
}

.alinharLoading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@media (min-width: 601px) {
  .box {
    width: 50vw;
  }
}

@media (min-width: 769px) {
  .box {
    width: 40vw;
  }
}

@media (min-width: 901px) {
  .box {
    width: 25rem;
  }
}
</style>
