<script setup lang="ts">
const links = [
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
  <UVerticalNavigation :links="links">
    <template #default="{ link }">
      <span class="group-hover:text-primary relative hover:no-underline">{{
        link.label
      }}</span>
    </template>
  </UVerticalNavigation>
</template>
