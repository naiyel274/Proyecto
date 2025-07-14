import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListarCitas from '../../../Screen/Citas/ListarCitas';
import FormularioCita from '../../../Screen/Citas/FormularioCita';

const Stack = createNativeStackNavigator();

export default function CitasStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#000000", 
        },
        headerTintColor: "#ffffff", 
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="ListarCitas"
        component={ListarCitas}
        options={{ title: 'Citas' }}
      />
      <Stack.Screen
        name="FormularioCita"
        component={FormularioCita}
        options={({ route }) => ({
          title: route.params?.cita ? 'Editar Cita' : 'Nueva Cita'
        })}
      />
    </Stack.Navigator>
  );
}
