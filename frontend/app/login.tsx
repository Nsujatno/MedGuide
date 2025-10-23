import { View, Text } from "react-native";
import { useFonts, JosefinSans_400Regular } from "@expo-google-fonts/josefin-sans";
export default function SignUp() {
  return (
    <View style={{
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
        Login
      </Text>

    
    </View>
  );
}

