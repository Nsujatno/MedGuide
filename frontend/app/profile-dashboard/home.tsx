import React, {useState} from "react"; 
import {useLocalSearchParams, useRouter} from "expo-router"; 
import { View, Text, Image, TextInput, Button, Platform,Pressable,Modal,StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker"; 
import { useFonts, DidactGothic_400Regular } from "@expo-google-fonts/didact-gothic";

export default function Home() {
    const router = useRouter(); 
    const { firstNameLetter } = useLocalSearchParams(); 
    const [showMenu, setShowMenu] = useState(false); 
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [showPopup, setShowPopup] = useState(true);
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
        
        setEmail("");
        setPassword("");
    };

    return (
        <View style={{
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "center",
            backgroundColor: "#eab2b2ff",
            paddingTop: 50,
        }}>
            <Modal transparent visible={showPopup} animationType="fade">
                <View style={styles.overlay}>
                    <View style={styles.popup}>
                        <Pressable style={styles.closeButton} 
                        onPress={() => setShowPopup(false)}>
                            <Text 
                            style={{
                                fontSize: 15, 
                                fontWeight: "200", 
                                
                                marginTop: -5,
                            }}>
                                x
                                </Text>
                            
                        </Pressable>
                        <Text
                            style={{
                                fontFamily: "DidactGothic_400Regular",
                                fontSize: 20, 
                                color: "#67130f", 
                                textAlign: "center", 
                                marginTop: 10, 
                                marginBottom: 15,
                                fontWeight: "900",
                            }}
                        >
                            My Medication
                        </Text>
                        <Text
                            style={{
                                fontFamily: "DidactGothic_400Regular", 
                                fontSize: 15, 
                                color: "black", 
                                marginBottom: 5,
                            }}
                            >
                                Today's Dosages:
                            </Text>

                            
                    </View>

                </View>
            </Modal>
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
                            <Text
                                style={{
                                    fontFamily: "DidactGothic_400Regular",
                                    color: "darkred",
                                    fontSize: 30,
                                    textAlign: "center",
                                    marginTop: 30,
                                

                                }}
                            >
                                Explore Our Features
                            </Text>
            
      
            {/* --- 1. SYMPTOM SURVEY (above image) --- */}
<Pressable
    onPress={() => router.push('/survey')}
    style={{
        backgroundColor: "#b15454ff",
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderRadius: 25,
        marginTop: 30,
        width: 250,
        marginBottom: 20,
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
        Take Symptom Survey
    </Text>
</Pressable>


{/* --- 2. IMAGE WITH CALENDAR BUTTON IN TOP-LEFT --- */}
<View style={{ marginTop: 30 }}>
    
    {/* Calendar positioned on top-left of image */}
    <Pressable
        onPress={() => router.push("/profile-dashboard/calendar")}
        style={{
            position: "absolute",
            top: -10,
            left: -70,
            backgroundColor: "#67130f",
            width: 90,
            height: 90,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
            
        }}
    >
        <Text style={{
            color: "white",
            fontSize: 16,
            fontFamily: "JosefinSans_400Regular",
            textAlign: "center",
        }}>
            My{"\n"}Calendar
        </Text>
    </Pressable>
     <Pressable
        onPress={() => router.push("/createpro")}
        style={{
            position: "absolute",
            top: -10,
            //left: -50,
            right: -75,
            backgroundColor: "#67130f",
            width: 90,
            height: 90,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
            
        }}
    >
        <Text style={{
            color: "white",
            fontSize: 16,
            fontFamily: "JosefinSans_400Regular",
            textAlign: "center",
        }}>
            Edit{"\n"}Profile
        </Text>
    </Pressable>

    {/* IMAGE */}
    <Image
        source={require("../../assets/images/medicine.png")}
        style={{
            width: 220,
            height: 220,
            alignSelf: "center",
            left: -10,
            
        }}
    />
</View>
<Pressable
        onPress={() => router.push("/profile-dashboard/finder")}
        style={{
            position: "absolute",
            top: 375,
            left: 30,
            backgroundColor: "white",
            width: 90,
            height: 90,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
            
        }}
    >
        <Text style={{
            color: "darkred",
            fontSize: 16,
            fontFamily: "JosefinSans_400Regular",
            textAlign: "center",
        }}>
            Pharmacy{"\n"}Finder
        </Text>
    </Pressable>
    <Pressable
        onPress={() => router.push("/followup")}
        style={{
            position: "absolute",
            top: 375,
            //left: -50,
            right: 20,
            backgroundColor: "white",
            width: 90,
            height: 90,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
            
        }}
    >
        <Text style={{
            color: "darkred",
            fontSize: 16,
            fontFamily: "JosefinSans_400Regular",
            textAlign: "center",
        }}>
            Follow-up{"\n"}Survey
        </Text>
    </Pressable>


{/* --- 3. VIEW MEDICATION PLAN (below image) --- */}
<Pressable
    onPress={() => router.push("/profile-dashboard/medication")}
    style={{
        backgroundColor: "#b15454ff",
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderRadius: 25,
        marginTop: 30,
        width: 250,
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
        View Medication Plan
    </Text>
</Pressable>
 
</View>
    );

}
const styles = StyleSheet.create({
    overlay:{
        flex: 1, 
        backgroundColor: "rgba(0,0,0,0.3)",
        justifyContent: "center", 
        alignItems: "center",
    },
    popup: {
        backgroundColor: "white", 
        width: "75%", 
        padding: 20, 
        borderRadius: 15, 
        alignItems: "center", 
        position: "relative",
    },
    closeButton: {
        position: "absolute", 
        top: 10, 
        right: 10, 
        width: 15,
        height: 15,
        borderRadius: 15,
        backgroundColor: "lightpink",
        justifyContent: "center",
        alignItems: "center", 
        borderWidth: 1.5,
         

    },


    });

