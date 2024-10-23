import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import Login from "@/views/LoginPage.vue";
import Register from "@/views/RegisterPage.vue";
import Dashboard from "@/views/DashboardPage.vue";

const routes = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (authStore.isAuthenticated) {
    if (to.path === "/login" || to.path === "/register") {
      return next("/dashboard");
    }
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next("/login");
  }
  next();
});

export default router;
