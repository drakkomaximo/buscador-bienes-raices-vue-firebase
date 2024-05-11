<script setup>
import usePropiedades from '@/composables/usePropiedades';
import Propiedad from '@/components/Propiedad.vue';

const { propiedadesFiltradas, hasPiscina } = usePropiedades();
</script>

<template>
    <h1 class="text-center text-h3 font-weight-bold my-5">Nuestras Propiedades</h1>

    <v-card flat class="py-10">

        <v-card-title class="text-h5">
            Busqueda 
            <v-checkbox
                v-model="hasPiscina"
                label="Con piscina"
                class="ml-5"
            />
        </v-card-title>

        <v-row>
            <Propiedad
                v-for="propiedad in propiedadesFiltradas"
                :key="propiedad.id"
                :propiedad="propiedad"
            />
        </v-row>
    </v-card>
</template>
