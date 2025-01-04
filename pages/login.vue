<script setup>
import { useAuthStore } from "~/store/auth.store";

definePageMeta({
  layout: "",
});
const route = useRoute();
const toast = useToast();
const loading = ref(false);

const { loginWithGoogle } = useAuthStore();

const onGoogleLogin = async () => {
  loading.value = true;
  await loginWithGoogle()
    .catch((error) => {
      if (error.parsed) {
        toast.add({
          title: "Erro ao fazer login",
          description: error.message,
          color: "amber",
          icon: "mdi:alert-circle",
        });
        return;
      }

      toast.add({
        title: "Erro ao fazer login",
        description:
          "Ocorreu um erro ao fazer login, tente novamente em instantes.",
        color: "amber",
        icon: "mdi:alert-circle",
      });
    })
    .finally(() => {
      loading.value = false;
    });
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
        :loading="loading"
      >
        <UIcon name="mdi:google" />
        Entrar com o Google
      </UButton>
    </section>
  </main>
</template>

<style scoped></style>
