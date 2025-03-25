<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";
import { useAuthStore } from "~/store/auth.store";

const { user, logout } = useAuthStore();
const router = useRouter();
const items = ref<DropdownMenuItem[][]>([
  [
    {
      label: user.value?.email || "",
      slot: "account",
      disabled: true,
    },
  ],
  [
    {
      label: "Configurações",
      icon: "i-heroicons-cog-8-tooth",
    },
  ],
  [
    {
      label: "Documentation",
      icon: "i-heroicons-book-open",
    },
    {
      label: "Changelog",
      icon: "i-heroicons-megaphone",
    },
    {
      label: "Status",
      icon: "i-heroicons-signal",
    },
  ],
  [
    {
      label: "Sair",
      icon: "i-heroicons-arrow-left-on-rectangle",
      onSelect: async () => {
        await logout();
        router.push("/login");
      },
    },
  ],
]);
</script>

<template>
  <UDropdownMenu
    :items="items"
    :popper="{ placement: 'bottom-start' }"
    class=""
  >
    <section>
      <UTooltip :text="`Olá, ${user?.name} :)`">
        <UAvatar :src="user?.picture" class="cursor-pointer" />
      </UTooltip>
    </section>

    <template #account="{ item }">
      <div class="text-left text-xs">
        <p>Entrou como</p>
        <p class="truncate font-medium text-gray-900 dark:text-white">
          {{ item.label }}
        </p>
      </div>
    </template>

    <template #item="{ item }">
      <div @click="" class="w-full flex items-center justify-between">
        <span class="truncate">{{ item.label }}</span>
        <UIcon
          :name="item.icon as string"
          class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
        />
      </div>
    </template>
  </UDropdownMenu>
</template>
