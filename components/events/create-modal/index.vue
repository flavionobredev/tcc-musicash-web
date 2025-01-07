<script setup lang="ts">
import DatePicker from "~/components/DatePicker.vue";
const isOpen = ref(false);
const openModal = () => {
  isOpen.value = true;
};

const makeState = () => ({
  title: "",
  type: [],
  description: "",
  startDate: new Date(),
  endDate: new Date(),
  clear: function () {
    this.title = "";
    this.type = [];
    this.description = "";
    this.startDate = new Date();
    this.endDate = new Date();
  },
});

const state = reactive(makeState());

const options = ref([
  { name: "Missa", icon: "mdi:church-outline" },
  { name: "Seminário de Vida", icon: "mdi:church-outline" },
  { name: "Retiro", icon: "mdi:church-outline" },
  { name: "Vigília", icon: "mdi:church-outline" },
  { name: "Noite Temática", icon: "mdi:church-outline" },
  { name: "Encontros Gerais", icon: "mdi:church-outline" },
]);

const onClose = () => {
  isOpen.value = false;
  state.clear();
};
</script>

<template>
  <div>
    <ClientOnly>
      <UModal v-model="isOpen" prevent-close>
        <UCard
          :ui="{
            ring: '',
            divide: 'divide-y divide-gray-100 dark:divide-gray-800',
          }"
        >
          {{ JSON.stringify(state) }}
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
                @click="onClose"
              />
            </div>
          </template>

          <UForm :state="state" class="space-y-4">
            <UFormGroup size="xl" label="Título" name="title" required>
              <UInput v-model="state.title" autofocus />
            </UFormGroup>
            <UFormGroup
              size="xl"
              label="Descrição"
              name="description"
              hint="Opcional"
            >
              <UTextarea
                v-model="state.description"
                :rows="3"
                autoresize
                resize
              />
            </UFormGroup>
            <UFormGroup size="xl" label="Tipo" name="type">
              <USelectMenu
                v-model="state.type"
                by="name"
                name="labels"
                :options="options"
                option-attribute="name"
                searchable-placeholder="Selecionar tipo"
                searchable
                creatable
              >
                <template #option="{ option: type }">
                  <UIcon :name="type.icon" class="w-5 h-5 text-primary-500" />
                  <span class="truncate">{{ type.name }}</span>
                </template>
              </USelectMenu>
            </UFormGroup>
            <UDivider label="Datas" />
            <div class="grid grid-cols-2 gap-4">
              <UFormGroup
                size="xl"
                label="Início"
                name="startDate"
                help="Data de início do evento"
                required
              >
                <DatePicker v-model="state.startDate" is-required />
                <template #help>
                  <p class="text-sm">Data de início do evento</p>
                </template>
              </UFormGroup>
              <UFormGroup
                size="xl"
                :ui="{ label: { base: 'text-right' } }"
                label="Fim"
                name="endDate"
              >
                <DatePicker v-model="state.endDate" is-required />
                <template #help>
                  <p class="text-sm">Data de término do evento</p>
                </template>
              </UFormGroup>
            </div>
          </UForm>
        </UCard>
      </UModal>
    </ClientOnly>
    <slot :openModal="openModal" name="trigger"></slot>
  </div>
</template>
