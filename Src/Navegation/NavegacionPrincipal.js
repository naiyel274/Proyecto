import { Feather, FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// Import your stacks and screens
import InicioStack from "./Stacks/InicioStack";
import PerfilScreen from "../../Screen/Perfil/PerfilScreen";
import ConfiguracionScreen from "../../Screen/Configuracion/ConfiguracionScreen";

const Tab = createBottomTabNavigator();

export default function NavegacionPrincipal() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: "#FFFFFF" },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "#666",
      }}
     
    >
      <Tab.Screen
        name="Inicio"
        component={InicioStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
          headerShown: false, 
        }}
      />

     

      <Tab.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user-circle" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Configuración"
        component={ConfiguracionScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="cog" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}