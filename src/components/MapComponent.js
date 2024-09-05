import React, { useEffect, useRef } from "react";
import { useApiIsLoaded } from "@vis.gl/react-google-maps";
import PinIconPng from "../assets/map-point.png";

const MapComponent = ({ events, onMarkerClick, onMapClick }) => {
  const mapRef = useRef(null);
  const isLoaded = useApiIsLoaded();

  useEffect(() => {
    if (!isLoaded || !mapRef.current || !events?.length) return;

    const initializeMap = async () => {
      const { AdvancedMarkerElement } = await window.google.maps.importLibrary("marker");
      const bounds = new window.google.maps.LatLngBounds();
      const map = new window.google.maps.Map(mapRef.current, {
        maxZoom: 13,
        center: { lat: 32.0853, lng: 34.7818 },
        mapId: process.env.REACT_APP_GOOGLE_MAPS_MAP_ID,
        streetViewControl: false,
        zoomControl: false,
      });

      events.forEach((event) => {
        const pinIconImg = document.createElement("img");
        pinIconImg.style.width = "40px";
        pinIconImg.style.height = "40px";
        pinIconImg.src = PinIconPng;
        const position = new window.google.maps.LatLng(event.target?.lat, event.target?.long);
        bounds.extend(position);
        const pinIconImgMarkerView = new AdvancedMarkerElement({
          position,
          map,
          title: "map-pin",
          content: pinIconImg,
        });
        pinIconImgMarkerView.addListener("click", () => onMarkerClick(event));
      });

      map.addListener("click", () => {
        if (onMapClick) onMapClick();
      });

      map.fitBounds(bounds); // Initialize with fitBounds
    };

    initializeMap();
  }, [isLoaded, events, onMarkerClick, onMapClick]);

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
};

export default MapComponent;

// const MapComponent = ({ events, onMarkerClick }) => {
//   const mapRef = useRef(null);
//   const isLoaded = useApiIsLoaded();

//   useEffect(() => {
//     if (!isLoaded || !events?.length) return;

//     const initializeMap = async () => {
//       try {
//         const { AdvancedMarkerElement } = await window.google.maps.importLibrary("marker");

//         const bounds = new window.google.maps.LatLngBounds();

//         const map = new window.google.maps.Map(mapRef.current, {
//           maxZoom: 13,
//           center: { lat: 32.0853, lng: 34.7818 },
//           mapId: process.env.REACT_APP_GOOGLE_MAPS_MAP_ID,
//           streetViewControl: false,
//           zoomControl: false,
//         });

//         events.forEach((event) => {
//           const position = new window.google.maps.LatLng(event.target?.lat, event.target?.long);
//           bounds.extend(position);

//           const marker = new AdvancedMarkerElement({
//             position,
//             map,
//             title: event.title?.hebrew,
//           });
//           marker.addListener("click", () => {
//             if (onMarkerClick) {
//               onMarkerClick(event);
//             }
//           });
//         });

//         map.fitBounds(bounds);
//         // map.panToBounds(bounds, 3000);
//       } catch (error) {
//         console.error("Failed to initialize the map:", error);
//       }
//     };

//     initializeMap();
//   }, [isLoaded, events]);

//   return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
// };

// export default MapComponent;

// import React, { useEffect, useRef } from "react";
// import { useApiIsLoaded } from "@vis.gl/react-google-maps";

// const MapComponent = ({ events }) => {
//   const mapRef = useRef(null);
//   const isLoaded = useApiIsLoaded();

//   useEffect(() => {
//     if (!isLoaded) return;

//     async function initializeMap() {
//       const { AdvancedMarkerElement } = await window.google.maps.importLibrary("marker");

//       const map = new window.google.maps.Map(mapRef.current, {
//         zoom: 10,
//         center: { lat: 32.0853, lng: 34.7818 },
//         mapId: process.env.REACT_APP_GOOGLE_MAPS_MAP_ID,
//       });

//       events.forEach((event) => {
//         const position = { lat: event.target.lat, lng: event.target.long };
//         new AdvancedMarkerElement({
//           position,
//           map: map,
//           title: event.title.hebrew,
//         });
//       });
//     }

//     initializeMap();
//   }, [events, isLoaded]);

//   return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
// };

// export default MapComponent;
