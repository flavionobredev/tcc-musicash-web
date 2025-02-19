<script setup lang="ts"></script>

<template>
  <h2 class="text-3xl font-bold">Eventos</h2>

  <section class="flex gap-4 mt-10">
    <aside class="w-[248px]">
      <UCard>
        <EventsCreateModal>
          <template #trigger="{ openModal }">
            <UButton
              @click="openModal"
              icon="mdi:plus"
              class="w-full font-bold justify-center"
              >Novo Evento</UButton
            >
          </template>
        </EventsCreateModal>
      </UCard>
    </aside>
    <section>
      <UCard> mini calendário</UCard>
      <UCard> listagem de eventos por data</UCard>
    </section>
  </section>
</template>

<style scoped></style>
