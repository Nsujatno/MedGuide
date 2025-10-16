import { Text, View, Image, Pressable } from "react-native";
import { useFonts, JosefinSans_400Regular } from "@expo-google-fonts/josefin-sans";
import { Link } from 'expo-router';


export default function Index() {
  const [fontsLoaded] = useFonts({
    JosefinSans_400Regular,
  });

  if (!fontsLoaded) {
    return null; 
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#EAB2B2",
        paddingTop: 80,
      }}
    >
      {/* Title */}
      <Text
        style={{
          fontFamily: "JosefinSans_400Regular",
          fontSize: 40,
          textAlign: "center",
          color: "#8B0000",
          marginTop: 20,
        }}
      >
        Welcome To{"\n"}MedGuide
      </Text>

      {/* Tagline */}
      <Text
        style={{
          fontFamily: "JosefinSans_400Regular",
          fontSize: 20,
          color: "#FFFFFF",
          textAlign: "center",
          marginTop: 10,
        }}
      >
        Your Smart Guide
      </Text>

      {/* Image */}
      <Image
        source={require("/Users/aditikammaradi/Desktop/MedGApp/MedGuide/frontend/assets/Screenshot 2025-10-10 at 1.59.16 AM.png")}
        style={{
          width: 180,
          height: 180,
          resizeMode: "contain",
          marginTop: 30,
          marginBottom: 30,
        }}
      />

      {/* Description */}
      <Text
        style={{
          fontFamily: "JosefinSans_400Regular",
          fontSize: 15,
          color: "#FFFFFF",
          textAlign: "center",
          lineHeight: 20,
          maxWidth: 300,
          marginHorizontal: "auto",
          marginBottom: 40,
        }}
      >
        Explore our custom-trained AI model employing data-driven recommendations
        for over-the-counter medication.
      </Text>

      {/* Button */}
      <Pressable
        onPress={() => alert("Button pressed!")}
        style={{
          backgroundColor: "#8B0000", // dark red
          paddingVertical: 12,
          paddingHorizontal: 40,
          borderRadius: 25,
          marginTop: 0,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 18,
            fontFamily: "JosefinSans_400Regular",
            textAlign: "center",
          }}
        >
          Create an Account
        </Text>
      </Pressable>
      <Pressable
        onPress={() => alert("Button pressed!")}
        style={{
          backgroundColor: "#b15454ff", 
          paddingVertical: 12,
          paddingHorizontal: 90,
          borderRadius: 25,
          marginTop: 20,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 18,
            fontFamily: "JosefinSans_400Regular",
            textAlign: "center",
          }}
        >
          Log In
        </Text>
      </Pressable>
      
    </View>
  );
}
