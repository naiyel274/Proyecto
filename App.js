import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import AppNavegacion from "./Src/Navegation/AppNavegacion";
import { View } from "react-native";
import { Button } from 'react-native';


export default function App() {
  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    const getPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert("Se requieren permisos para recibir notificaciones");
      }
    };

    getPermissions();
  }, []);

  const enviarNotificacionLocal = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Hola",
        body: "Esta es una notificación local de prueba",
      },
      trigger: { seconds: 2 },
    });
  };

  return (
    <View style={{ flex: 1}}>
       <AppNavegacion />
       <Button title="probar Notificacion Local" onPress={enviarNotificacionLocal}/>
    </View>
  )

}
