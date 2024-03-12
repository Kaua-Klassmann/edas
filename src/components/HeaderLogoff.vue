<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <header v-once>
    <nav class="container-fluid navbar navbar-expand text-white">
      <RouterLink class="p-3 nav-link" to="/VizualizarProvas"
        >Ver provas</RouterLink
      >
      <RouterLink class="p-3 nav-link" to="/InformarProva"
        >Informar provas</RouterLink
      >
      <RouterLink class="p-3 nav-link ms-auto" to="/Login">Logoff</RouterLink>
    </nav>
  </header>
</template>

<style>
nav {
  height: 7vh;
}
</style>
