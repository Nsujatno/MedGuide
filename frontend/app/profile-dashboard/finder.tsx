import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, FlatList, Linking, ActivityIndicator, Platform, StatusBar } from "react-native";
import * as Location from 'expo-location';
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';

interface Pharmacy {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  distance: number;
  googleMapsUri: string;
}

interface UserLocation {
  latitude: number;
  longitude: number;
}

const MapViewClustering = Platform.OS !== 'web' ? require('react-native-map-clustering').default : null;
const Marker = Platform.OS !== 'web' ? require('react-native-maps').Marker : null;

const mapStyle = [
  {
    "featureType": "all",
    "elementType": "geometry",
    "stylers": [{ "color": "#f5f5f5" }]
  },
  {
    "featureType": "all",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#616161" }]
  },
  {
    "featureType": "all",
    "elementType": "labels.text.stroke",
    "stylers": [{ "color": "#f5f5f5" }]
  },
  {
    "featureType": "poi",
    "elementType": "all",
    "stylers": [{ "visibility": "off" }]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [{ "color": "#e5f5e0" }, { "visibility": "on" }]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [{ "color": "#ffffff" }]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [{ "visibility": "off" }]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [{ "color": "#fafafa" }]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [{ "color": "#ffd6e0" }]
  },
  {
    "featureType": "transit",
    "elementType": "all",
    "stylers": [{ "visibility": "off" }]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{ "color": "#c9e6f5" }]
  }
];

