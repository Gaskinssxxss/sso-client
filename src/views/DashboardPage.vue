<template>
    <div>
        <h1>Dashboard</h1>
        <p v-if="authStore.user">Welcome, {{ authStore.user.username }}</p>
        <button @click="handleLogout">Logout</button>
    </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth";

export default {
    setup() {
        const authStore = useAuthStore();
        return { authStore };
    },
    methods: {
        async handleLogout() {
            await this.authStore.logout();
            this.$router.push("/login");
        },
    },
};
</script>
