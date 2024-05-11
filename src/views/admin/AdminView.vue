<script setup>
import usePropiedades from "@/composables/usePropiedades";
import { formatearPrecio } from "@/helpers";

const { propiedadesCollection, deletePropiedad } = usePropiedades();
</script>

<template>
  <h2 class="text-center text-h3 my-5 font-weight-bold">Admin Panel</h2>

  <v-btn color="blue" :to="{ name: 'nueva-propiedad' }">
    Nueva Propiedad
  </v-btn>

  <v-card class="mx-auto mt-10" flat>
    <v-list>
      <v-list-item
        v-for="propiedad in propiedadesCollection"
        :key="propiedad.id"
        class="mb-3"
      >
        <template v-slot:prepend>
          <v-list-item-media :start="true">
            <img width="180" :src="propiedad.imagen" />
          </v-list-item-media>
        </template>
        <v-list-item-title>{{ propiedad.titulo }}</v-list-item-title>
        <v-list-item-subtitle>{{ formatearPrecio(propiedad.precio) }}</v-list-item-subtitle>
        <template v-slot:append>
          <v-btn
            color="blue"
            :to="{ name: 'editar-propiedad', params: { id: propiedad.id } }"
            class="mr-5"
          >
            Editar
          </v-btn>
          <v-btn color="red" @click="deletePropiedad(propiedad.id, propiedad.imagen)">
            Eliminar
          </v-btn>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>
