<script setup lang="ts">
const items = [
  [
    {
      label: "Eventos",
      icon: "mdi:calendar-blank-multiple",
      to: "/eventos",
    },
  ],
  [
    {
      label: "Examples",
      icon: "i-heroicons-light-bulb",
    },
    {
      label: "Help",
      icon: "i-heroicons-question-mark-circle",
    },
  ],
];
</script>

<template>
  <UNavigationMenu orientation="vertical" :items="items"> </UNavigationMenu>
</template>
