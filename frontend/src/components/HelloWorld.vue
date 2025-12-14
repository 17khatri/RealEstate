<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer v-if="isLoggedIn" v-model="drawer" :rail="rail" permanent @click="rail = false">
        <v-list>
          <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg" :title=user.user_name
            :subtitle="user.user_email">
            <template v-slot:append>
              <v-btn icon="mdi-chevron-left" variant="text" @click.stop="rail = !rail"></v-btn>
            </template>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-home-city" title="Home" value="home"></v-list-item>
          <v-list-item prepend-icon="mdi-account" title="My Account" value="account"></v-list-item>
          <v-list-item prepend-icon="mdi-account-group-outline" title="Users" @click="goToUsers" value="users"></v-list-item>
          <v-spacer></v-spacer>
          <v-list-item prepend-icon="mdi-logout" title="Log Out" value="logout" @click="handleLogout"></v-list-item>
        </v-list>
      </v-navigation-drawer>
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { loginUser, getProfile } from '../api/user'

const dialog = ref(false)
const user_email = ref('')
const user_password = ref('')
const message = ref('')
const loading = ref(false)
const drawer = ref(true)
const rail = ref(true)
const isLoggedIn = ref(false)
const user = ref(null)

const router = useRouter()

const handleLogin = async () => {
  loading.value = true
  message.value = ''

  try {
    const payload = {
      user_email: user_email.value,
      user_password: user_password.value,
    }

    const response = await loginUser(payload)

    localStorage.setItem('token', response.data.data.token)

    const profileResponse = await getProfile()
    user.value = profileResponse.data.data
    isLoggedIn.value = true

    user_email.value = ''
    user_password.value = ''
    message.value = ''

    dialog.value = false
  } catch (err) {
    message.value =
      err?.response?.data?.message || 'Invalid email or password'
  } finally {
    loading.value = false
  }
}

const handleLogout = () => {
  localStorage.removeItem('token')
  isLoggedIn.value = false
  user.value = null
}

const onDialogChange = (value) => {
  if (!value) {
    user_email.value = ''
    user_password.value = ''
    message.value = ''
  }
}

const goToUsers = () =>{
  router.push('/Users')
}

onMounted(async () => {
  const token = localStorage.getItem('token')
  isLoggedIn.value = !!token

  if (token) {
    try {
      const profileResponse = await getProfile()
      user.value = profileResponse.data.data
    } catch (err) {
      console.error('Failed to load profile', err)
    }
  }
})
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