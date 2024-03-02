<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header v-once>
    <nav class="container-fluid navbar navbar-expand text-white">
      <RouterLink class="p-3 nav-link" to="/Login">Login</RouterLink>
      <RouterLink class="p-3 nav-link" to="/Projeto">Projeto</RouterLink>
    </nav>
  </header>
</template>

<style>
nav {
  height: 7vh;
}
</style>
