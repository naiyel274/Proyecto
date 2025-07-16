import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Switch, Alert } from "react-native";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ConfiguracionScreen() {
  const [permisoNotificaciones, setPermisoNotificaciones] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkPermisos = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      const preferencia = await AsyncStorage.getItem("notificaciones_activas");
      setPermisoNotificaciones(status === "granted" && preferencia === "true");
      setLoading(false);
    };
    checkPermisos();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Cargando...</Text>
      </View>
    );
  }
  
  const toggleSwitch = async (valor) => {
    if (valor) {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status === "granted") {
        setPermisoNotificaciones(true);
        await AsyncStorage.setItem("notificaciones_activas", "true");
        Alert.alert("Permiso concedido", "Las notificaciones están activadas.");
      } else {
        await AsyncStorage.setItem("notificaciones_activas", "false");
        setPermisoNotificaciones(false);
        Alert.alert("Permiso denegado", "No se han activado las notificaciones.");
      }
    } else {
      await AsyncStorage.setItem("notificaciones_activas", "false");
      setPermisoNotificaciones(false);
      Alert.alert(
        "Desactivado",
        "Si quieres desactivar completamente las notificaciones, debes hacerlo desde la configuración de tu dispositivo."
      );
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 19, marginBottom: 28 }}>
        Notificaciones: {permisoNotificaciones ? "Activados" : "Desactivados"}
      </Text>
      <Switch value={permisoNotificaciones} onValueChange={toggleSwitch} />
    </View>
  );
}
