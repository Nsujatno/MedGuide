import { Text, View, Image, Pressable } from "react-native";
import {useLocalSearchParams, useRouter} from "expo-router"; 
import { useFonts, DidactGothic_400Regular } from "@expo-google-fonts/didact-gothic";
export default function Created() {
    const router = useRouter(); 
    const { firstNameLetter } = useLocalSearchParams(); 
    const [fontsLoaded] = useFonts({
      DidactGothic_400Regular,
    });
        if (!fontsLoaded) return null;
    return (
        <View style={{ flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#eab2b2ff",
        paddingTop: 80, }}> 
        <Image
        source={require("/Users/aditikammaradi/Desktop/MedGApp/MedGuide/frontend/assets/Screenshot 2025-10-23 at 6.31.10 PM.png")}
        style={{
          position: "absolute", 
          width: 223,
          height: 223,
          top: 200, 
          left: 100, 
          
        }}
      />
    

      <Text
        style={{
          fontFamily: "DidactGothic_400Regular",
          fontSize: 30,
          textAlign: "center",
          color: "#000000ff",
          marginTop: 380,
          marginBottom: 20,
        }}
      >
        Account Created
      </Text>
      <Pressable
        onPress={() => 
            router.push({
                pathname: "/login",
                params: {firstNameLetter} , 
            })
        }
        style={{
          backgroundColor: "#d16868ff", 
          paddingVertical: 5,
          paddingHorizontal: 90,
          borderRadius: 25,
          shadowColor: "darkred",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 1,
          shadowRadius: 6,
          marginBottom: 20,
          marginTop: 0,
        }}
      >
        <Text
          style={{
            color: "black",
            fontSize: 18,
            fontFamily: "DidactGothic_400Regular",
            textAlign: "center",
          }}
        >
          Log In
        </Text>
      </Pressable>

      </View>
   
      
      
    );

}
