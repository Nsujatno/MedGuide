import React, {useState} from "react"; 
import { Text, View, Image, Pressable } from "react-native";
import {useLocalSearchParams, useRouter} from "expo-router"; 
import { useFonts, DidactGothic_400Regular } from "@expo-google-fonts/didact-gothic";
export default function Profie() {
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
        paddingTop: 80, 
        }}
        >
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
                router.push({
                  pathname: "/createpro",
                  params: { firstNameLetter }
                }); 

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
          Profile
        </Text>
        <Image
        source={require("/Users/aditikammaradi/Desktop/MedGApp/MedGuide/frontend/assets/Screenshot 2025-10-30 at 3.03.28 AM.png")}
        style={{
          position: "absolute", 
          width: 223,
          height: 223,
          top: 150, 
          marginBottom: 35,
          marginTop: 0,
          left: 90, 
          
          
        }}
      />

      <Text
          style={{
            color: "white",
            fontSize: 18,
            fontFamily: "DidactGothic_400Regular",
            fontWeight: '900',
            marginTop: 250,
            marginBottom: 40,
            textAlign: "center",
            maxWidth: 350,
          }}
        >
          Set up your profile with your personal and medical information to take our symptom survey and get real-time recommendations
        </Text>
    

      
      <Pressable
        onPress={() => router.push({
          pathname: '/createpro',
          params: { firstNameLetter }
        })} 
        style={{
          backgroundColor: "#d16868ff", 
          paddingVertical: 5,
          paddingHorizontal: 90,
          borderRadius: 25,
          shadowColor: "darkred",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 1,
          shadowRadius: 6,
          marginBottom: 10,
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
          Set up Profile
        </Text>
      </Pressable>

     

      </View>
   
      
      
    );

}
