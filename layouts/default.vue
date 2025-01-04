<script setup lang="ts">
import { useAuthStore } from "~/store/auth.store";
const router = useRouter();
const { logout } = useAuthStore();
</script>

<template>
  <section class="flex">
    <aside></aside>

    <section class="px-6 w-full relative">
      <header class="h-[60px] backdrop-filter backdrop-blur-sm sticky">
        <div class="h-full w-full flex items-center">
          <section class="mx-auto">
            <UButton
              @click="() => router.push('/')"
              variant="ghost"
              class="dark:text-white dark:hover:bg-transparent"
            >
              <LogoMusicaSh size="sm" />
            </UButton>
          </section>
        </div>
      </header>

      <main>
        <slot />
      </main>
      <UButton @click="logout" class="absolute top-4 right-6">Logout</UButton>
    </section>
  </section>
</template>

<style scoped></style>
