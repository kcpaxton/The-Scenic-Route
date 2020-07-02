import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

function Places(props) {
  const [places, setPlaces] = useState([]);

  fetchPlaces = () => {
    let radius = 2 * 1000; // Search withing 2 KM radius
    const YOUR_API_KEY = "AIzaSyB07f3SPEz7mvkXydK1nu2JUSV4sxb1qgw";
    const url =
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
      props.latitude +
      "," +
      props.longitude +
      "&radius=" +
      radius +
      "&key=" +
      YOUR_API_KEY;

    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        var listOfPlaces = []; // This Array WIll contain locations received from google
        for (let googlePlace of res.results) {
          var place = {};
          var lat = googlePlace.geometry.location.lat;
          var lng = googlePlace.geometry.location.lng;
          var coordinate = {
            latitude: lat,
            longitude: lng,
          };

          place["placeTypes"] = googlePlace.types;
          place["coordinate"] = coordinate;
          place["placeId"] = googlePlace.place_id;
          place["placeName"] = googlePlace.name;

          listOfPlaces.push(place);
        }
        setPlaces(listOfPlaces);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View>
      {places.map((item, index) => (
        <View key={index}>
          <Text>{item.placeName}</Text>
        </View>
      ))}

      <Button title="Data" onPress={fetchPlaces} />
    </View>
  );
}
export default Places;
