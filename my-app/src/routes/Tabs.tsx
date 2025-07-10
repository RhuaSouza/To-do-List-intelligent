import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AntDesign from "@react-native-vector-icons/ant-design";
import Forms from "../pages/home/Forms";
import Tasks from "../pages/formTaks/Tasks";

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#1E293B",
          height: 100,
          borderTopWidth: 2,
          borderTopColor: "#0F172A",
        },
        tabBarIconStyle: {
          marginTop: 10,
        },
        tabBarInactiveTintColor: "#94A3B8",
        tabBarActiveTintColor: "#38BDF8",
      }}
    >
      <Tab.Screen
        name="Home"
        component={Forms}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="plus" size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Tasks}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="idcard" size={28} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
