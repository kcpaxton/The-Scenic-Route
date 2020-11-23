import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Image, ImageBackground } from "react-native";
import config from "../config";
function Places(props) {
  const [places, setPlaces] = useState([]);

  fetchPlaces = () => {
    let placeType = "tourist_attraction";
    let radius = 10 * 1000; // Search withing 2 KM radius
    const api_key = config.API_KEY;
    const url =
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
      props.latitude + "," + props.longitude +
      "&radius=" + radius +
      "&type=" + placeType +
      "&key=" + api_key;
      

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
          place["placePhotos"] = googlePlace.photos;
          //if the place has a photo grab the url of the photo to display
          if(googlePlace.photos != null)
          {
            place["placePhotos"] =  
            "https://maps.googleapis.com/maps/api/place/photo?" + 
            "&photoreference=" + googlePlace.photos[0].photo_reference +
            "&key=" + api_key; googlePlace.photos;
          }
          

          listOfPlaces.push(place);
        }
        setPlaces(listOfPlaces);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <View style={styles.container}>
      {places.map((item, index) => (
        <View style={styles.itemContainer} key={index}>
          <ImageBackground style={styles.itemContainerImage} source={{uri: item.placePhotos}}></ImageBackground>
          <Text style={styles.itemContainerName}>{item.placeName}</Text>
        </View>
      ))}

      <Button title="Data" onPress={fetchPlaces} />
    </View>
  );
}

const styles = StyleSheet.create({
  
  container: {
    display: "flex",
    padding: 0,
    marginHorizontal: 20,
    flex:1,
  },
  itemContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 0,
    flex: 1,
    backgroundColor: "#306133",
    justifyContent: "flex-start",
    //marginHorizontal: 1,
    marginVertical: 3,
    borderRadius: 10,
    
  },
  itemContainerName: {
    margin: 5,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15
  },
  itemContainerImage: {
    margin: 10,
    width: 130,
    height: 130,
    alignItems: "center",
    justifyContent: "flex-start"
  }
});


export default Places;
