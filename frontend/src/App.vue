<template>
  <v-app>
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
          <v-list-item prepend-icon="mdi-account-group-outline" title="Users" @click="goToUsers"
            value="users"></v-list-item>
          <v-spacer></v-spacer>
          <v-list-item prepend-icon="mdi-logout" title="Log Out" value="logout" @click="handleLogout"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <router-view />
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuth } from '@/auth/useAuth'
  
  const drawer = ref(true)
  const rail = ref(true)
  
  const router = useRouter()
  const { isLoggedIn, user, initAuth, logout } = useAuth()
  
  const handleLogout = () => {
    logout()
    router.push('/')
  }
  
  const goToUsers = () => {
    router.push('/Users')
  }
  
  onMounted(initAuth)
  </script>
  
