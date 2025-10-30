import React, {useState} from "react"; 
import {useLocalSearchParams, useRouter} from "expo-router"; 
import { View, Text, Image, TextInput, Button, Platform,Pressable } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker"; 
import { useFonts, DidactGothic_400Regular } from "@expo-google-fonts/didact-gothic";
export default function Login() {
    const router = useRouter(); 
    const { firstNameLetter } = useLocalSearchParams(); 
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [error, setError] = useState(""); 

    const [fontsLoaded] = useFonts({
  DidactGothic_400Regular,
});
    if (!fontsLoaded) return null;

    

  const validate = () => {
    if (!email.trim() || !password.trim()){
        setError("Please enter valid email or password"); 
        return; 
    }
    setError(""); 
    if(firstNameLetter){
        router.push({
            pathname: "/profile",
            params: {firstNameLetter},
        });
    }  else{
        router.push("/profile"); 
    }
  };
  return (
    <View style={{

        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#eab2b2ff",
        paddingTop: 50,
      }}
    >
    <Image
            source={require("/Users/aditikammaradi/Desktop/MedGApp/MedGuide/frontend/assets/Screenshot 2025-10-30 at 3.03.28 AM.png")}
            style={{
              position: "absolute", 
              width: 90,
              height: 90,
              top: 130,
              left: 160, 
              marginBottom: 20,
              
            }}
          />
      
    <View
        style={{
          backgroundColor: "#f0a7a3ff",
          paddingVertical: 10,
          paddingHorizontal: 100,
          borderRadius: 15,
          borderWidth: 0.5,
          borderColor: "white",
          marginBottom: 150,
          shadowColor: "#a92121ff",        
          shadowOffset: { width: 4, height: 10 }, 
          shadowOpacity: 0.2,         
          shadowRadius: 4,           
          
          elevation: 5, 
        }}
      >
        <Text
          style={{
            color: "black",
            fontFamily: "DidactGothic_400Regular",

            fontSize: 18,
          }}
        >
          Login
        </Text>
    </View>
    <View
        style={{
          backgroundColor: "#c86e6eff", 
          width: "85%",
          borderRadius: 20,
          padding: 15,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          marginBottom: 20,
          elevation: 3,
        }}
      >
        <Text
          style={{
            fontFamily: "DidactGothic_400Regular",
            fontSize: 16,
            color: "#430b0bff",
            marginBottom: 8,
          }}
        >
          Email
        </Text>

        <TextInput
          placeholder="Enter your first email"
          placeholderTextColor="#b38686ff"
          value = {email}
          onChangeText={setEmail}
          style={{
            backgroundColor: "white",
            borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 15,
            fontSize: 16,
            color: "#8B0000",
            borderWidth: 1,
            borderColor: "#8B0000",
          }}
        />
      </View>
    
    <View
        style={{
          backgroundColor: "#c86e6eff", 
          width: "85%",
          borderRadius: 20,
          padding: 15,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          marginBottom: 20,
          elevation: 4,
        }}
      >
        <Text
          style={{
            fontFamily: "DidactGothic_400Regular",
            fontSize: 16,
            color: "#430b0bff",
            marginBottom: 8,
          }}
        >
          Password
        </Text>

        <TextInput
          placeholder="Enter your password"
          placeholderTextColor="#b38686ff"
          value={password}
          onChangeText={setPassword}
          style={{
            backgroundColor: "white",
            borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 15,
            fontSize: 16,
            color: "#8B0000",
            borderWidth: 1,
            borderColor: "#8B0000",
          }}
        />
      </View>
      
      
        {error ? (
        <Text
            style ={{
                color: "red",
                fontFamily: "DidactGothic_400Regular",
                marginBottom: 0,
            }}
        >
            {error}
        </Text>
  )    : null}
        
        
       
      <Pressable
              onPress={validate} 
              style={{
                backgroundColor: "#e8a3a3ff", 
                paddingVertical: 8,
                paddingHorizontal: 60,
                borderRadius: 25,
                borderWidth: 1,
                borderColor: "darkred",
                justifyContent: "center",
                marginTop: 0,
                alignSelf: "flex-end",
                marginRight: 120,       
                shadowColor: "#4e0e0eff",        
          shadowOffset: { width: 8, height: 15 }, 
          shadowOpacity: 0.4,         
          shadowRadius: 8,  
              }}
            >
              <Text
                style={{
                  color: "darkred",
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

