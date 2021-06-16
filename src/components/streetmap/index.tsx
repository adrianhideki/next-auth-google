import React, { Component, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  StreetViewPanorama,
} from "@react-google-maps/api";
import { GetStaticProps } from "next";

const mapContainerStyle = {
  height: "400px",
  width: "800px",
};

const center = {
  lat: 37.5247596,
  lng: -122.2583719
};

type StreetMapProps = {
  googleMapsApiKey: string;
};

export default function StreetMap({ googleMapsApiKey }: StreetMapProps) {
  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={2}
        clickableIcons={false}
        options={{
          clickableIcons: false,
          disableDefaultUI: true,
        }}
      >
        <StreetViewPanorama
          options={{
            position: center,
            enableCloseButton: false,
            linksControl: false,
            addressControl: false,
            visible: true,
            motionTracking: true,
            motionTrackingControl: true,
            disableDefaultUI: true,
          }}
        />
      </GoogleMap>
    </LoadScript>
  );
}
