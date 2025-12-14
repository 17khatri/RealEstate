<template>
    <v-container>
      <v-row>
        <v-col
          v-for="property in properties"
          :key="property.property_id"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card class="mx-2 my-2" max-width="400">
            <v-img
              :src="`http://127.0.0.1:8000${property.property_images[0]}`"
              height="200px"
            ></v-img>
  
            <v-card-title>{{ property.property_title }}</v-card-title>
  
            <v-card-subtitle class="text--secondary">
              {{ property.city }} | ₹{{ property.price.toLocaleString() }}
            </v-card-subtitle>
  
            <v-card-text>
              <div>{{ property.property_description }}</div>
              <v-row class="mt-2" dense>
                <v-col cols="6">Bedrooms: {{ property.bedrooms }}</v-col>
                <v-col cols="6">Bathrooms: {{ property.bathrooms }}</v-col>
                <v-col cols="6">Area: {{ property.area_sqft }} sqft</v-col>
                <v-col cols="6">Furnished: {{ property.furnished ? 'Yes' : 'No' }}</v-col>
              </v-row>
              <v-chip
                v-if="property.pet_friendly"
                color="green"
                text-color="white"
                small
                class="ma-1"
              >
                Pet Friendly
              </v-chip>
              <v-chip
                v-if="property.has_garden"
                color="green"
                text-color="white"
                small
                class="ma-1"
              >
                Garden
              </v-chip>
              <v-chip
                v-if="property.has_pool"
                color="blue"
                text-color="white"
                small
                class="ma-1"
              >
                Pool
              </v-chip>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <p v-if="message" class="text-center">{{ message }}</p>
    </v-container>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { getProperties } from '../api/property';
  
  export default {
    setup() {
      const properties = ref([]);
      const message = ref('');
  
      const fetchProperties = async () => {
        try {
          const response = await getProperties();
          properties.value = response.data.data;
        } catch (err) {
          message.value = err.response?.data?.message || 'Failed to fetch properties';
        }
      };
  
      onMounted(() => {
        fetchProperties();
      });
  
      return { properties, message };
    },
  };
  </script>
  