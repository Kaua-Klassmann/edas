<script setup>
import { computed, onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

const user = ref({
  nome: "",
  email: "",
  curso: 1,
  ano: 1,
  turma: 1,
  senha: "",
  confirmarSenha: "",
});

const passwordType = ref("password");
const confirmPasswordType = ref("password");
const passwordReveling = ref(false);
const confirmPasswordReveling = ref(false);
const erros = ref([]);
const disableInput = ref(true);
const mostrarLoading = ref(true);

const cursos = ref();
const turmas = ref();

onBeforeMount(() => {
  getHttp();
});

async function getHttp() {
  [cursos.value, turmas.value] = await Promise.all([
    await axios
      .get("cursos")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        alert("Erro");
        return error;
      }),
    await axios
      .get("turmas")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        alert("Erro");
        return error;
      }),
  ]);

  disableInput.value = false;
  mostrarLoading.value = false;
}

const nums = computed(() => {
  if (user.value.curso == 1) {
    return [1];
  }

  return [1, 2, 3, 4];
});

function changePasswordType() {
  if (passwordType.value == "text") {
    passwordType.value = "password";
    passwordReveling.value = false;
  } else {
    passwordType.value = "text";
    passwordReveling.value = true;
  }
}

function changeConfirmPasswordType() {
  if (confirmPasswordType.value == "text") {
    confirmPasswordType.value = "password";
    confirmPasswordReveling.value = false;
  } else {
    confirmPasswordType.value = "text";
    confirmPasswordReveling.value = true;
  }
}

async function criarConta() {
  erros.value = [];

  if (user.value.nome.length < 3) {
    erros.value.push("Nome inválido!");
    return;
  }

  if (
    !user.value.email ||
    user.value.email.split("@")[1] != "aluno.feliz.ifrs.edu.br"
  ) {
    erros.value.push("Email inválido!");
    return;
  }

  if (
    !user.value.senha ||
    user.value.senha.length < 6 ||
    !user.value.confirmarSenha ||
    user.value.confirmarSenha.length < 6 ||
    user.value.confirmarSenha != user.value.senha
  ) {
    erros.value.push("Senha inválida!");
    return;
  }

  async function postCreateAccont() {
    mostrarLoading.value = true;
    const { nome, email, senha, ano, curso, turma } = user.value;

    await axios
      .post("usuario", {
        nome,
        email,
        senha,
        ano,
        curso,
        turma,
      })
      .then(() => {
        alert("Ative sua conta pelo email!");
        router.push("/Login");
      })
      .catch((error) => {
        if (error.response.status == "422") {
          erros.value.push("Email inválido!");
        } else {
          erros.value.push("O email já está cadastrado!");
        }
      });

    mostrarLoading.value = false;
  }

  postCreateAccont();
}
</script>

<template>
  <main>
    <div class="box p-3 rounded-3">
      <h1 class="text-center mb-4">Criar conta</h1>
      <div class="px-3" @keydown.enter="criarConta">
        <div class="row">
          <div class="col-md-6">
            <label class="form-label px-2" for="nome">Nome</label>
            <input
              class="form-control rounded-4"
              type="text"
              id="nome"
              v-model="user.nome"
              :disabled="disableInput"
            />
          </div>
          <div class="col-md-6">
            <label class="form-label px-2" for="email">Email</label>
            <input
              class="form-control rounded-4"
              type="email"
              id="email"
              v-model="user.email"
              :disabled="disableInput"
            />
          </div>
        </div>
        <div>
          <label class="form-label px-2" for="cursos">Curso</label>
          <select
            class="form-select rounded-4"
            id="cursos"
            v-model="user.curso"
            :disabled="disableInput"
          >
            <option v-for="curso in cursos" :key="curso.id" :value="curso.id">
              {{ curso.nome }}
            </option>
          </select>
        </div>
        <div class="row">
          <div class="col-md-6">
            <label class="form-label px-2" for="anos">Ano</label>
            <select
              class="form-select rounded-4"
              id="anos"
              v-model="user.ano"
              :disabled="disableInput"
            >
              <option v-for="num in nums" :key="num" :value="num">
                {{ num }}°Ano
              </option>
            </select>
          </div>
          <div class="col-md-6">
            <label for="turmas" class="form-label px-2">Turma</label>
            <select
              class="form-select rounded-4"
              id="turmas"
              v-model="user.turma"
              :disabled="disableInput"
            >
              <option v-for="turma in turmas" :key="turma.id" :value="turma.id">
                {{ turma.nome }}
              </option>
            </select>
          </div>
        </div>
        <div class="row mt-1">
          <div class="col-md-6">
            <label class="form-label px-2" for="senha">Senha</label>
            <input
              class="form-control rounded-4"
              :type="passwordType"
              id="senha"
              v-model="user.senha"
              :disabled="disableInput"
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
          <div class="col-md-6">
            <label class="form-label px-2" for="confirmar_senha"
              >Confirmar senha:</label
            >
            <input
              class="form-control rounded-4"
              :type="confirmPasswordType"
              id="confirmar_senha"
              v-model="user.confirmarSenha"
              :disabled="disableInput"
            />
            <div id="passwordReveling" @click="changeConfirmPasswordType">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                class="bi bi-eye"
                viewBox="0 0 16 16"
                v-if="confirmPasswordReveling"
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
        </div>
        <div class="div-botao p-3 my-2">
          <button
            class="botao btn text-bg-dark rounded-4"
            @click="criarConta"
            :disabled="disableInput"
          >
            Criar conta
          </button>
        </div>
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
  min-height: 93vh;
  display: grid;
  place-items: center;
}

.box {
  background-color: #f1f1f1;
  width: 80vw;
}

.form-control,
.form-select {
  background-color: #e1e1e1;
  margin-bottom: 9px;
}

#passwordReveling {
  position: relative;
  bottom: 2.6rem;
  right: 1rem;
  float: right;
  height: 0;
}

.div-botao {
  display: grid;
  place-items: center;
}

.botao {
  height: 40px;
  width: 90%;
}

.alinharLoading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@media (min-width: 769px) {
  .box {
    width: auto;
  }
}
</style>
