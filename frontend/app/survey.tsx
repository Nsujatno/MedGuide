import React from "react";
import { Text, View } from "react-native";
import { useFonts, DidactGothic_400Regular } from "@expo-google-fonts/didact-gothic";

export default function Survey() {
  const [fontsLoaded] = useFonts({
    DidactGothic_400Regular,
  });

  if (!fontsLoaded) return null;

  return (
    <View style={{ 
      flex: 1, 
      justifyContent: "center", 
      alignItems: "center",
      backgroundColor: "#eab2b2ff" 
    }}>
      <Text style={{
        fontSize: 24,
        fontFamily: "DidactGothic_400Regular",
        color: "#67130f"
      }}>
        Health Survey
      </Text>
      <Text style={{
        fontSize: 16,
        fontFamily: "DidactGothic_400Regular",
        color: "#000",
        marginTop: 20,
        textAlign: "center",
        paddingHorizontal: 20
      }}>
        Take health surveys and track symptoms here.
      </Text>
    </View>
  );
}
