<script setup>
import { formatearPrecio } from '@/helpers'; 
defineProps({
  propiedad: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <v-col cols="12" md="4">
    <v-card>
      <v-img :src="propiedad.imagen" height="250px" cover></v-img>
      <v-card-title class="text-h5 font-weight-bold">{{
        propiedad.titulo
      }}</v-card-title>
      <v-card-subtitle class="text-h6"
        >Precio: {{ formatearPrecio(propiedad.precio) }}</v-card-subtitle
      >
      <v-card-text>
        <v-row>
          <v-col cols="4">
            <v-icon>mdi-bedroom</v-icon>
            <span>{{ propiedad.habitaciones }}</span>
          </v-col>
          <v-col cols="4">
            <v-icon>mdi-toilet</v-icon>
            <span>{{ propiedad.wc }}</span>
          </v-col>
          <v-col cols="4">
            <v-icon>mdi-car</v-icon>
            <span>{{ propiedad.estacionamiento }}</span>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn
          block
          variant="flat"
          color="info"
          text
          :to="{ name: 'propiedad', params: { id: propiedad?.id } }"
          >Ver Propiedad</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<style></style>
