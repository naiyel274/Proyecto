import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListarConsultorios from '../../../Screen/Consultorio/ListarConsultorio'; // ajusta la ruta

const Stack = createNativeStackNavigator();

const ConsultorioStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ListarConsultorios" component={ListarConsultorios} />
    </Stack.Navigator>
  );
};

export default ConsultorioStack;
