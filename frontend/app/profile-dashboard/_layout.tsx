import { Tabs } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function ProfileLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 20,
          left: 0,
          right: 0,
          marginHorizontal: 80,    // Add margin on both sides
          backgroundColor: '#000000',
          borderRadius: 40,
          height: 60,
          paddingBottom: 0,
          paddingTop: 0,
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 10,
        },
        tabBarItemStyle: {
          paddingVertical: 8,
        },
      }}
    >
      <Tabs.Screen
        name="medication"
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="pill"
              size={26}
              color={focused ? "#FF6B9D" : "#FFFFFF"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="home"
              size={26}
              color={focused ? "#FF6B9D" : "#FFFFFF"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="finder"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="location"
              size={26}
              color={focused ? "#FF6B9D" : "#FFFFFF"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