const TEST_PHARMACIES: Pharmacy[] = [
  {
    id: "ChIJA86XXlAfTIYRXw9MF1HcN8s",
    name: "CVS Pharmacy",
    address: "605 W Campbell Rd, Richardson, TX 75080, USA",
    latitude: 32.9775774,
    longitude: -96.74112919999999,
    distance: 0.82,
    googleMapsUri: "https://maps.google.com/?q=CVS+Pharmacy+605+W+Campbell+Rd+Richardson+TX"
  },
  {
    id: "ChIJX12z1S0jTIYRDue35Jg2QPU",
    name: "CVS Pharmacy",
    address: "8000 Frankford Rd STE A, Dallas, TX 75252, USA",
    latitude: 32.995166399999995,
    longitude: -96.76305049999999,
    distance: 0.94,
    googleMapsUri: "https://maps.google.com/?q=CVS+Pharmacy+8000+Frankford+Rd+Dallas+TX"
  },
  {
    id: "ChIJxdLhbPEhTIYRQeyJaYfQrPA",
    name: "Tom Thumb Pharmacy",
    address: "1380 W Campbell Rd, Richardson, TX 75080, USA",
    latitude: 32.979927599999996,
    longitude: -96.7668841,
    distance: 0.99,
    googleMapsUri: "https://maps.google.com/?q=Tom+Thumb+Pharmacy+1380+W+Campbell+Rd+Richardson+TX"
  },
  {
    id: "ChIJKQml3_QhTIYRNlyvL2Yg5_g",
    name: "CVS Pharmacy",
    address: "16731 Coit Rd, Dallas, TX 75248, USA",
    latitude: 32.982571799999995,
    longitude: -96.7699772,
    distance: 1.11,
    googleMapsUri: "https://maps.google.com/?q=CVS+Pharmacy+16731+Coit+Rd+Dallas+TX"
  },
  {
    id: "ChIJb-W3W8wjTIYRbCk51Rj-f_Y",
    name: "Paragon Healthcare Inc.",
    address: "3033 W President George Bush Hwy Suite #100, Plano, TX 75075, USA",
    latitude: 33.0041041,
    longitude: -96.7513591,
    distance: 1.26,
    googleMapsUri: "https://maps.google.com/?q=Paragon+Healthcare+Inc+Plano+TX"
  },
  {
    id: "ChIJIT5_I2AfTIYRr3UaFcfomhc",
    name: "Arapaho Pharmacy",
    address: "57 Arapaho Village Center, Richardson, TX 75080, USA",
    latitude: 32.9618435,
    longitude: -96.7506564,
    distance: 1.66,
    googleMapsUri: "https://maps.google.com/?q=Arapaho+Pharmacy+Richardson+TX"
  },
  {
    id: "ChIJJ9PUid8hTIYRqmmOLxxQrm4",
    name: "Tom Thumb Pharmacy",
    address: "819 W Arapaho Rd, Richardson, TX 75080, USA",
    latitude: 32.961530499999995,
    longitude: -96.7499134,
    distance: 1.68,
    googleMapsUri: "https://maps.google.com/?q=Tom+Thumb+Pharmacy+819+W+Arapaho+Rd+Richardson+TX"
  },
  {
    id: "ChIJEc49qeohTIYRb-TtYwilqZQ",
    name: "Walmart Pharmacy",
    address: "15757 Coit Rd, Dallas, TX 75248, USA",
    latitude: 32.96309,
    longitude: -96.76972719999999,
    distance: 1.9,
    googleMapsUri: "https://maps.google.com/?q=Walmart+Pharmacy+15757+Coit+Rd+Dallas+TX"
  },
  {
    id: "ChIJNWalgreens3802",
    name: "Walgreens",
    address: "2140 E Campbell Rd, Richardson, TX 75081, USA",
    latitude: 32.9781,
    longitude: -96.7153,
    distance: 2.15,
    googleMapsUri: "https://maps.google.com/?q=Walgreens+2140+E+Campbell+Rd+Richardson+TX"
  },
  {
    id: "ChIJKroger517",
    name: "Kroger Pharmacy",
    address: "160 N Coit Rd, Richardson, TX 75080, USA",
    latitude: 32.9652,
    longitude: -96.7498,
    distance: 1.85,
    googleMapsUri: "https://maps.google.com/?q=Kroger+Pharmacy+160+N+Coit+Rd+Richardson+TX"
  },
  {
    id: "ChIJc_QH3j8fTIYRHrtjD0pbb0A",
    name: "FarmaKeio Superior Custom Compounding",
    address: "1736 N Greenville Ave, Richardson, TX 75081, USA",
    latitude: 32.9710423,
    longitude: -96.71554139999999,
    distance: 2.31,
    googleMapsUri: "https://maps.google.com/?q=FarmaKeio+Superior+Custom+Compounding+Richardson+TX"
  },
  {
    id: "ChIJCVS601",
    name: "CVS Pharmacy",
    address: "601 S Plano Rd, Richardson, TX 75081, USA",
    latitude: 32.9485,
    longitude: -96.7297,
    distance: 2.65,
    googleMapsUri: "https://maps.google.com/?q=CVS+Pharmacy+601+S+Plano+Rd+Richardson+TX"
  },
  {
    id: "ChIJWalmart1501",
    name: "Walmart Pharmacy",
    address: "1501 Buckingham Rd, Richardson, TX 75081, USA",
    latitude: 32.9556,
    longitude: -96.7195,
    distance: 2.48,
    googleMapsUri: "https://maps.google.com/?q=Walmart+Pharmacy+1501+Buckingham+Rd+Richardson+TX"
  },
  {
    id: "ChIJAlbertsons2165",
    name: "Albertsons Pharmacy",
    address: "2165 E Buckingham Dr, Richardson, TX 75081, USA",
    latitude: 32.9563,
    longitude: -96.7088,
    distance: 2.82,
    googleMapsUri: "https://maps.google.com/?q=Albertsons+Pharmacy+2165+E+Buckingham+Dr+Richardson+TX"
  },
  {
    id: "ChIJCVS325",
    name: "CVS Pharmacy",
    address: "325 W Spring Valley Rd, Richardson, TX 75081, USA",
    latitude: 32.9421,
    longitude: -96.7358,
    distance: 3.12,
    googleMapsUri: "https://maps.google.com/?q=CVS+Pharmacy+325+W+Spring+Valley+Rd+Richardson+TX"
  }
];



