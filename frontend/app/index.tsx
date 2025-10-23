import { Text, View, Image, Pressable } from "react-native";
import { useFonts, JosefinSans_400Regular } from "@expo-google-fonts/josefin-sans";
import {useRouter} from "expo-router"; 



export default function Index() {
  const router = useRouter(); 
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

    
      <Text
        style={{
          fontFamily: "JosefinSans_400Regular",
          fontSize: 20,
          color: "#FFFFFF",
          textAlign: "center",
          marginTop: 10,
          marginBottom: 250,
        }}
      >
        Your Smart Guide
      </Text>

     
      <Image
        source={require("/Users/aditikammaradi/Desktop/MedGApp/MedGuide/frontend/assets/Screenshot 2025-10-23 at 6.31.10 PM.png")}
        style={{
          position: "absolute", // 👈 just like your CSS
          width: 223,
          height: 223,
          top: 220, // adjust this to position it
          left: 100, // optional — use if needed
        }}
      />

      
      <Text
        style={{
          fontFamily: "JosefinSans_400Regular",
          fontSize: 15,
          color: "#FFFFFF",
          textAlign: "center",
          lineHeight: 20,
          maxWidth: 300,
          marginHorizontal: "auto",
          marginBottom: 30,
        }}
      >
        Explore our custom-trained AI model employing data-driven recommendations
        for over-the-counter medication.
      </Text>

    
      <Pressable
        onPress={() => router.push('/login')} 
        style={{
          backgroundColor: "#8B0000", 
          paddingVertical: 12,
          paddingHorizontal: 90,
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
          Log In
        </Text>
      </Pressable>
      <Pressable
        onPress={() => router.push('/signUp')} 
        style={{
          backgroundColor: "#b15454ff", 
          paddingVertical: 12,
          paddingHorizontal: 40,
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
          Create an Account
        </Text>
      </Pressable>
    </View>
  );
}
