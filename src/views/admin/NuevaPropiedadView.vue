<script setup>
import { useForm, useField } from "vee-validate";
import { collection, addDoc } from "firebase/firestore";
import { useFirestore } from "vuefire";
import { validationSchema, imageSchema } from "@/validation/propiedadSchema";
import { useRouter } from "vue-router";
import useImage from "@/composables/useImage";
import useLocationMap from "@/composables/useLocationMap";
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";

const items = [1, 2, 3, 4, 5];

const { url, imageUrl, uploadImage } = useImage();
const { zoom, center, pin } = useLocationMap();

const router = useRouter();
const db = useFirestore();

const { handleSubmit } = useForm({
    validationSchema: {
        ...validationSchema,
        ...imageSchema,
    },
});

const titulo = useField("titulo");
const imagen = useField("imagen");
const precio = useField("precio");
const habitaciones = useField("habitaciones");
const wc = useField("wc");
const estacionamiento = useField("estacionamiento");
const descripcion = useField("descripcion");
const piscina = useField("piscina", null, {
    initialValue: false,
});

const onSubmit = handleSubmit(async (values) => {
    const { imagen, ...propiedad } = values;
    const docRef = await addDoc(collection(db, "propiedades"), {
        ...propiedad,
        imagen: url.value,
        ubicacion: center.value,
    });

    if (docRef.id) {
        router.push({ name: "admin-propiedades" });
    }
});
</script>

<template>
    <v-card max-width="800" flat class="mx-auto">
        <v-card-title class="text-h4 font-weight-bold text-center" tag="h3">
            Nueva Propiedad
        </v-card-title>
        <v-card-subtitle class="text-center text-h5">
            Crea una nueva propiedad llenando el siguiente formulario
        </v-card-subtitle>

        <v-form class="mt-10">
            <v-text-field class="mb-5" label="Nombre de la propiedad" v-model="titulo.value.value"
                :error-messages="titulo.errorMessage.value" />

            <v-file-input accept="image/jpeg" label="Imagen de la propiedad" prepend-icon="mdi-camera"
                v-model="imagen.value.value" :error-messages="imagen.errorMessage.value" @change="uploadImage" />

            <div v-if="imagen.value.value">
                <p class="font-weight-bold">Imagen Propiedad:</p>
                <v-img :src="imageUrl" class="mb-5 w-33" />
            </div>

            <v-text-field class="mb-5" label="Precio" v-model="precio.value.value"
                :error-messages="precio.errorMessage.value" />

            <v-row>
                <v-col cols="12" md="4">
                    <v-select class="mb-5" label="Habitaciones" :items="items" v-model="habitaciones.value.value"
                        :error-messages="habitaciones.errorMessage.value" />
                </v-col>
                <v-col cols="12" md="4">
                    <v-select class="mb-5" label="WC" :items="items" v-model="wc.value.value"
                        :error-messages="wc.errorMessage.value" />
                </v-col>
                <v-col cols="12" md="4">
                    <v-select class="mb-5" label="Lugares de estacionamiento" :items="items"
                        v-model="estacionamiento.value.value" :error-messages="estacionamiento.errorMessage.value" />
                </v-col>
            </v-row>

            <v-textarea label="Descripción" v-model="descripcion.value.value"
                :error-messages="descripcion.errorMessage.value" />

            <v-checkbox label="Piscina" :model-value="false" v-model="piscina.value.value"
                :error-messages="piscina.errorMessage.value" />

            <h2 class="font-weight-bold text-center mb-5">Mapa de la propiedad</h2>
            <div class="pb-10">
                <div style="height: 600px">
                    <LMap v-model:zoom="zoom" :center="center" :use-global-leaflet="false">
                        <LMarker 
                            :lat-lng="center"
                            draggable
                            @moveend="pin"
                            ></LMarker>
                        <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></LTileLayer>
                    </LMap>
                </div>
            </div>


            <v-btn color="pink-accent-3" block @click="onSubmit">
                Agregar Propieda
            </v-btn>
        </v-form>
    </v-card>
</template>
