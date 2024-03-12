<script setup>
import { onBeforeMount, ref, defineProps, computed } from "vue";
import axios from "axios";

const props = defineProps(["config"]);
const config = props.config;

const provas = ref([]);
const provaSelecionada = ref({
  id: 0,
  disciplina: {
    nome: "",
  },
  turma: {
    nome: "",
  },
  dia: "2024-01-01",
  horario: "07:30",
  descrição: "",
  usuario: {
    nome: "",
  },
});

const mostrarDetalhes = ref(false);
const mostrarLoading = ref(true);
const ul = ref(["list-group list-group-horizontal px-3"]);
const diasDaSemana = ref([
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
]);
const diaSemana = computed(() => {
  const datas = provaSelecionada.value.dia;
  const date = new Date(
    `${datas.slice(5, 7)} ${datas.slice(8)}, ${datas.slice(0, 5)} ${provaSelecionada.value.horario}`,
  );
  return diasDaSemana.value[date.getDay()];
});

onBeforeMount(() => {
  getHttp();
});

async function getHttp() {
  provas.value = await axios
    .get("provasUsuario", config)
    .then((response) => response.data)
    .catch((error) => error);

  ordenarProvas();
  mostrarLoading.value = false;
}

function ordenarProvas() {
  provas.value.sort((a, b) => {
    if (a.dia > b.dia) {
      return 1;
    } else if (a.dia < b.dia) {
      return -1;
    } else if (a.horario > b.horario) {
      return 1;
    } else if (a.horario < b.horario) {
      return -1;
    }

    return 0;
  });
}

async function excluirProva() {
  for (let i = 0; i < provas.value.length; i++) {
    if (provas.value[i].id == provaSelecionada.value.id) {
      provas.value.splice(i, 1);
      break;
    }
  }

  await axios.delete(`prova?id=${provaSelecionada.value.id}`, config);
  mostrarDetalhes.value = false;
}

function abrirDetalhes(prova) {
  mostrarDetalhes.value = true;
  provaSelecionada.value = prova;
}

function fecharDetalhes() {
  mostrarDetalhes.value = false;
}
</script>

<template>
  <main>
    <div class="p-3 bg-light rounded-3">
      <h1 class="text-center py-2 mx-2">Próximas provas</h1>
      <div class="mt-4 d-grid" id="provas">
        <p v-if="provas.length == 0" class="text-center p-3">
          Nenhuma prova inserida no sistema
        </p>
        <table v-else class="table table-haver align-middle">
          <thead class="table-dark">
            <tr>
              <th>Disciplina</th>
              <th>Turma</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="prova in provas"
              :key="prova.id"
              @click="abrirDetalhes(prova)"
            >
              <td>{{ prova.disciplina.nome }}</td>
              <td>{{ prova.turma.nome }}</td>
              <td>{{ `${prova.dia.slice(8)}/${prova.dia.slice(5, 7)}` }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
  <!-- Detalhes-->
  <div
    class="detalhes bg-light rounded-1 pt-1"
    id="detalhes"
    v-show="mostrarDetalhes"
  >
    <div class="m-1">
      <ul class="row" :class="ul">
        <li class="col-md-6 list-group-item">
          <h5>Disciplina</h5>
          <p>{{ provaSelecionada.disciplina.nome }}</p>
        </li>
        <li class="col-md-6 list-group-item">
          <h5>Turma</h5>
          <p>{{ provaSelecionada.turma.nome }}</p>
        </li>
      </ul>
      <ul class="row" :class="ul">
        <li class="col-md-6 list-group-item">
          <h5>Data</h5>
          <p>
            {{
              `${provaSelecionada.dia.slice(8)}/${provaSelecionada.dia.slice(5, 7)}/${provaSelecionada.dia.slice(0, 4)}
          - ${diaSemana}`
            }}
          </p>
        </li>
        <li class="col-md-6 list-group-item">
          <h5>Horário</h5>
          <p>{{ provaSelecionada.horario.slice(0, 5) }}</p>
        </li>
      </ul>
      <div class="row" :class="ul">
        <div class="alinhar col-12 list-group-item">
          <h5>Informações adicionais</h5>
          <p>{{ provaSelecionada.descrição }}</p>
        </div>
      </div>
      <div class="row" :class="ul">
        <div class="alinhar col-12 list-group-item">
          <h5>Usuário que informou</h5>
          <p>{{ provaSelecionada.usuario.nome }}</p>
        </div>
      </div>
      <div class="p-3">
        <button
          class="btn btn-outline-danger"
          id="btnFechar"
          @click="fecharDetalhes"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-arrow-left-circle-fill"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
            />
          </svg>
          Fechar
        </button>
        <button
          class="float-end btn btn-outline-danger"
          id="btnDeletar"
          @click="excluirProva(provaSelecionada.id)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-trash-fill"
            viewBox="0 0 16 16"
          >
            <path
              d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
  <!-- Loading -->
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

main > div {
  width: 95vw;
}

#provas {
  place-items: center;
}

.detalhes {
  width: 99vw;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid black;
}

ul {
  list-style: none;
}

li {
  max-height: 10vh;
}

.alinhar {
  display: block;
}

#btnFechar {
  margin-left: 50%;
  transform: translate(-50%, 0);
}

.alinharLoading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@media (min-width: 769px) {
  main > div {
    width: auto;
  }

  .detalhes {
    min-width: 50vw;
    width: auto;
  }

  .alinhar {
    display: grid;
    place-items: center;
  }

  li {
    max-height: auto;
  }
}
</style>
