import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MenuInicio from "../../../Screen/MenuInicio"; 
import CitasStack from "../Stacks/CitasSacks"; 
import ConsultorioStack from "../Stacks/ConsultoriosStacks";
import EspecialidadStack from "../Stacks/EspecialidadesStacks";
import MedicoStack from "../Stacks/MedicoStacks";
import PacienteStack from "../Stacks/PacienteStacks";

const Stack = createStackNavigator();

const InicioStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Inicio" component={MenuInicio} />
      <Stack.Screen name="CitasFlow" component={CitasStack} />
      <Stack.Screen name="ConsultorioFlow" component={ConsultorioStack} />
      <Stack.Screen name="EspecialidadFlow" component={EspecialidadStack} />
      <Stack.Screen name="MedicoFlow" component={MedicoStack} />
      <Stack.Screen name="PacienteFlow" component={PacienteStack} />
    </Stack.Navigator>
  );
};

export default InicioStack;
