import { StatusBar } from "expo-status-bar";
import React, {useEffect, useState} from "react";
import * as Permissions from "expo-permissions";
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Button, Image, ImageBackground } from "react-native";
import config from "../config";
function Places(props) {
  const [places, setPlaces] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const getLocationRes = async () => {
    const { status } = await Permissions.getAsync(Permissions.LOCATION);

    if (status != "granted") {
      const response = await Permissions.askAsync(Permissions.LOCATION);
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
          setLatitude(latitude);
          setLongitude(longitude);
        },
      (error) => console.log("Error: ", error)
    );
  }
  useEffect(() => {
    getLocationRes();
  });

  fetchPlaces = () => {
    let placeType = "tourist_attraction";
    let radius = 10 * 1000; // Search withing 2 KM radius
    let imageMaxWidth = 400;
    const api_key = config.API_KEY;
    const url =
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
      latitude + "," + longitude +
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
          place["placeRating"] = googlePlace.rating;
          place["placeUserRatings"] = googlePlace.user_ratings_total;
          //if the place has a photo grab the url of the photo to display
          if(googlePlace.photos != null)
          {
            place["placePhotos"] =  
            "https://maps.googleapis.com/maps/api/place/photo?" + 
            "maxwidth=400" + imageMaxWidth + "&" +
            "&photoreference=" + googlePlace.photos[0].photo_reference +
            "&key=" + api_key;
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
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.cardContainer}>
      {places.map((item, index) => (
        <View style={styles.itemContainer} key={index}>
          <ImageBackground  source={{uri: item.placePhotos}} style={styles.itemContainerImage} imageStyle={{borderRadius: 20}}>
            <View style={{backgroundColor:'rgba(0,0,0,.4)', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'flex-start', alignItems: 'flex-start', borderRadius: 20}}>
              <View style={styles.contentContainer}>
                <View>
                  <Text style={styles.itemContainerName}>{item.placeName}</Text>
                  <View style={styles.rating}>
                    <View style={styles.ratingAmount}>
                      <Image style={styles.ratingImage} source={require('../assets/star.png')}></Image>
                      <Text style={styles.ratingText}>{item.placeRating}</Text>
                    </View>
                    <Text style={styles.ratingUsers}>{item.placeUserRatings} Ratings</Text>
                  </View> 
                </View>
                
                <View style={styles.bottomContentContainer}>
                  <View style={styles.location}>
                    <Image style={styles.locationImage} source={require('../assets/location.png')}></Image>
                    <Text style={styles.locationText}>Take a detour!</Text>
                  </View>
                    <Image style={styles.infoImage} source={require('../assets/info.png')}></Image>

                </View>           
              </View>
            </View>
          </ImageBackground>
        </View>
      ))}
          

      <Button title="Data" onPress={fetchPlaces} />
          
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  
  container: {
    display: "flex",
    flex:1,
    paddingHorizontal: 20,
    backgroundColor: "#03353D"
  },
  cardContainer:{
    display: "flex",
    flex: 1,
    paddingTop: 15,
    marginHorizontal: 10,
  },
  itemContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 0,
    flex: 1,
    justifyContent: "flex-start",
    //marginHorizontal: 1,
    marginVertical: 3,
    borderRadius: 10,
    height: 200,
  },
  contentContainer:{
    padding: 15,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    height: "100%",
  },
  itemContainerName: {
    marginBottom: 5,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 25,  
    
  },  
  itemContainerImage: {
    borderRadius: 20,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  ratingText: {
    marginLeft: 3,
    marginRight: 5,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18
  },
  rating:{
    display:"flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: 140
  },
  ratingAmount:{
    marginRight: 10,
    display:"flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#49BEC2",
    borderRadius: 10,
  },
  ratingImage:{
    margin: 5,
    height: 22,
    width: 22,
  },
  ratingUsers:{
    fontSize:18,
    color: "#efeff1",
  },
  bottomContentContainer:{
    display:"flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%"
  },
  location:{
    display:"flex",
    flexDirection: "row",
    alignItems: "center",
  },
  locationImage:{
    marginRight: 0,
    height: 30,
    width: 30,
  },
  locationText: {
    marginLeft: 3,
    marginRight: 5,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20
  },
  infoImage:{
    margin: 5,
    height: 30,
    width: 30,
  }
});


export default Places;
