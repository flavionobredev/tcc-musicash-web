<script setup lang="ts">
import { useAuthStore } from "~/store/auth.store";
const { logout } = useAuthStore();
</script>

<template>
  <section class="flex">
    <aside></aside>

    <section class="px-6 w-full">
      <header class="h-[60px] backdrop-filter backdrop-blur-sm sticky">
        <div class="h-full flex justify-between items-center">
          <section>
            <p>rdcdev logo</p>
          </section>
          <section>icons</section>
          <UButton @click="logout">Logout</UButton>
        </div>
      </header>
      <main>
        <slot />
      </main>
    </section>
  </section>
</template>

<style scoped></style>
