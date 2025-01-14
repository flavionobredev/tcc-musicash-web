<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <h2>Página do Evento! {{ route.params.slug }}</h2>
</template>

<style scoped></style>
