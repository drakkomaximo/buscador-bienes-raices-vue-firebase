import { ref } from "vue";

export default function useLocationMap() {
  const zoom = ref(15);
  const center = ref({ lat: 19.4326, lng: -99.1332 });

  function pin(event) {
    const market = event.target.getLatLng()
    center.value = [market.lat, market.lng]
  }

  return {
    zoom,
    center,
    pin
  };
}
