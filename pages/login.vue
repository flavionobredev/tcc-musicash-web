<script setup>
import { useAuthStore } from "~/store/auth.store";

definePageMeta({
  layout: "",
});
const route = useRoute();
const toast = useToast();

const { loginWithGoogle } = useAuthStore();

const onGoogleLogin = async () => {
  try {
    await loginWithGoogle();
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  if (route.query.auth_error) {
    toast.add({
      title: "Erro ao fazer login",
      description: route.query.auth_error,
      color: "amber",
      icon: "mdi:alert-circle",
    });
  }
});
</script>

<template>
  <main class="h-svh">
    <section class="h-full flex gap-4 flex-col justify-center items-center">
      <LogoMusicaSh />
      <UButton
        @click="onGoogleLogin"
        size="lg"
        label="Fazer login com Google"
        variant="outline"
        class="mt-4"
      >
        <UIcon name="mdi:google" />
        Entrar com o Google
      </UButton>
    </section>
  </main>
</template>

<style scoped></style>
