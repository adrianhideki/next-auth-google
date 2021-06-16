import React, { Component, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { GetStaticProps } from "next";

const mapContainerStyle = {
  height: "400px",
  width: "800px",
};

const center = {
  lat: 0,
  lng: -180,
};

type MapProps = {
  googleMapsApiKey: string;
};

export default function Map({ googleMapsApiKey }: MapProps) {
  const [position, setPosition] = useState({
    lat: 37.772,
    lng: -122.214,
  });

  const handleMapClick = (e: any) => {
    const { latLng } = e;

    setPosition({
      lat: latLng.lat(),
      lng: latLng.lng(),
    });
  };

  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={2}
        onClick={handleMapClick}
        clickableIcons={false}
      >
        <Marker position={position} />
      </GoogleMap>
    </LoadScript>
  );
}
