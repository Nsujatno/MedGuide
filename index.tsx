import { Text, View } from "react-native";
import { useFonts, JosefinSans_400Regular } from "@expo-google-fonts/josefin-sans";

export default function Index() {
  const [fontsLoaded] = useFonts({
    JosefinSans_400Regular,
  });

  

  return (
<View
  style={{
    flex: 1,
    justifyContent: "flex-start", 
    alignItems: "center",
    backgroundColor:"#eecbcbff",
    paddingTop: 80, 
  }}
>
      <Text
    style={{
      position: "absolute",
      top: 100,   
      left: 100,   
      fontFamily: "JosefinSans_400Regular",
      fontSize: 40,
      textAlign: "center",
      color: "#8B0000"
    }}
  >
        Welcome To{"\n"}MedGuide
      </Text>
  <Text
    style={{
      fontFamily: "JosefinSans_400Regular",
      top: 120,   
      left: 7,
      fontSize: 20,     
      color: "#FFFFFF",   
      marginTop: 10,      
    }}
  >
    Your Personal Health Assistant
  </Text>
</View>
  );
}