import 'react-native-gesture-handler';
import * as Permissions from "expo-permissions";
// import MapView from "react-native-maps";
import { registerRootComponent } from 'expo';
import React, {useEffect, useState} from "react";
import { SafeAreaView } from 'react-navigation';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import Places from "./components/places";
import Settings from "./components/settings";
import SettingsImage from "./assets/settings.png";
import NavigationService from "./NavigationService";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

//const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
var varLatitude = null;
var varLongitude = null;
//const { navigate } = navigation;

export default function App(props){

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     latitude: null,
  //     longitude: null,
  //   };
  // }
  
  // async componentDidMount() {
  //   const { status } = await Permissions.getAsync(Permissions.LOCATION);

  //   if (status != "granted") {
  //     const response = await Permissions.askAsync(Permissions.LOCATION);
  //   }
  //   navigator.geolocation.getCurrentPosition(
  //     ({ coords: { latitude, longitude } }) =>
  //       this.setState({ latitude, longitude }, () =>
  //         console.log("State: ", this.state)
  //       ),
  //     (error) => console.log("Error: ", error)
  //   );
  // }
  // printLog = () => {
  //   console.log(this.state.places);
  // };

  //render() {
  //  const { latitude, longitude } = this.state;

  //const navigation = props.navigation
  return (
    <NavigationContainer>
      
      {/* <SafeAreaView style={styles.container} > */}
        
        {/* <ScrollView style={styles.cardContainer}> */}
          
        <Tab.Navigator initialRouteName="Places"
        barStyle={{ backgroundColor: '#022227' }}>
          <Tab.Screen
            name="Places"
            component={Places}
            options={{
            tabBarLabel: 'Detours',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="palette-swatch" color={color} size={26} /*style={{height:40, width: 40}}*/ />
              ),
            }}
            // initialParams={{latitude: latitudeLocation}, {longitude: latitudeLocation}}
            // children={() => (
            //   <Places />
            // )}
          />
          <Tab.Screen 
            name="Settings" 
            component={Settings}
            options={{
              tabBarLabel: 'Settings',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="settings" color={color} size={26} />
              ),
            }}
          />
        </Tab.Navigator>
        
          
        {/* </ScrollView> */}
        {/* <View style={styles.footerContainer}>
          <TouchableOpacity style={styles.footerButton} onPress={() => NavigationService.navigate("Settings")}>
            <Image source={require('./assets/settings.png')} style={styles.footerIcon} />
            <Text style={styles.footerButtonText}>Settings</Text>

          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton} onPress={() => NavigationService.navigate("Places")}>

            <Image source={require('./assets/cards.png')} style={styles.footerIcon} />
            <Text style={styles.footerButtonText}>Locations</Text>

          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton}>

            <Image source={require('./assets/favorite.png')} style={styles.footerIcon} />
            <Text style={styles.footerButtonText}>Favorites</Text>
  
          </TouchableOpacity>
        </View> */}
      {/* </SafeAreaView> */}
      
    </NavigationContainer>
  );
}
//}

const styles = StyleSheet.create({
  container: {
    display: "flex",
     flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    backgroundColor: "#03353D"
  },
  cardContainer:{
    display: "flex",
    flex: 1,
    paddingTop: 15,
  },
  footerContainer: {
    // position: 'absolute',
    // left: 0,
    // right: 0,
    // bottom: 0,
    display: "flex",
    flexDirection: "row",
   // flex: 1,
    justifyContent: "space-around",
    //height: 20,
    paddingTop: 15,
    paddingBottom: 30,
    backgroundColor: "#022227",
  },
  footerButton: {
    display: "flex",
    alignItems: "center",
  },
  footerButtonText: {
    color: "white",
  },
  footerIcon: {
    height: 48,
    width: 48,
  },
});
