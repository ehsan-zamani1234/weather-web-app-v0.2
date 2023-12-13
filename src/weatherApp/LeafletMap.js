import React, { useRef, useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
const defaultCenter = [35.715298, 51.404343];
const defaultZoom = 5;
var greenIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [28, 45],
  shadowSize: [50, 64],
  iconAnchor: [12, 44],
  popupAnchor: [-3, -76],
});
const LeafletMap = ({ setCord }) => {
  const mapRef = useRef();
  const [position, setPosition] = useState(defaultCenter);
  const [listenerSetup, setListenerSetup] = useState(null);

  if (mapRef.current && !listenerSetup) {
    mapRef.current.on("click", (e) => {
      setPosition(e.latlng);
      setCord(e.latlng);
    });
    setListenerSetup(true);
  } else if (!listenerSetup) {
    setTimeout(() => {
      setListenerSetup(false);
    }, 100);
  }

  return (
    <div className="leaflet-containerCustom">
      <MapContainer ref={mapRef} center={defaultCenter} zoom={defaultZoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker icon={greenIcon} position={position}></Marker>
      </MapContainer>
    </div>
  );
};
export default LeafletMap;
