import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListarMedicos from "../../../Screen/Medico/ListarMedicos";
import FormularioMedico from "../../../Screen/Medico/FormularioMedico";

const Stack = createNativeStackNavigator();

export default function MedicoStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#000000" },  
        headerTintColor: "#ffffff",                    
        headerTitleStyle: { fontWeight: "bold" },      
      }}
    >
      <Stack.Screen
        name="ListarMedicos"
        component={ListarMedicos}
        options={{ title: "Médicos" }}
      />
      <Stack.Screen
        name="FormularioMedico"
        component={FormularioMedico}
        options={({ route }) => ({
          title: route.params?.medico ? "Editar Médico" : "Nuevo Médico",
        })}
      />
    </Stack.Navigator>
  );
}
