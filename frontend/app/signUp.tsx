import React, {useState} from "react"; 
import {useRouter} from "expo-router"; 
import { View, Text, TextInput, Button, Platform,Pressable } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker"; 
import { useFonts, DidactGothic_400Regular } from "@expo-google-fonts/didact-gothic";
export default function SignUp() {
    const router = useRouter(); 
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const [fontsLoaded] = useFonts({
  DidactGothic_400Regular,
});
    if (!fontsLoaded) return null;

    const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === "ios");
    setDate(currentDate);
  };
  return (
    <View style={{

        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "rgba(237, 172, 180, 1)",
        paddingTop: 50,
      }}
    >
    <View
        style={{
          backgroundColor: "#f0a7a3ff",
          paddingVertical: 10,
          paddingHorizontal: 60,
          borderRadius: 15,
          borderWidth: 0.5,
          borderColor: "white",
          marginBottom: 20,
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
          Create an Account
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
          First Name
        </Text>

        <TextInput
          placeholder="Enter your first name"
          placeholderTextColor="#b38686ff"
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
          Last Name
        </Text>

        <TextInput
          placeholder="Enter your last name"
          placeholderTextColor="#b38686ff"
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
          placeholder="Enter your email"
          placeholderTextColor="#b38686ff"
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
          Phone Number
        </Text>

        <TextInput
          placeholder="Enter your phone number"
          placeholderTextColor="#b38686ff"
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
          backgroundColor: "#FFFFFF", 
          width: 340,
          height: 130,
          borderRadius: 28,
          borderWidth: 4,
          borderColor: "darkred",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 14,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        <Text
          style={{
            fontFamily: "DidactGothic_400Regular",
            fontSize: 20,
            color: "#560c0cff",
            
            marginTop: 0,
          }}
        >
          Date of Birth
        </Text>

        <Button
          title={date.toDateString()}
          color="#c86e6eff"
          onPress={() => setShowPicker(true)}
        />

        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}
      </View>
      <Pressable
              onPress={() => router.push('/login')} 
              style={{
                backgroundColor: "#e8a3a3ff", 
                paddingVertical: 8,
                paddingHorizontal: 30,
                borderRadius: 25,
                borderWidth: 1,
                borderColor: "darkred",
                justifyContent: "center",
                marginTop: 0,
                alignSelf: "flex-end",
                marginRight: 30,       
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
                Next
              </Text>
            </Pressable>
    </View>
      
        
       

    
    
  );
}

