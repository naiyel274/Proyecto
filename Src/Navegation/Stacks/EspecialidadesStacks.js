// Src/Navegation/Stacks/EspecialidadesStacks.js

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListarEspecialidades from '../../../Screen/Especialidad/ListarEspecialidades';
import FormularioEspecialidad from '../../../Screen/Especialidad/FormularioEspecialidad'; 

const Stack = createNativeStackNavigator();

const EspecialidadStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#000", 
        },
        headerTintColor: "#fff", 
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="ListarEspecialidades"
        component={ListarEspecialidades}
        options={{ title: "Especialidades" }}
      />
      <Stack.Screen
        name="FormularioEspecialidad"
        component={FormularioEspecialidad}
        options={{ title: "Formulario Especialidad" }}
      />
    </Stack.Navigator>
  );
};

export default EspecialidadStack;
