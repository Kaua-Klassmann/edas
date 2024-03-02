<script setup>
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const props = defineProps(['config'])

const router = useRouter()

const config = props.config
const prova = ref({
  disciplina: 0,
  turma: 1,
  dia: '',
  horario: '07:30',
  descrição: ''
})

const erros = ref([])
const disableInput = ref(true)
const mostrarLoading = ref(true)

const disciplinas = ref()
const turmas = ref()

onBeforeMount(() => {
  getHttp()
})

async function getHttp() {
  ;[disciplinas.value, turmas.value] = await Promise.all([
    await axios
      .get('disciplinasUsuario', config)
      .then((response) => {
        prova.value.disciplina = response.data[0].id
        return response.data
      })
      .catch((error) => error),
    await axios
      .get('turmas')
      .then((response) => response.data)
      .catch((error) => error)
  ])

  disableInput.value = false
  mostrarLoading.value = false
}

async function enviarProva() {
  erros.value = []

  if (!prova.value.dia) {
    erros.value.push('Data inválida!')
    return
  }

  if (prova.value.descrição.length < 3) {
    erros.value.push('Informações adicionais inválidas!')
    return
  }

  async function postProva() {
    mostrarLoading.value = true
    const { disciplina, turma, dia, horario, descrição } = prova.value

    await axios
      .post(
        'prova',
        {
          disciplina,
          turma,
          dia,
          horario,
          descrição
        },
        config
      )
      .then(() => {
        alert('Prova cadastrada com sucesso')
        router.push('/VizualizarProvas')
      })
      .catch((error) => {
        if (error.response.status == '400') {
          erros.value.push('Prova já cadastrada!')
        } else {
          erros.value.push('"Desculpe, ocorreu algum erro durante o cadastro"!')
        }
      })

    mostrarLoading.value = false
  }

  postProva()
}
</script>

<template>
  <main>
    <div class="box p-3 bg-light rounded-3">
      <h1 class="text-center">Registrar prova</h1>
      <div class="m-3">
        <div class="row">
          <div class="col-md-6">
            <label for="disciplina" class="form-label px-2">Disciplina</label>
            <select
              class="form-select rounded-4"
              id="disciplina"
              :disabled="disableInput"
              v-model="prova.disciplina"
            >
              <option v-for="disciplina in disciplinas" :key="disciplina.id" :value="disciplina.id">
                {{ disciplina.nome }}
              </option>
            </select>
          </div>
          <div class="col-md-6">
            <label for="turma" class="form-label px-2">Turma</label>
            <select
              id="turma"
              class="form-select rounded-4"
              :disabled="disableInput"
              v-model="prova.turma"
            >
              <option v-for="turma in turmas" :key="turma.id" :value="turma.id">
                {{ turma.nome }}
              </option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <label class="form-label px-2" for="dia">Data</label>
            <input
              class="form-control rounded-4"
              type="date"
              id="dia"
              :disabled="disableInput"
              v-model="prova.dia"
            />
          </div>
          <div class="col-md-6">
            <label class="form-label px-2" for="horario">Horário</label>
            <select
              class="form-select rounded-4"
              id="horario"
              :disabled="disableInput"
              v-model="prova.horario"
            >
              <option value="07:30">07:30</option>
              <option value="08:20">08:20</option>
              <option value="09:10">09:10</option>
              <option value="10:20">10:20</option>
              <option value="11:10">11:10</option>
              <option value="13:20">13:20</option>
              <option value="14:10">14:10</option>
              <option value="15:00">15:00</option>
              <option value="16:10">16:10</option>
              <option value="17:00">17:00</option>
            </select>
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label px-2" for="descrição">Informações adicionais</label>
          <textarea
            class="form-control"
            id="descrição"
            placeholder="Ex: Conteúdo da prova"
            :disabled="disableInput"
            v-model="prova.descrição"
          ></textarea>
        </div>
        <div class="div-botao p-3 mt-2">
          <button
            class="botao btn text-bg-dark rounded-4"
            :disabled="disableInput"
            @click="enviarProva"
          >
            Confirmar
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
  height: 93vh;
  display: grid;
  place-items: center;
}

.box {
  background-color: #f1f1f1;
}

.box > div {
  padding-top: 20px;
}

.form-control,
.form-select {
  background-color: #e1e1e1;
  margin-bottom: 9px;
}

.col-md-6 {
  margin-bottom: 5px;
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

@media (max-width: 768px) {
  .box {
    width: 80vw;
  }
}
</style>
