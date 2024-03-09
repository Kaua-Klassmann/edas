<script setup>
import { computed, onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const user = ref({
  nome: '',
  email: '',
  curso: 1,
  ano: 1,
  turma: 1,
  senha: '',
  confirmarSenha: ''
})
const erros = ref([])
const disableInput = ref(true)
const mostrarLoading = ref(true)

const cursos = ref()
const turmas = ref()

onBeforeMount(() => {
  getHttp()
})

async function getHttp() {
  ;[cursos.value, turmas.value] = await Promise.all([
    await axios
      .get('cursos')
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        alert('Erro')
        return error
      }),
    await axios
      .get('turmas')
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        alert('Erro')
        return error
      })
  ])

  disableInput.value = false
  mostrarLoading.value = false
}

const nums = computed(() => {
  if (user.value.curso == 1) {
    return [1]
  }

  return [1, 2, 3, 4]
})

async function criarConta() {
  erros.value = []

  if (user.value.nome.length < 3) {
    erros.value.push('Nome inválido!')
    return
  }

  if (!user.value.email || user.value.email.split('@')[1] != 'aluno.feliz.ifrs.edu.br') {
    erros.value.push('Email inválido!')
    return
  }

  if (
    !user.value.senha ||
    user.value.senha.length < 6 ||
    !user.value.confirmarSenha ||
    user.value.confirmarSenha.length < 6 ||
    user.value.confirmarSenha != user.value.senha
  ) {
    erros.value.push('Senha inválida!')
    return
  }

  async function postCreateAccont() {
    mostrarLoading.value = true
    const { nome, email, senha, ano, curso, turma } = user.value

    await axios
      .post('usuario', {
        nome,
        email,
        senha,
        ano,
        curso,
        turma
      })
      .then(() => {
        alert('Ative sua conta pelo email!')
        router.push('/Login')
      })
      .catch((error) => {
        if (error.response.status == '422') {
          erros.value.push('Email inválido!')
        } else {
          erros.value.push('O email já está cadastrado!')
        }
      })

    mostrarLoading.value = false
  }

  postCreateAccont()
}
</script>

<template>
  <main>
    <div class="box p-3 rounded-3">
      <h1 class="text-center">Criar conta</h1>
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
              <option v-for="num in nums" :key="num" :value="num">{{ num }}°Ano</option>
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
        <div class="row">
          <div class="col-md-6">
            <label class="form-label px-2" for="senha">Senha</label>
            <input
              class="form-control rounded-4"
              type="password"
              id="senha"
              v-model="user.senha"
              :disabled="disableInput"
            />
          </div>
          <div class="col-md-6">
            <label class="form-label px-2" for="confirmar_senha">Confirmar senha:</label>
            <input
              class="form-control rounded-4"
              type="password"
              id="confirmar_senha"
              v-model="user.confirmarSenha"
              :disabled="disableInput"
            />
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

.box > div {
  padding-top: 20px;
}

.form-control,
.form-select {
  background-color: #e1e1e1;
  margin-bottom: 9px;
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
    width: auto
  }
}
</style>
