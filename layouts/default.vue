<script setup lang="ts">
import { useAuthStore } from "~/store/auth.store";
const router = useRouter();
</script>

<template>
  <section class="flex">
    <aside class="w-[260px] min-h-svh backdrop-filter backdrop-blur-sm">
      <section class="flex items-center justify-center py-2">
        <UButton
          @onClick="() => router.push('/')"
          variant="ghost"
          class="dark:text-white dark:hover:bg-transparent"
        >
          <LogoMusicaSh size="sm" />
        </UButton>
      </section>
      <section class="mt-5">
        <SidebarMenu />
      </section>
    </aside>

    <section class="px-6 w-full">
      <header class="py-4 w-full">
        <nav class="flex justify-end w-full">
          <ClientOnly>
            <NavbarUserDropdown />
            <template #fallback>
              <div class="">
                <div
                  class="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-(--ui-primary) rounded-full"
                  role="status"
                  aria-label="loading"
                >
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            </template>
          </ClientOnly>
        </nav>
      </header>

      <main>
        <slot />
      </main>
    </section>
  </section>
</template>

<style scoped></style>
