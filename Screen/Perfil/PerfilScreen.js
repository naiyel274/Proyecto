import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottonComponent from "../../components/BottonComponent";
import api from "../../Src/Services/conexion";
import { logoutUser } from "../../Src/Services/AuthService";

export default function PerfilScreen({ navigation }) {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) {
          Alert.alert("Token no encontrado", "Redirigiendo al login");
          return;
        }

        const response = await api.get("/me");
        setUsuario(response.data);
      } catch (error) {
        console.error("Error al cargar el perfil:", error);

        if (error.response) {
          Alert.alert(
            "Error del servidor",
            `Error ${error.response.status}: ${
              error.response.data?.message ||
              "Ocurrió un error al cargar el perfil"
            }`,
            [
              {
                text: "OK",
                onPress: async () => await AsyncStorage.removeItem("userToken"),
              },
            ]
          );
        } else if (error.request) {
          Alert.alert(
            "Error de conexión",
            "No se pudo conectar al servidor. Verifica tu conexión a Internet.",
            [
              {
                text: "OK",
                onPress: async () => await AsyncStorage.removeItem("userToken"),
              },
            ]
          );
        } else {
          Alert.alert(
            "Error",
            "Ocurrió un error inesperado al cargar el perfil.",
            [
              {
                text: "OK",
                onPress: async () => await AsyncStorage.removeItem("userToken"),
              },
            ]
          );
        }
      } finally {
        setLoading(false);
      }
    };

    cargarPerfil();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#10b981" />
      </View>
    );
  }

  if (!usuario) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No se pudo cargar el perfil.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil de Usuario</Text>
      <View style={styles.containerPerfil}>
        <Text style={styles.label}>
          👤 Nombre:{" "}
          <Text style={styles.textValue}>
            {usuario.user.name || "No disponible"}
          </Text>
        </Text>
        <Text style={styles.label}>
          📧 Correo:{" "}
          <Text style={styles.textValue}>
            {usuario.user.email || "No disponible"}
          </Text>
        </Text>

        <BottonComponent
          title="Cerrar Sesión"
          onPress={async () => {
            const result = await logoutUser();
            if (result) {
              Alert.alert(
                "Sesión cerrada",
                "Has cerrado sesión correctamente."
              );
            } else {
              Alert.alert("Error", "Ocurrió un error al cerrar sesión.");
            }
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#000000", // 🔥 Fondo completamente negro
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#ffffff",
  },
  containerPerfil: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: "#1a1a1a", // Gris muy oscuro para la tarjeta
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#d1d5db", // Gris claro para texto
  },
  textValue: {
    fontWeight: "normal",
    color: "#ffffff", // Texto blanco
  },
  errorText: {
    color: "#f87171", // Rojo suave
    textAlign: "center",
    fontSize: 16,
  },
});
