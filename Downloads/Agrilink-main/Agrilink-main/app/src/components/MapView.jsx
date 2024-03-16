import React, { useEffect, useState } from "react";
import { StyleSheet, View, Dimensions, TouchableOpacity, Text } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";



export default function MapViews() {
  const navigation=useNavigation();
  const [currentLocation, setCurrentLocation] = useState(null);
  const [markers, setMarkers] = useState([]);
  const[calArea,setCalArea]=useState(false);
  const[area,SetArea]=useState(0);


  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);
    };

    

    getLocation();
  }, []);

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;

    if (markers.length < 4) {
      setMarkers([...markers, coordinate]);
    }
    else{
        setCalArea(true);
    }

   
  };
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; 
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; 
    return distance;
}


function calculateAreaofLand(markers) {
    let coordinates = markers.map(marker => [marker.latitude, marker.longitude]);
    let n = coordinates.length;
    let area = 0;
    for (let i = 0; i < n; i++) {
        let j = (i + 1) % n;
        area += calculateDistance(coordinates[i][0], coordinates[i][1], coordinates[j][0], coordinates[j][1]);
    }
    area = Math.abs(area);
    area *= 10.7639;
    SetArea(area);
    
    
}



  return (
    
    
    <View style={styles.container}>
      {currentLocation && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          onPress={handleMapPress}
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker}
              draggable
              onDragEnd={(e) => {
                const newMarkers = [...markers];
                newMarkers[index] = e.nativeEvent.coordinate;
                setMarkers(newMarkers);
              }}
            />
          ))}
        </MapView>
      )}
      <View style={styles.buttonContainer}>
        {!calArea ? <TouchableOpacity
          style={styles.button}
          onPress={() => {
            console.log(markers);
          }}
        >
          <Text style={styles.buttonText}>Get Latitude and Longitude</Text>
        </TouchableOpacity>: !area ?<TouchableOpacity
          style={styles.button}
          onPress={() => {
            console.log(calculateAreaofLand(markers));
          }}
        >
          <Text style={styles.buttonText}>Get Area of Land</Text>
        </TouchableOpacity>:<TouchableOpacity
          style={styles.button}
          onPress={() => {navigation.navigate('LandDetail',{area:area,markers:markers} )}}
        >
          <Text>Press here to View Details</Text>
        </TouchableOpacity>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "80%",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
