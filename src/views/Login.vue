<script setup>
import { ref, defineEmits } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const emit = defineEmits(['receberToken'])

const user = ref({
  email: '',
  senha: ''
})

const erros = ref([])
const mostrarLoading = ref(false)

function login() {
  erros.value = []

  if (!user.value.email || user.value.email.split('@')[1] != 'aluno.feliz.ifrs.edu.br') {
    erros.value.push('Email inválido!')
    return
  }

  if (!user.value.senha || user.value.senha.length < 6) {
    erros.value.push('Senha inválida!')
    return
  }

  async function postSession() {
    mostrarLoading.value = true
    const { email, senha } = user.value

    await axios
      .post('session', {
        email,
        senha
      })
      .then((response) => {
        emit('receberToken', response.data.token)
        router.push('/VizualizarProvas')
      })
      .catch((error) => {
        if (error.response.status == '402') {
          erros.value.push('Senha incorreta!')
        } else if (error.response.status == '401') {
          erros.value.push('Conta não ativada!')
        } else {
          erros.value.push('Algo está errado!')
        }
      })

    mostrarLoading.value = false
  }

  postSession()
}
</script>

<template>
  <main class="d-grid">
    <div class="box p-3 rounded-3">
      <h1 class="text-center">Login</h1>
      <div @keydown.enter="login">
        <div class="my-3 mx-2">
          <label class="form-label px-2" for="email">Email</label>
          <input class="form-control rounded-4" type="email" id="email" v-model="user.email" />
        </div>
        <div class="my-3 mx-2">
          <label class="form-label px-2" for="senha">Senha</label>
          <input class="form-control rounded-4" type="password" id="senha" v-model="user.senha" />
        </div>
        <div class="div-botao d-flex p-3">
          <button class="botao btn text-bg-dark rounded-4" @click="login">Entrar</button>
        </div>
        <RouterLink to="/CriarConta" class="link float-end">Criar conta</RouterLink>
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
    width: 30vw;
  }
}
</style>
