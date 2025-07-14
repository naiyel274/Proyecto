import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListarPacientes from "../../../Screen/Paciente/ListarPacientes";
import FormularioPaciente from "../../../Screen/Paciente/FormularioPaciente";

const Stack = createNativeStackNavigator();

export default function PacienteStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#000000" },   
        headerTintColor: "#ffffff",                    
        headerTitleStyle: { fontWeight: "bold" },      
      }}
    >
      <Stack.Screen
        name="ListarPacientes"
        component={ListarPacientes}
        options={{ title: "Pacientes" }}
      />
      <Stack.Screen
        name="FormularioPaciente"
        component={FormularioPaciente}
        options={({ route }) => ({
          title: route.params?.paciente ? "Editar Paciente" : "Nuevo Paciente",
        })}
      />
    </Stack.Navigator>
  );
}
