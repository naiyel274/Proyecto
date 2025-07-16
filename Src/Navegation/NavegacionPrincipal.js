import { Feather, FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import InicioStack from "./Stacks/InicioStack";
import PerfilStack from "./Stacks/PerfilStack";
import EditarPerfilScreen from "../../Screen/Perfil/EditarPerfilScreen";
import ConfiguracionScreen from "../../Screen/Configuracion/ConfiguracionScreen";

const Tab = createBottomTabNavigator();

export default function NavegacionPrincipal() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#0f172a", 
          borderTopWidth: 0.5,
          borderTopColor: "#1e293b", 
          height: 60,
          paddingBottom: 6,
        },
        tabBarActiveTintColor: "#38bdf8", 
        tabBarInactiveTintColor: "#64748b", 
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
        headerStyle: {
          backgroundColor: "#0f172a", 
          borderBottomWidth: 0.5,
          borderBottomColor: "#1e293b",
        },
        headerTitleStyle: {
          color: "#f1f5f9", 
          fontSize: 20,
          fontWeight: "700",
        },
        headerTintColor: "#38bdf8", 
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
        component={PerfilStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user-circle" size={size} color={color} />
          ),
          headerTitle: "Mi Perfil",
        }}
      />
      <Tab.Screen
        name="Configuración"
        component={ConfiguracionScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="cog" size={size} color={color} />
          ),
          headerTitle: "Configuración",
        }}
      />
    </Tab.Navigator>

       

  );
}
