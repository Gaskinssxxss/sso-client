<template>
    <div>
        <h1>Login</h1>
        <form @submit.prevent="handleLogin">
            <input v-model="email" type="email" placeholder="Email" required />
            <input v-model="password" type="password" placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth";

export default {
    data() {
        return {
            email: "",
            password: "",
        };
    },
    setup() {
        const authStore = useAuthStore();
        return { authStore };
    },
    methods: {
        async handleLogin() {
            try {
                await this.authStore.login({ email: this.email, password: this.password });
                this.$router.push("/dashboard");
            } catch (error) {
                console.error("Login failed:", error);
            }
        },
    },
};
</script>
