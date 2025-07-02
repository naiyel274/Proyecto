import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListarMedicos from '../../../Screen/Medico/ListarMedicos'; // Ajusta si tu ruta es distinta

const Stack = createNativeStackNavigator();

const MedicoStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ListarMedicos" component={ListarMedicos} />
    </Stack.Navigator>
  );
};

export default MedicoStack;
