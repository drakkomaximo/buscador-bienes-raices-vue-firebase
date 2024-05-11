<script setup>
    import "leaflet/dist/leaflet.css";
    import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
    defineProps({
        height: {
            type: String,
            required: true,
        },
        zoom: {
            type: Number,
            required: true,
        },
        center: {
            type: Object,
            required: true,
        },
        pin: {
            type: Function,
            required: true,
        },
    });
</script>

<template>
    <div style="height: height">
        <LMap v-model:zoom="zoom" :center="center" :use-global-leaflet="false">
            <LMarker :lat-lng="center" draggable @moveend="pin"></LMarker>
            <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></LTileLayer>
        </LMap>
    </div>
</template>

<style></style>