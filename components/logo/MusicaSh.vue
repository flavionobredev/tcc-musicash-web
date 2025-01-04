<script setup lang="ts">
import type { PropType } from "vue";

defineProps({
  size: {
    type: String as PropType<"sm" | "md" | "lg">,
    default: "lg",
  },
});

const textSize = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-5xl",
};

const borderSize = {
  sm: "border-b-[2px]",
  md: "border-b-[4px]",
  lg: "border-b-[6px]",
};
</script>

<template>
  <h1 class="select-none" :class="[textSize[size]]">
    <span>música</span>
    <span
      class="font-bold border-gray-800 dark:border-white"
      :class="[borderSize[size]]"
      >sh</span
    >
    <span class="font-bold">.</span>
  </h1>
</template>
