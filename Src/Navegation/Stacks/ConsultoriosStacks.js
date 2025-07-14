import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListarConsultorios from '../../../Screen/Consultorio/ListarConsultorio';
import FormularioConsultorio from '../../../Screen/Consultorio/FormularioConsultorio';

const Stack = createNativeStackNavigator();

const ConsultorioStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#000000', 
        },
        headerTintColor: '#ffffff',  
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="ListarConsultorios"
        component={ListarConsultorios}
        options={{ title: 'Consultorios' }}
      />
      <Stack.Screen
        name="FormularioConsultorio"
        component={FormularioConsultorio}
        options={{ title: 'Formulario Consultorio' }}
      />
    </Stack.Navigator>
  );
};

export default ConsultorioStack;
