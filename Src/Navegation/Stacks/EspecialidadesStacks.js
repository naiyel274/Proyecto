// Src/Navegation/Stacks/EspecialidadesStacks.js

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListarEspecialidades from '../../../Screen/Especialidad/ListarEspecialidades'; // ajusta la ruta según tu estructura

const Stack = createNativeStackNavigator();

const EspecialidadStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ListarEspecialidades" component={ListarEspecialidades} />
    </Stack.Navigator>
  );
};

export default EspecialidadStack;
