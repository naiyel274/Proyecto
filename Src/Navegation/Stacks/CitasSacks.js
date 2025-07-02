import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListarCitas from '../../../Screen/Citas/ListarCitas'; // Ajusta la ruta según tu estructura

const Stack = createNativeStackNavigator();

export default function CitasStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ListarCitas"
        component={ListarCitas}
        options={{ title: 'Citas' }}
      />
    </Stack.Navigator>
  );
}
