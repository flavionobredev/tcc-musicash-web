<script setup lang="ts">
const isOpen = ref(false);
const openModal = () => {
  isOpen.value = true;
};
</script>

<template>
  <div>
    <ClientOnly>
      <UModal v-model="isOpen"  prevent-close>
        <UCard
          :ui="{
            ring: '',
            divide: 'divide-y divide-gray-100 dark:divide-gray-800',
          }"
        >
          <template #header>
            <div class="flex items-center justify-between">
              <h3
                class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
              >
                Criar novo evento
              </h3>
              <UButton
                color="gray"
                variant="ghost"
                icon="i-heroicons-x-mark-20-solid"
                class="-my-1"
                @click="isOpen = false"
              />
            </div>
          </template>

          body!
        </UCard>
      </UModal>
    </ClientOnly>
    <slot :openModal="openModal" name="trigger"></slot>
  </div>
</template>
