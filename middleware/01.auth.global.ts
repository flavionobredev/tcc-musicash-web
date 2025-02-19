import { useAuthStore } from "~/store/auth.store";

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.server) return;
  const publicRoutes = ["/login"];
  const { isAuthenticated, waitForAuth } = useAuthStore();
  await waitForAuth();

  if (isAuthenticated.value && to.path === "/login") {
    return navigateTo("/");
  }

  if (publicRoutes.includes(to.path)) {
    return;
  }

  if (!isAuthenticated.value) {
    return navigateTo("/login");
  }
});
