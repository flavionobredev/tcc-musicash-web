<script setup lang="ts">
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
const events = [
  {
    _id: "67e1eeec4055e22a0b88257a",
    title: "Missa de Inauguração do Shalom Maracanau",
    description: "asdsdasdaasd",
    start_date: "2025-03-25T23:41:52.137Z",
    end_date: null,
    type: "missa",
    owner: "67e1edb9c4838347081d7128",
    moments: ["67e1eeec4055e22a0b882579"],
    created_at: "2025-03-24T23:46:52.701Z",
    updated_at: "2025-03-24T23:46:52.701Z",
    __v: 0,
  },
  {
    _id: "67e1ef6692dd44f62d2de03a",
    title: "Grupo Aberto",
    description: "sasdasdasaddsadasdasd",
    start_date: "2025-03-27T22:00:00Z",
    end_date: null,
    type: "seminario-de-vida",
    owner: "67e1edb9c4838347081d7128",
    moments: ["67e1ef6692dd44f62d2de039"],
    created_at: "2025-03-24T23:48:55.076Z",
    updated_at: "2025-03-24T23:48:55.076Z",
    __v: 0,
  },
  {
    _id: "67e1ef6692dd44f62d2de03a",
    title: "Retiro dos Postulantes",
    description: "sasdasdasaddsadasdasd",
    start_date: "2025-03-29T18:00:00Z",
    end_date: null,
    type: "seminario-de-vida",
    owner: "67e1edb9c4838347081d7128",
    moments: ["67e1ef6692dd44f62d2de039"],
    created_at: "2025-03-24T23:48:55.076Z",
    updated_at: "2025-03-24T23:48:55.076Z",
    __v: 0,
  },
  {
    _id: "67e1f03f94c6eb8523f2e0ac",
    title: "moreone!",
    description: "sdasdsdsad",
    start_date: "2025-03-24T23:48:55.146Z",
    end_date: null,
    type: "encontros-gerais",
    owner: "67e1edb9c4838347081d7128",
    moments: ["67e1f03f94c6eb8523f2e0ab"],
    created_at: "2025-03-24T23:52:31.417Z",
    updated_at: "2025-03-24T23:52:31.417Z",
    __v: 0,
  },
  {
    _id: "67e1f03f94c6eb8523f2e0ac",
    title: "moreone!",
    description: "sdasdsdsad",
    start_date: "2025-03-24T23:48:55.146Z",
    end_date: null,
    type: "encontros-gerais",
    owner: "67e1edb9c4838347081d7128",
    moments: ["67e1f03f94c6eb8523f2e0ab"],
    created_at: "2025-03-24T23:52:31.417Z",
    updated_at: "2025-03-24T23:52:31.417Z",
    __v: 0,
  },
];

const upcomingEvents = events.filter((event) => {
  const startDate = new Date(event.start_date);
  const today = new Date();
  return startDate > today;
});

const pastEvents = events.filter((event) => {
  const startDate = new Date(event.start_date);
  const today = new Date();
  return startDate < today;
});
</script>

<template>
  <UCard class="w-full">
    <h2 class="text-xl font-bold">Próximos Eventos</h2>
    <ul class="flex flex-col gap-4 mt-4">
      <li
        v-for="event in upcomingEvents"
        :key="event._id"
        class="flex flex-col gap-2"
      >
        <div class="flex gap-4 bg-(--ui-primary)/5 p-4 rounded-lg relative">
          <div class="text-center">
            <p class="text-3xl font-bold text-(--ui-primary)">
              {{ format(new Date(event.start_date), "dd", { locale: ptBR }) }}
            </p>
            <p class="text-(--ui-primary)">
              {{ format(new Date(event.start_date), "MMM", { locale: ptBR }) }}
            </p>
          </div>
          <div class="pr-7">
            <h3 class="">{{ event.title }}</h3>
            <p class="text-sm text-gray-500">
              {{
                format(new Date(event.start_date), "dd/LL/yyyy HH:mm", {
                  locale: ptBR,
                })
              }}
            </p>
          </div>
          <UButton
            icon="mdi:dots-horizontal"
            variant="ghost"
            color="neutral"
            class="absolute right-3 top-4"
            @click="() => console.log('open menu')"
          ></UButton>
        </div>
      </li>
    </ul>

    <h2 class="font-bold mt-10">Eventos Passados</h2>
    <ul class="flex flex-col gap-4 mt-4">
      <li
        v-for="event in pastEvents"
        :key="event._id"
        class="flex flex-col p-2 border-b border-gray-700"
      >
        <div class="flex gap-4 rounded-lg relative">
          <div class="text-center">
            <p class="font-bold">
              {{ format(new Date(event.start_date), "dd", { locale: ptBR }) }}
            </p>
            <p class="">
              {{ format(new Date(event.start_date), "MMM", { locale: ptBR }) }}
            </p>
          </div>
          <div class="pr-7">
            <h3 class="">{{ event.title }}</h3>
            <p class="text-sm text-gray-500">
              {{
                format(new Date(event.start_date), "dd/LL/yyyy HH:mm", {
                  locale: ptBR,
                })
              }}
            </p>
          </div>
          <UButton
            icon="mdi:dots-horizontal"
            variant="ghost"
            color="neutral"
            class="absolute right-3 top-1"
            @click="() => console.log('open menu')"
          ></UButton>
        </div>
      </li>
    </ul>
  </UCard>
</template>
