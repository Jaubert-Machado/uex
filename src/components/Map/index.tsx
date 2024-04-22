"use client";
import React from "react";
import * as S from "./styles";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Libraries,
} from "@react-google-maps/api";

type Props = {
  center?: {
    lat: number;
    lng: number;
  };
};

const LIBRARIES: Libraries = ["maps", "places"];

const Map = ({
  center = {
    lat: -25.4437172,
    lng: -49.2789859,
  },
}: Props) => {
  const [map, setMap] = React.useState<google.maps.Map | null>(null);

  const { isLoaded } = useJsApiLoader({
    libraries: LIBRARIES,
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    language: "pt-BR",
    region: "BR",
  });

  React.useEffect(() => {
    if (center) {
      map?.setCenter(center);
    }
  }, [center, map]);

  return (
    isLoaded && (
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: "100%",
          borderRadius: 10,
        }}
        center={center}
        zoom={15}
        onLoad={(map) => setMap(map)}
        onUnmount={() => setMap(null)}
      >
        <Marker position={center} />
      </GoogleMap>
    )
  );
};

export default Map;
