import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Button, Image, ImageBackground, TouchableOpacity, CheckBox } from "react-native";
import config from "../config";


function Settings({navigation}) {
  const buttons = [
    {
      label: "Campgrounds",
      icon: require("../assets/categoryIcons/cabin.png"),
      placeType: "campground",
    },
    {
      label: "Stores",
      icon: require("../assets/categoryIcons/store.png"),
      placeType: "store",
    },
    {
      label: "Libraries",
      icon: require("../assets/categoryIcons/book.png"),
      placeType: "library",
    },
    {
      label: "Restaurants",
      icon: require("../assets/categoryIcons/restaurant.png"),
      placeType: "restaurant",
    },
    {
      label: "Tourist Attractions",
      icon: require("../assets/categoryIcons/attraction.png"),
      placeType: "tourist_attraction",
    },
    {
      label: "Museum",
      icon: require("../assets/categoryIcons/museum.png"),
      placeType: "museum",
    },
  ]
  function CategoryButtons() {
    var buttonsList = buttons.map((item, i) => {
      return(
        <TouchableOpacity key={i} style={styles.categoryButton} onPress={() => NavigationService.navigate("Settings")}>
          <Text style={styles.categoryButtonText}>{item.label}</Text>
          <Image source={item.icon} style={styles.categoryIcon} />
        </TouchableOpacity>
        // <CheckBox key={i} style={styles.categoryButton} uncheckedColor='white' checkedColor='blue' >
        //   <Text style={styles.categoryButtonText}>{item.label}</Text>
        //   <Image source={item.icon} style={styles.categoryIcon} />
        // </CheckBox>
      )
    });
    return buttonsList;
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerPadding}>
        <Text style={styles.headerText}>Destination Categories</Text>
        {/* header line */}
        <View style={styles.headerLine}/>

        <CategoryButtons></CategoryButtons>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      display: "flex",
      flex: 1,
      alignItems: "stretch",
      backgroundColor: "#03353D",
    },
    containerPadding: {
      paddingHorizontal: 50,
      paddingVertical: 30,
    },
    headerText:{
      display: "flex",
      justifyContent: "center",
      textAlign: "center",
      color: "#ffffff",
      fontSize: 20,
      margin: 10,
      fontWeight: "bold"
    },
    headerLine:{
      borderBottomColor: '#ffffff',
      borderBottomWidth:  StyleSheet.hairlineWidth,
      marginVertical: 5,
      marginBottom: 40,
    },
    categoryButton: {
      color: "#ffffff",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginVertical: 15,
    },
    categoryButtonText: {
      color: "#ffffff",
      fontSize: 20,
    },
    categoryIcon: {
      height: 50,
      width: 50,
    },
    saveButton: {
      backgroundColor: "#49BEC2",
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      marginVertical: 20,
    },
    saveButtonText: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    }

});


export default Settings;
