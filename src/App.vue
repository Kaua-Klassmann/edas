<script setup>
import { computed, ref, watch } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'
import HeaderLogin from './components/HeaderLogin.vue'
import HeaderLogoff from './components/HeaderLogoff.vue'

const route = useRoute()
const router = useRouter()
const nameRoutesWithoutToken = ['Login', 'CriarConta', 'Projeto']

const token = ref('')

const config = computed(() => {
  return { headers: { Authorization: `Bearer ${token.value}` } }
})

function receberToken(tokenRecebido) {
  token.value = tokenRecebido
}

watch(route, () => {
  if (nameRoutesWithoutToken.indexOf(route.name) != -1) {
    token.value = ''
  }

  if (token.value == '' && (route.name == 'VizualizarProvas' || route.name == 'InformarProva')) {
    router.push('/Login')
  }
})
</script>

<template>
  <body>
    <HeaderLogin v-if="token == ''" />
    <HeaderLogoff v-else />
    <RouterView @receberToken="receberToken" :config="config" />
  </body>
</template>

<style scoped>
body {
  background: linear-gradient(45deg, #21d4fd 0%, #b721ff 100%);
  min-height: 100vh;
}
</style>
