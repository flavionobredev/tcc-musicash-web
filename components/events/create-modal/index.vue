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

const items = ref([
  { id: "missa", label: "Missa", icon: "mdi:church-outline" },
  {
    id: "seminario-de-vida",
    label: "Seminário de Vida",
    icon: "mdi:church-outline",
  },
  { id: "retiro", label: "Retiro", icon: "mdi:church-outline" },
  { id: "vigilia", label: "Vigília", icon: "mdi:church-outline" },
  { id: "noite-tematica", label: "Noite Temática", icon: "mdi:church-outline" },
  {
    id: "encontros-gerais",
    label: "Encontros Gerais",
    icon: "mdi:church-outline",
  },
]);

const Schema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  type: z.object({
    label: z.string(),
    icon: z.string(),
    id: z.string(),
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
    type: items.value[0],
    description: "",
    startDate: new Date(),
    endDate: null,
    clear: function () {
      this.title = "";
      this.type = items.value[0] as any;
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
    type: state.type.id,
  });

  toast.add({
    title: "Evento criado com sucesso",
    description: "Clique aqui para visualizar o evento",
    onClick: () => {
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
      <UModal
        title="Alterações não salvas"
        description="modal para confirmar saída com alterações feitas"
        v-model:open="isOpenModalChanged"
      >
        <template #content>
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
                  color="neutral"
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
        </template>
      </UModal>
      <UModal
        title="Criar novo evento"
        description="modal para criar novo evento"
        v-model:open="isOpen"
        prevent-close
      >
        <template #content>
          <UCard>
            <template #header>
              <div class="flex items-center justify-between">
                <h3
                  class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
                >
                  Criar novo evento
                </h3>
                <UButton
                  color="neutral"
                  variant="ghost"
                  icon="i-heroicons-x-mark-20-solid"
                  class="-my-1"
                  @click="onClose"
                />
              </div>
            </template>

            <UForm
              :state="state ?? []"
              :schema="Schema"
              @submit="onSubmit"
              @change="onChange"
              class="space-y-4"
            >
              <UFormField size="xl" label="Título" name="title" required>
                <UInput v-model="state.title" class="w-full" />
              </UFormField>
              <UFormField
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
                  class="w-full"
                />
              </UFormField>
              <UFormField size="xl" label="Tipo" name="type">
                <USelectMenu
                  v-model="state.type"
                  :items="items"
                  create-item
                  class="w-full"
                  placeholder="Selecione o tipo"
                  value-attribute="id"
                  option-attribute="name"
                  :icon="state.type?.icon"
                >
                  <template #item="{ item: type }">
                    <UIcon
                      :name="type.icon"
                      class="w-5 h-5 text-(--ui-primary)"
                    />
                    <span class="truncate">{{ type.label }}</span>
                  </template>
                  <template #create-item-label="{ item }">
                    <span class="flex-shrink-0">Adicionar: </span>
                    <span class="block truncate">{{ item }}</span>
                  </template>
                </USelectMenu>
              </UFormField>
              <USeparator label="Datas" />
              <div class="grid grid-cols-11">
                <UFormField
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
                </UFormField>
                <UIcon name="mdi:arrow-right" class="mx-auto my-10" />
                <UFormField
                  size="xl"
                  :ui="{ label: 'text-right' }"
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
                </UFormField>
              </div>
              <UFormField class="text-center">
                <UButton
                  size="lg"
                  type="submit"
                  color="primary"
                  class="w-full justify-center font-bold"
                >
                  Criar evento
                </UButton>
              </UFormField>
            </UForm>
          </UCard>
        </template>
      </UModal>
    </ClientOnly>
    <slot :openModal="openModal" name="trigger"></slot>
  </div>
</template>
