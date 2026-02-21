<template>
  <v-card>
    <v-layout>
      <v-main class="main-bg">
        <h1 class="header">Welcome to the Real Estate World</h1>
        <v-btn rounded="xl" to="/properties" class="custom-button" prepend-icon="mdi-open-in-new">
          See Properties
        </v-btn>

        <div class="text-center">
          <v-btn v-if="!isLoggedIn" rounded="xl" @click="dialog = true" class="custom-button"
            prepend-icon="mdi-open-in-new">
            Log In
          </v-btn>

          <v-dialog v-model="dialog" @update:model-value="onDialogChange" width="400">
            <v-card prepend-icon="mdi-login" title="Login">
              <v-card-text>
                <v-text-field v-model="user_email" label="Email" type="email" prepend-inner-icon="mdi-email"
                  variant="outlined" required />

                <v-text-field v-model="user_password" label="Password" type="password" prepend-inner-icon="mdi-lock"
                  variant="outlined" class="mt-4" required />

                <v-alert v-if="message" type="error" variant="tonal" class="mt-4">
                  {{ message }}
                </v-alert>
              </v-card-text>

              <v-card-actions>
                <v-spacer />

                <v-btn class="cancel-button" variant="text" @click="dialog = false">
                  Cancel
                </v-btn>

                <v-btn class="custom-button" :loading="loading" @click="handleLogin">
                  Log In
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

        </div>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'
import { loginUser, getProfile } from '../api/user'
import { useAuth } from '@/auth/useAuth'

const { isLoggedIn, login } = useAuth()

const dialog = ref(false)
const user_email = ref('')
const user_password = ref('')
const message = ref('')
const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  message.value = ''

  try {
    const payload = {
      user_email: user_email.value,
      user_password: user_password.value,
    }

    // 1️⃣ Authenticate user
    const res = await loginUser(payload)

    // 2️⃣ Save token & mark logged in
    login(res.data.data.token)

    dialog.value = false
  } catch (err) {
    message.value = err?.response?.data?.message || 'Invalid credentials'
  } finally {
    loading.value = false
  }
}

</script>


<style scoped>
.main-bg {
  background-image: url('/public/assets/images/background.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
}

.header {
  font-size: 30px;
  color: #ffb73e;
}

.custom-button {
  background: #ffb73e;
  color: black;
}

.cancel-button {
  background-color: black;
  color: #ffb73e;
}
</style>