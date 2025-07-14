import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PantallaLogin from '../../Screen/Auth/Login';
import PantallaRegistro from '../../Screen/Auth/Registro';

const Stack = createNativeStackNavigator();

export default function AuthNavegacion() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }} 
    >
      <Stack.Screen
        name="Login"
        component={PantallaLogin}
      />
      <Stack.Screen
        name="Registro"
        component={PantallaRegistro}
      />
    </Stack.Navigator>
  );
}
