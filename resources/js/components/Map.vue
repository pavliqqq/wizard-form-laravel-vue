<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

export default {
    name: 'MapComponent',
    mounted() {
        const map = L.map('map').setView([34.101558, -118.342345], 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);
        L.marker([34.101558, -118.342345]).addTo(map)
            .bindPopup('7060 Hollywood Blvd, Los Angeles, CA')
            .openPopup();
    },
};
</script>

<template>
    <div id="map" class="w-full h-[450px]"></div>
</template>

<style scoped>

</style>
