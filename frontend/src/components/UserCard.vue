<template>
    <v-card class="mx-2 my-2" elevation="3">
      <v-card-title class="d-flex align-center">
        <v-avatar size="40" class="mr-3">
          <v-icon v-if="!user.user_profile_picture">mdi-account</v-icon>
          <v-img
            v-else
            :src="user.user_profile_picture"
          />
        </v-avatar>
  
        <div>
          <div class="text-subtitle-1 font-weight-medium">
            {{ user.user_name }}
          </div>
          <div class="text-caption text-grey">
            {{ user.user_email }}
          </div>
        </div>
      </v-card-title>
  
      <v-card-text>
        <v-row dense>
          <v-col cols="12">
            📞 {{ user.user_phone }}
          </v-col>
          <v-col cols="12">
            📍 {{ user.user_address }}
          </v-col>
          <v-col cols="6">
            Role: <strong>{{ user.user_role }}</strong>
          </v-col>
          <v-col cols="6">
            Status:
            <v-chip
              :color="user.is_active ? 'green' : 'red'"
              size="small"
              text-color="white"
            >
              {{ user.is_active ? 'Active' : 'Inactive' }}
            </v-chip>
          </v-col>
        </v-row>
      </v-card-text>
  
      <v-divider />
  
      <v-card-actions>
        <v-chip
          :color="user.is_verified ? 'blue' : 'grey'"
          size="small"
          text-color="white"
        >
          {{ user.is_verified ? 'Verified' : 'Not Verified' }}
        </v-chip>
      </v-card-actions>
    </v-card>
  </template>
  
  <script>
  export default {
    name: 'UserCard',
    props: {
      user: {
        type: Object,
        required: true,
      },
    },
  };
  </script>
  