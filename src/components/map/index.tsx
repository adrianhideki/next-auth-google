import React, { Component, useEffect, useState } from "react";
import { GoogleMap, Marker, LoadScriptNext } from "@react-google-maps/api";
import { GetStaticProps } from "next";
import axios from "axios";
import {
  getDistanceInMeters,
  getRandomNearLocation,
  getRandomStartPoint,
  getRandomStreetView,
} from "../../services/map";
import { useGameContext } from "../../context/gameContext";

const mapContainerStyle = {
  height: "400px",
  width: "800px",
};

const initialPosition = getRandomStartPoint();

const MAX_DISTANCE_GOAL = 100;
const MAX_DISTANCE_START = 800;

type MapProps = {
  googleMapsApiKey: string;
};

type Position = {
  lat: number;
  lng: number;
};

export default function Map({ googleMapsApiKey }: MapProps) {
  const {
    setupGame,
    sendGuessPoint,
    startPoint,
    goalPoint,
    distance,
    guessPoint,
  } = useGameContext();

  const handleMapClick = (e: any) => {
    const { latLng } = e;

    const destination = {
      lat: latLng.lat() as number,
      lng: latLng.lng() as number,
    };

    sendGuessPoint(destination);
  };

  const handleMapLoad = (maker: google.maps.Marker) => {
    setupGame();
  };

  return (
    <>
      <strong>{distance}</strong>
      <LoadScriptNext googleMapsApiKey={googleMapsApiKey}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={startPoint}
          zoom={15}
          onClick={handleMapClick}
          clickableIcons={false}
          options={{
            clickableIcons: false,
            disableDefaultUI: true,
          }}
        >
          <Marker position={goalPoint} onLoad={handleMapLoad} />
          <Marker position={guessPoint} />
        </GoogleMap>
      </LoadScriptNext>
    </>
  );
}
