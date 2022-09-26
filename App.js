import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, TextInput, Button } from 'react-native';

export default function App() {

  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState([]);
  const [latitude, setLatitude] = useState(0.0);
  const [longitude, setLongitude] = useState(0.0);
  const mapRef = React.createRef();
  
  useEffect( () => {
    fetchLocation();
    console.log("hola")
  }, [location]);

  const fetchLocation = () => {
    fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=NEPK9E6d2hxLI6RBqSA9LRngB9RdOACA&location=${keyword}`)  
    .then(response => response.json())
    .then(data => setLocation(data))
    .catch(error => {
      Alert.alert('Error', error);
    });
  }

  const findLocation = () => {
    var latitude = location.results[0].locations[0].latLng.lat;
    var longitude = location.results[0].locations[0].latLng.lng;
    setLongitude(longitude);
    setLatitude(latitude);
    mapRef.current.animateToRegion({ latitude, longitude, latitudeDelta: 0.0322, longitudeDelta: 0.0221 });
  }

  return (
    <View style={styles.container}>
      <MapView  style={styles.map}  
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221,  
          }}
        ref={mapRef}
      >
        <Marker 
          coordinate={{
            latitude: latitude, 
            longitude: longitude
          }}
          
        />
     </MapView>
     <View style={{marginBottom: 60}}>
        <TextInput
          style={styles.input} 
          onChangeText={(text) => setKeyword(text)}
          value={keyword}
        />
        <Button
          title='FIND'
          onPress={() => {
            findLocation(); 
            setKeyword('');
          }} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  input: {
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 20,
  },

});