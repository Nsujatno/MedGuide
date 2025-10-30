import React, {useState} from "react"; 
import { Text, View, Image, Pressable } from "react-native";
import {useLocalSearchParams, useRouter} from "expo-router"; 
import { useFonts, DidactGothic_400Regular } from "@expo-google-fonts/didact-gothic";
export default function CreatePro() {
    const router = useRouter(); 
    const {firstNameLetter} = useLocalSearchParams(); 
    const [showMenu, setShowMenu] = useState(false); 
    const [fontsLoaded] = useFonts({
      DidactGothic_400Regular,
    });
        if (!fontsLoaded) return null;
    return (
        <View style={{ flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#eab2b2ff",
        paddingTop: 50,
        }}
        >
        
        <Text
          style={{
            color: "black",
            fontSize: 30,
            fontFamily: "DidactGothic_400Regular",
            fontWeight: '900',
            
            marginBottom: 15,
            textAlign: "center",
            maxWidth: 400,
          }}
        >
          Edit Profile
        </Text>
        <Pressable
                onPress={() => setShowMenu(!showMenu)}
        
                style = {{
                    position: "absolute", 
                    top: 22, 
                    right: 20,
                    width: 40, 
                    height: 40, 
                    borderRadius: 25, 
                    backgroundColor: "#67130f",
                    justifyContent: "center",
                    alignItems: "center", 
                    zIndex: 10, 
                }}
                >
                    <Text style = {{ color: "white", fontSize: 24, fontWeight: "200"}}>
                        {firstNameLetter || "A"}
                    </Text>
                    </Pressable>
                {showMenu && (
                    <View
                    style = {{
                        position: "absolute", 
                        top: 70, 
                        right: 20, 
                        backgroundColor: "white", 
                        borderRadius: 10, 
                        borderWidth: 1, 
                        borderColor: "#67130f", 
                        shadowColor: "#000", 
                        shadowOffset: {width: 0, height: 2}, 
                        shadowOpacity: 0.2, 
                        shadowRadius: 4, 
                        zIndex: 20, 
                    }}
                >
                    <Pressable 
                    onPress={() => {
                        setShowMenu(false); 
                        router.push("/createpro"); 
        
                    }}
                    style = {{ padding: 10}}
                > 
                <Text 
                style={{
                    fontFamily: "DidactGothic_400Regular", 
                    color: "#67130f",
                    fontSize: 16,
                }}
                >
                    Edit Profile
                </Text>
                </Pressable>
                <View style={{ height: 1, backgroundColor: "#ccc" }} />
                <Pressable 
                    onPress={() => {
                        setShowMenu(false); 
                        router.push("/login"); 
                    }}
                    style = {{padding: 10}}
                >
                    <Text
                    style={{
                        fontFamily: "DidactGothic_400Regular",
                        color: "#67130f",
                        fontSize: 16,
                    }}
                    >
                        Log Out
                    </Text>
                </Pressable>
                </View>
                )}
       

      </View>
   
      
      
    );

}
