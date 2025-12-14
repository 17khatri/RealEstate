<template>
    <v-container>
      <v-row class="mb-4">
        <v-col>
          <h2 class="text-h5 font-weight-bold">Users</h2>
        </v-col>
      </v-row>
  
      <v-row>
        <v-col
          v-for="user in users"
          :key="user.user_id"
          cols="12"
          sm="6"
          md="4"
        >
          <UserCard :user="user" />
        </v-col>
      </v-row>
  
      <v-alert
        v-if="message"
        type="error"
        class="mt-4"
      >
        {{ message }}
      </v-alert>
    </v-container>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { getUsers } from '@/api/admin';
  import UserCard from '../components/UserCard.vue';
  
  export default {
    name: 'UsersPage',
    components: { UserCard },
  
    setup() {
      const users = ref([]);
      const message = ref('');
  
      const fetchUsers = async () => {
        try {
          const res = await getUsers();
          users.value = res.data.data;
        } catch (err) {
          message.value =
            err.response?.data?.message || 'Failed to fetch users';
        }
      };
  
      onMounted(() => {
        fetchUsers();
      });
  
      return { users, message };
    },
  };
  </script>
  