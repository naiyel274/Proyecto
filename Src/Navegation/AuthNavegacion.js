import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PantallaLogin from '../../Screen/Auth/Login';
import PantallaRegistro from '../../Screen/Auth/Registro';

const Stack = createNativeStackNavigator();

export default function AuthNavegacion() {
  return (
    <Stack.Navigator
      initialRouteName="Login" // Asegura que siempre inicie en Login
      screenOptions={{ headerShown: false }} // Oculta el encabezado
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
