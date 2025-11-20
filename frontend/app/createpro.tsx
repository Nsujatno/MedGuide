import React, {useState} from "react"; 
import { Text, TextInput, View, Image, Pressable,ScrollView } from "react-native";
import {useLocalSearchParams, useRouter} from "expo-router"; 
import { useFonts, DidactGothic_400Regular } from "@expo-google-fonts/didact-gothic";
import Slider from "@react-native-community/slider";
export default function CreatePro() {
    const router = useRouter(); 
    const {firstNameLetter} = useLocalSearchParams(); 
    const [showMenu, setShowMenu] = useState(false); 
    const [height, setHeight] = useState(""); 
    const [weight, setWeight] = useState(""); 
    const [showMenu2, setShowMenu2] = useState(false); 
    const [selectedGender, setSelectedGender] = useState(""); 
    const [selectedAnswer1, setSelectedAnswer1] = useState(""); 
    const [stress, setStress] = useState(5); 
    const[food, setSelectedFood] = useState<string[]>([]); 
    const foodAllergies = ["Peanuts", "Dairy", "Gluten", "Treenuts", "Eggs", "Seafood", "Soy","Penicillin","Nonsteroidal anti-inflammatory drugs (NSAIDs),","Opiates"];
    const[other1, setOther1] = useState(""); 
    const[drugs,setDrugs]=useState("");
    const[drugsConsumed, setDrugsConsumed]=useState(""); 
    const[alcohol,setAlcohol]=useState(""); 
    const[pills,setPills]=useState(""); 
    const [error, setError] = useState(""); 
    
    const [fontsLoaded] = useFonts({
      DidactGothic_400Regular,
    });
        if (!fontsLoaded) return null;
    const validate = () => {
      if (
        !height.trim() ||
        !weight.trim() ||
        !selectedGender.trim() ||
        !selectedAnswer1.trim() ||
        !drugs ||
        !alcohol ||
        !pills
      ) {
        setError("Please fill in required fields");
        return;
      }
      setError("");
      // push to the home page
      router.push("/profile-dashboard/home");
    };

    return (
        <ScrollView
        contentContainerStyle={{ flexGrow: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        backgroundColor: "#eab2b2ff",
        paddingTop: 50,
        paddingHorizontal: 30,
        paddingBottom: 100,
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
            alignSelf: "center",
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
                <View
        
                      >
                        <Text
                          style={{
                            fontFamily: "DidactGothic_400Regular",
                            fontSize: 18,
                            color: "#000000ff",
                            marginBottom: 12,

                          }}
                        >
                          Height
                        </Text>
                
                        <TextInput
                          placeholder="Enter your height"
                          placeholderTextColor="#000000ff"
                          
                          value={height}
                          onChangeText={setHeight}
                          style={{
                            backgroundColor: "#c2c0c0ff",
                            borderRadius: 3,
                            paddingVertical: 10,
                            paddingHorizontal: 10,
                            fontSize: 14,
                            color: "#383636ff",
                            borderWidth: 1,
                            borderColor: "#000000ff",
                            width: 350,
                            
                          }}
                        />
                      </View>
                      <View
        
                      >
                        <Text
                          style={{
                            fontFamily: "DidactGothic_400Regular",
                            fontSize: 18,
                            color: "#000000ff",
                            marginBottom: 10,
                            marginTop: 10,

                          }}
                        >
                          Weight
                        </Text>
                
                        <TextInput
                          placeholder="Enter your weight"
                          placeholderTextColor="#000000ff"
                          
                          value={weight}
                          onChangeText={setWeight}
                          style={{
                            backgroundColor: "#c2c0c0ff",
                            borderRadius: 3,
                            paddingVertical: 10,
                            paddingHorizontal: 10,
                            
                            fontSize: 14,
                            color: "#000000ff",
                            borderWidth: 1,
                            borderColor: "#000000ff",
                            width: 350,
                            
                          }}
                        />
                        </View>
                        <View style={{ marginTop: 15}}>
                        <Text
                        style={{
            fontFamily: "DidactGothic_400Regular",
            fontSize: 18,
            color: "#000000ff",
            marginBottom: 10,
          }}
        >
          Gender
        </Text>
                         <Pressable
                onPress={() => setShowMenu2(!showMenu2)}
        
                style = {{
                    backgroundColor: "#c2c0c0ff",
            borderRadius: 3,
            borderWidth: 1,
            borderColor: "#000000ff",
            width: 350,
            height: 45,
            justifyContent: "center",
            paddingHorizontal: 10,
                }}
                >
                    <Text style = {{ fontFamily: "DidactGothic_400Regular", fontSize: 14, color: "black"}}>
                        {selectedGender || "Select Gender"}
                    </Text>
                    </Pressable>
                {showMenu2 && (
                    <View
                    style = {{
                        position: "absolute", 
                        top: 70, 
                        left: 30,
                        
                        backgroundColor: "white", 
                        borderRadius: 10, 
                        
                        borderWidth: 1, 
                        borderColor: "#67130f", 
                        shadowColor: "#000", 
                        shadowOffset: {width: 0, height: 2}, 
                        shadowOpacity: 0.2, 
                        shadowRadius: 4, 
                        zIndex: 20, 
                        width: 200,
                    }}
                >
                    {["Male", "Female", "Other"].map((gender)=> (
                    <Pressable 
                    key={gender}
                    onPress={() => {
                        setSelectedGender(gender); 
                        setShowMenu2(false); 
                        
        
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
                    {gender}
                </Text>
                </Pressable>
                    ))}

                <View style={{ height: 1, backgroundColor: "#ccc" }} />
                
                      </View>

                   
                      
                )}
                </View>
                <View style ={{marginTop: 20}}>
                    <Text
                    style={{
                        fontFamily: "DidactGothic_400Regular",
                        fontSize: 18, 
                        color: "#black",
                        marginBottom: 20,
                    }}
                    >
                        Are you pregnant?
                    </Text>
                    {["Yes","No"].map((option) =>(
                        <Pressable
                        key={option}
                        onPress={() => setSelectedAnswer1(option)}
                        style= {{
                            flexDirection: "row",
                            alignItems: "center", 
                            marginBottom: 8, 
                        }}
                    >
                        <View
                        style = {{
                            width: 20,
                                height: 20,
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: "#000",
                                marginRight: 10,
                                justifyContent: "center",
                                alignItems: "center",
                        }}
                        >
                            {selectedAnswer1 === option && (
                                <View
                                style = {{
                                    width: 12, 
                                    height: 12, 
                                    borderRadius: 6, 
                                    backgroundColor: "darkred",
                                }}
                                />
                            )}
                        </View>
                        <Text
                        style ={{
                            fontFamily: "DidactGothic_400Regular", 
                            fontSize: 16, 
                            color: "#000", 
                        }}
                        >
                            {option}
                        </Text>
                    </Pressable>
                    ))}
                    
                </View>
                <View style={{ marginTop: 30, alignSelf: "center" }}>
        <Text
          style={{
            fontFamily: "DidactGothic_400Regular",
            fontSize: 18,
            color: "#000",
            textAlign: "center",
            marginBottom: 15,
          }}
        >
            How would you rate your stress level?
        </Text>
        <View style={{ width: 350, alignItems: "center" }}>
          <Slider
            style={{ width: "100%", height: 40 }}
            minimumValue={0}
            maximumValue={10}
            step={1}
            minimumTrackTintColor="#67130f"
            maximumTrackTintColor="#ccc"
            thumbTintColor="#67130f"
            value={stress}
            onValueChange={(val) => setStress(val)}
          />
          <View 
           style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Text
            style={{
                fontFamily: "DidactGothic_400Regular",
                color: "#000",
                fontSize: 14,
              }}
            >
              0
            </Text>
            <Text
              style={{
                fontFamily: "DidactGothic_400Regular",
                color: "#000",
                fontSize: 14,
              }}
            >
              10
            </Text>
          </View>
          <Text
          style={{
              fontFamily: "DidactGothic_400Regular",
              color: "#67130f",
              fontSize: 16,
              marginTop: 10,
            }}
          >
            Stress Level: {stress}
          </Text>
          </View>
       

      </View>
      
<View style={{marginTop: 30}}>
    <Text style={{
        fontFamily: "DidactGothic_400Regular",
        fontSize: 18,
        color: "black",
        marginBottom: 20,
    }}>
        Select any allergies you have
    </Text>

    {foodAllergies.map((option) => (
        <Pressable
            key={option}
            onPress={() => {
                if (food.includes(option)) {
                    setSelectedFood(food.filter(item => item !== option));
                } else {
                    setSelectedFood([...food, option]);
                }
            }}
            style={{flexDirection: "row", alignItems: "center", marginBottom: 8}}
        >
            <View style={{
                width: 20,
                height: 20,
                borderWidth: 1,
                borderColor: "#000",
                justifyContent: "center",
                alignItems: "center",
                marginRight: 10,
            }}>
                {food.includes(option) && (
                    <View style={{
                        width: 12,
                        height: 12,
                        backgroundColor: "darkred",
                    }} />
                )}
            </View>
            <Text style={{
                fontFamily: "DidactGothic_400Regular",
                fontSize: 16,
                color: "#000",
            }}>
                {option}
            </Text>
        </Pressable>
    ))}
</View>
<View
        
                      >
                        <Text
                          style={{
                            fontFamily: "DidactGothic_400Regular",
                            fontSize: 18,
                            color: "#000000ff",
                            marginBottom: 15,
                            marginTop: 15,

                          }}
                        >
                          Other Allergies
                        </Text>
                
                        <TextInput
                          placeholder="Enter any other Allergies"
                          placeholderTextColor="#000000ff"
                          
                          value={other1}
                          onChangeText={setOther1}
                          style={{
                            backgroundColor: "#c2c0c0ff",
                            borderRadius: 3,
                            paddingVertical: 10,
                            paddingHorizontal: 10,
                            fontSize: 14,
                            color: "#000000ff",
                            borderWidth: 1,
                            borderColor: "#000000ff",
                            width: 350,
                            
                          }}
                        />
                      </View>
                      <View style ={{marginTop: 20}}>
                    <Text
                    style={{
                        fontFamily: "DidactGothic_400Regular",
                        fontSize: 18, 
                        color: "#black",
                        marginBottom: 20,
                    }}
                    >
                        Do you consume any drugs?
                    </Text>
                    {["Yes","No"].map((option) =>(
                        <Pressable
                        key={option}
                        onPress={() => setDrugs(option)}
                        style= {{
                            flexDirection: "row",
                            alignItems: "center", 
                            marginBottom: 8, 
                        }}
                    >
                        <View
                        style = {{
                            width: 20,
                                height: 20,
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: "#000",
                                marginRight: 10,
                                justifyContent: "center",
                                alignItems: "center",
                        }}
                        >
                            {drugs === option && (
                                <View
                                style = {{
                                    width: 12, 
                                    height: 12, 
                                    borderRadius: 6, 
                                    backgroundColor: "darkred",
                                }}
                                />
                            )}
                        </View>
                        <Text
                        style ={{
                            fontFamily: "DidactGothic_400Regular", 
                            fontSize: 16, 
                            color: "#000", 
                        }}
                        >
                            {option}
                        </Text>
                    </Pressable>
                    ))}
                    
                </View>
                <View
        
                      >
                        <Text
                          style={{
                            fontFamily: "DidactGothic_400Regular",
                            fontSize: 18,
                            color: "#000000ff",
                            marginBottom: 12,
                            marginTop: 20,

                          }}
                        >
                          If yes, which drugs do you take?
                        </Text>
                
                        <TextInput
                          placeholder="Enter any drugs you take"
                          placeholderTextColor="#000000ff"
                          
                          value={drugsConsumed}
                          onChangeText={setDrugsConsumed}
                          style={{
                            backgroundColor: "#c2c0c0ff",
                            borderRadius: 3,
                            paddingVertical: 10,
                            paddingHorizontal: 10,
                            fontSize: 14,
                            color: "#000000ff",
                            borderWidth: 1,
                            borderColor: "#000000ff",
                            width: 350,
                            
                          }}
                        />
                      </View>
                      <View style ={{marginTop: 20}}>
                    <Text
                    style={{
                        fontFamily: "DidactGothic_400Regular",
                        fontSize: 18, 
                        color: "#black",
                        marginBottom: 20,
                    }}
                    >
                        Do you consume alcohol?
                    </Text>
                    {["Yes","No"].map((option) =>(
                        <Pressable
                        key={option}
                        onPress={() => setAlcohol(option)}
                        style= {{
                            flexDirection: "row",
                            alignItems: "center", 
                            marginBottom: 8, 
                        }}
                    >
                        <View
                        style = {{
                            width: 20,
                                height: 20,
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: "#000",
                                marginRight: 10,
                                justifyContent: "center",
                                alignItems: "center",
                        }}
                        >
                            {alcohol === option && (
                                <View
                                style = {{
                                    width: 12, 
                                    height: 12, 
                                    borderRadius: 6, 
                                    backgroundColor: "darkred",
                                }}
                                />
                            )}
                        </View>
                        <Text
                        style ={{
                            fontFamily: "DidactGothic_400Regular", 
                            fontSize: 16, 
                            color: "#000", 
                        }}
                        >
                            {option}
                        </Text>
                    </Pressable>
                    ))}
                    
                </View>
                 <View style ={{marginTop: 20}}>
                    <Text
                    style={{
                        fontFamily: "DidactGothic_400Regular",
                        fontSize: 18, 
                        color: "#black",
                        marginBottom: 20,
                    }}
                    >
                        Are you comfortable with pills?
                    </Text>
                    {["Yes","No"].map((option) =>(
                        <Pressable
                        key={option}
                        onPress={() => setPills(option)}
                        style= {{
                            flexDirection: "row",
                            alignItems: "center", 
                            marginBottom: 8, 
                        }}
                    >
                        <View
                        style = {{
                            width: 20,
                                height: 20,
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: "#000",
                                marginRight: 10,
                                justifyContent: "center",
                                alignItems: "center",
                        }}
                        >
                            {pills === option && (
                                <View
                                style = {{
                                    width: 12, 
                                    height: 12, 
                                    borderRadius: 6, 
                                    backgroundColor: "darkred",
                                }}
                                />
                            )}
                        </View>
                        <Text
                        style ={{
                            fontFamily: "DidactGothic_400Regular", 
                            fontSize: 16, 
                            color: "#000", 
                        }}
                        >
                            {option}
                        </Text>
                    </Pressable>
                    ))}
                    
                </View>
                {error ? (
                    <Text style={{
                        color: "red",
                        fontSize: 16,
                        fontFamily: "DidactGothic_400Regular",
                        textAlign: "center",
                        marginTop: 15,
                        marginBottom: 10,
                    }}>
                        {error}
                    </Text>
                ) : null}
                <Pressable
                              onPress={validate} 
                              style={{
                                backgroundColor: "#bc7272ff", 
                                paddingVertical: 4,
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
                                  color: "white",
                                  fontSize: 18,
                                  fontFamily: "DidactGothic_400Regular",
                                  textAlign: "center",
                                }}
                              >
                                Complete Profile
                              </Text>
                            </Pressable>
                      
      
      </ScrollView>
   
      
      
    );

}

