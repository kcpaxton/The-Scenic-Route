import { StatusBar } from "expo-status-bar";
import * as Permissions from "expo-permissions";
import MapView from "react-native-maps";
import React from "react";
import { StyleSheet, Text, View, Button, SafeAreaView } from "react-native";
import Places from "./components/places";
import BottomNav from "./components/BottomNav";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
    };
  }

  async componentDidMount() {
    const { status } = await Permissions.getAsync(Permissions.LOCATION);

    if (status != "granted") {
      const response = await Permissions.askAsync(Permissions.LOCATION);
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) =>
        this.setState({ latitude, longitude }, () =>
          console.log("State: ", this.state)
        ),
      (error) => console.log("Error: ", error)
    );
  }
  printLog = () => {
    console.log(this.state.places);
  };

  render() {
    const { latitude, longitude } = this.state;
    if (latitude) {
      return (
        <SafeAreaView style={styles.container}>
          <Places latitude={latitude} longitude={longitude}></Places>

          {/*<MapView
            showsUserLocation
            style={{ height: "50%" }}
            initialRegion={{
              latitude,
              longitude,
              // latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          ></MapView> */}

          <BottomNav></BottomNav>
        </SafeAreaView>
      );
    }
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Permission is required!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
