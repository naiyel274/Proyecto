import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PerfilScreen from "../../../Screen/Perfil/PerfilScreen";
import EditarPerfilScreen from "../../../Screen/Perfil/EditarPerfilScreen";

const Stack = createStackNavigator();

export default function PerfilStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PerfilPrincipal"
        component={PerfilScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditarPerfil"
        component={EditarPerfilScreen}
        options={{ title: "Editar Perfil" }}
      />
    </Stack.Navigator>
  );
}
