<template>
    <div>
        <h1>Register</h1>
        <form @submit.prevent="handleRegister">
            <input v-model="username" type="text" placeholder="Username" required />
            <input v-model="email" type="email" placeholder="Email" required />
            <input v-model="password" type="password" placeholder="Password" required />
            <button type="submit">Register</button>
        </form>
    </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth";

export default {
    data() {
        return {
            username: "",
            email: "",
            password: "",
        };
    },
    setup() {
        const authStore = useAuthStore();
        return { authStore };
    },
    methods: {
        async handleRegister() {
            try {
                await this.authStore.register({
                    username: this.username,
                    email: this.email,
                    password: this.password,
                });
                this.$router.push("/dashboard");
            } catch (error) {
                console.error("Registration failed:", error);
            }
        },
    },
};
</script>
