<script setup lang="ts">
import { z } from "zod";
import DatePicker from "~/components/DatePicker.vue";
import { createDefaultEvent } from "~/shared/apis/backend/events";
const toast = useToast();
const router = useRouter();
const isChanged = ref(false);
const isOpenModalChanged = ref(false);
const isOpen = ref(false);
const openModal = () => {
  isOpen.value = true;
};

const options = ref([
  { name: "Missa", icon: "mdi:church-outline" },
  { name: "Seminário de Vida", icon: "mdi:church-outline" },
  { name: "Retiro", icon: "mdi:church-outline" },
  { name: "Vigília", icon: "mdi:church-outline" },
  { name: "Noite Temática", icon: "mdi:church-outline" },
  { name: "Encontros Gerais", icon: "mdi:church-outline" },
]);

const Schema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  type: z.object({
    name: z.string(),
    icon: z.string(),
  }),
  description: z
    .string({ message: "A descrição deve ser um texto" })
    .optional(),
  startDate: z.date({ message: "A data de início é obrigatória" }),
  endDate: z.date().optional().nullable(),
});

const makeState = () =>
  ({
    title: "",
    type: options.value[0],
    description: "",
    startDate: new Date(),
    endDate: null,
    clear: function () {
      this.title = "";
      this.type = options.value[0];
      this.description = "";
      this.startDate = new Date();
      this.endDate = null;
    },
  } as z.infer<typeof Schema> & {
    clear: () => void;
  });

const state = reactive(makeState());

const onClose = () => {
  if (!isChanged.value) return close();
  isOpenModalChanged.value = true;
};

const close = () => {
  isChanged.value = false;
  isOpenModalChanged.value = false;
  isOpen.value = false;
  state.clear();
};

const onSubmit = async () => {
  const result = await createDefaultEvent({
    title: state.title,
    description: state.description,
    startDate: state.startDate,
    endDate: state.endDate,
    type: state.type.name,
  });

  toast.add({
    title: "Evento criado com sucesso",
    description: "Clique aqui para visualizar o evento",
    click: () => {
      router.push(`/eventos/${result.id}`);
    },
  });
  close();
};

const onChange = () => {
  isChanged.value = true;
};
</script>

<template>
  <div>
    <ClientOnly>
      <UModal v-model="isOpenModalChanged">
        <UCard>
          <template #header>
            <h3>Alterações não salvas</h3>
          </template>
          <template #body>
            <p>
              Você tem alterações não salvas. Deseja descartar as alterações?
            </p>
          </template>
          <template #footer>
            <div class="flex justify-end gap-2">
              <UButton
                color="gray"
                variant="ghost"
                @click="isOpenModalChanged = false"
              >
                Cancelar
              </UButton>
              <UButton color="primary" @click="close">
                Descartar alterações
              </UButton>
            </div>
          </template>
        </UCard>
      </UModal>
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

          <UForm
            :state="state"
            :schema="Schema"
            @submit="onSubmit"
            @change="onChange"
            class="space-y-4"
            :validateOn="['submit']"
          >
            <UFormGroup size="xl" label="Título" name="title" required>
              <UInput v-model="state.title" />
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
                name="type"
                :options="options"
                option-attribute="name"
                searchable-placeholder="Selecionar tipo"
                placeholder="Selecione o tipo"
                searchable
                creatable
              >
                <template #label>
                  <UIcon
                    :name="state.type.icon"
                    class="w-5 h-5 text-primary-500"
                  />
                  <span class="truncate">{{ state.type.name }}</span>
                </template>
                <template #option="{ option: type }">
                  <UIcon :name="type.icon" class="w-5 h-5 text-primary-500" />
                  <span class="truncate">{{ type.name }}</span>
                </template>
                <template #option-create="{ option }">
                  <span class="flex-shrink-0">Adicionar: </span>
                  <span class="block truncate">{{ option.name }}</span>
                </template>
              </USelectMenu>
            </UFormGroup>
            <UDivider label="Datas" />
            <div class="grid grid-cols-11">
              <UFormGroup
                size="xl"
                label="Início"
                name="startDate"
                help="Data de início do evento"
                class="col-span-5"
                required
              >
                <DatePicker v-model="state.startDate" is-required />
                <template #help>
                  <p class="text-sm">Data de início do evento</p>
                </template>
              </UFormGroup>
              <UIcon name="mdi:arrow-right" class="mx-auto my-10" />
              <UFormGroup
                size="xl"
                :ui="{ label: { base: 'text-right' } }"
                label="Fim"
                class="col-span-5"
                name="endDate"
              >
                <UButton
                  v-if="!state.endDate"
                  icon="mdi:calendar-cursor"
                  variant="outline"
                  class="col-span-3"
                  @click="state.endDate = new Date()"
                >
                  Data de Fim
                </UButton>
                <DatePicker v-else v-model="state.endDate" is-required />
                <template #help>
                  <p class="text-sm">Data de término do evento</p>
                </template>
              </UFormGroup>
            </div>
            <UFormGroup class="text-center">
              <UButton
                size="lg"
                type="submit"
                color="primary"
                class="w-full justify-center font-bold"
              >
                Criar evento
              </UButton>
            </UFormGroup>
          </UForm>
        </UCard>
      </UModal>
    </ClientOnly>
    <slot :openModal="openModal" name="trigger"></slot>
  </div>
</template>