export default function Finder() {
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNearbyPharmacies();
  }, []);

  const fetchNearbyPharmacies = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Location permission denied');
        setLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setUserLocation({ latitude, longitude });

      await new Promise(resolve => setTimeout(resolve, 1000));
      setPharmacies(TEST_PHARMACIES);
      setLoading(false);
      
    } catch (err) {
      console.error('Error fetching pharmacies:', err);
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" }}>
        <ActivityIndicator size="large" color="#FF6B9D" />
        <Text style={{ marginTop: 16, fontSize: 16, color: "#666", fontWeight: "500" }}>
          Finding nearby pharmacies...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff", padding: 20 }}>
        <Ionicons name="alert-circle" size={64} color="#FF6B9D" />
        <Text style={{ fontSize: 18, color: "#333", textAlign: "center", marginTop: 16, fontWeight: "600" }}>
          {error}
        </Text>
        <TouchableOpacity 
          style={{ 
            marginTop: 24, 
            backgroundColor: "#FF6B9D", 
            paddingVertical: 14, 
            paddingHorizontal: 32,
            borderRadius: 25,
          }}
          onPress={fetchNearbyPharmacies}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
      <StatusBar barStyle="dark-content" />
      
      {/* Modern Header */}
      <View style={{ 
        paddingTop: 60, 
        paddingBottom: 20,
        paddingHorizontal: 24,
        backgroundColor: "#fff",
      }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            backgroundColor: "#FFE4F0",
            justifyContent: "center",
            alignItems: "center",
            marginRight: 12,
          }}>
            <Ionicons name="location" size={24} color="#FF6B9D" />
          </View>
          <View>
            <Text style={{ 
              fontSize: 24, 
              fontWeight: "800", 
              color: "#1a1a1a",
              letterSpacing: -0.5,
            }}>
              Pharmacy Finder
            </Text>
            <Text style={{ 
              fontSize: 13, 
              color: "#999",
              fontWeight: "500",
              marginTop: 2,
            }}>
              {pharmacies.length} locations nearby
            </Text>
          </View>
        </View>
      </View>

      <View style={{ 
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 16,
        backgroundColor: "#fff",
      }}>
        {userLocation && MapViewClustering && Marker && (
          <View style={{
            height: 260,
            borderRadius: 20,
            overflow: "hidden",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.08,
            shadowRadius: 12,
            elevation: 6,
          }}>
            <MapViewClustering
              style={{ width: '100%', height: '100%' }}
              customMapStyle={mapStyle}
              initialRegion={{
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.015,
              }}
              showsUserLocation={true}
              showsMyLocationButton={false}
              showsCompass={false}
              showsScale={false}
              showsBuildings={false}
              showsTraffic={false}
              showsIndoors={false}
              toolbarEnabled={false}
              mapPadding={{ top: 0, right: 0, bottom: 0, left: 0 }}
            >
              {pharmacies.map((pharmacy, idx) => (
                <Marker
                  key={idx}
                  coordinate={{
                    latitude: pharmacy.latitude,
                    longitude: pharmacy.longitude,
                  }}
                  title={pharmacy.name}
                  description={pharmacy.address}
                  pinColor="#FF6B9D"
                />
              ))}
            </MapViewClustering>
          </View>
        )}
      </View>

      <LinearGradient
        colors={['#fff', '#f5b6d2ff']}
        style={{
          flex: 1,
          paddingTop: 12,
          paddingHorizontal: 20,
        }}
      >
        <FlatList
          data={pharmacies}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#fff",
                marginBottom: 10,
                borderRadius: 16,
                padding: 16,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.04,
                shadowRadius: 6,
                elevation: 2,
              }}
              activeOpacity={0.8}
              onPress={() => Linking.openURL(item.googleMapsUri)}
            >
              <View style={{ flex: 1 }}>
                <Text style={{ 
                  fontSize: 17, 
                  fontWeight: "700", 
                  color: "#1a1a1a",
                  marginBottom: 3,
                }}>
                  {item.name}
                </Text>
                <Text style={{ 
                  fontSize: 13, 
                  color: "#888",
                  fontWeight: "400",
                }}>
                  {item.address}
                </Text>
              </View>
              
              <View style={{ 
                alignItems: "center",
                marginLeft: 12,
              }}>
                <Text style={{ 
                  fontSize: 14, 
                  fontWeight: "700",
                  color: "#FF6B9D",
                  marginBottom: 2,
                }}>
                  {item.distance?.toFixed(1)} mi
                </Text>
                <Ionicons name="navigate-outline" size={20} color="#999" />
              </View>
            </TouchableOpacity>
          )}
        />
      </LinearGradient>
    </View>
  );
}
