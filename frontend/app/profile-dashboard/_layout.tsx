import { Tabs } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function ProfileLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="medication"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name="pill"
              size={28}
              color={focused ? "#610f06ff" : "#cca0a0ff"}
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
              size={30}
              color={focused ? "#610f06ff" : "#cca0a0ff"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="calendar"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="calendar"
              size={28}
              color={focused ? "#610f06ff" : "#cca0a0ff"}
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
              size={28}
              color={focused ? "#610f06ff" : "#cca0a0ff"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
