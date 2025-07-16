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

        const mensaje =
          error.response?.data?.message ||
          "Ocurrió un error al cargar el perfil.";

        Alert.alert(
          "Error",
          mensaje,
          [
            {
              text: "OK",
              onPress: async () => {
                await AsyncStorage.removeItem("userToken");
                navigation.replace("Login");
              },
            },
          ],
          { cancelable: false }
        );
      } finally {
        setLoading(false);
      }
    };

    cargarPerfil();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#22d3ee" />
      </View>
    );
  }

  if (!usuario) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>No se pudo cargar el perfil.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil de Usuario</Text>

      <View style={styles.profileCard}>
        <Text style={styles.label}>
          👤 Nombre: <Text style={styles.value}>{usuario.user.name}</Text>
        </Text>
        <Text style={styles.label}>
          📧 Correo: <Text style={styles.value}>{usuario.user.email}</Text>
        </Text>

        <BottonComponent
  title="Editar Perfil"
  onPress={() => navigation.navigate("EditarPerfil", { usuario })}
/>

        <BottonComponent
          title="Cerrar Sesión"
          onPress={async () => {
            const result = await logoutUser();
            if (result) {
              Alert.alert("Sesión cerrada", "Has cerrado sesión correctamente.");
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
    backgroundColor: "#0f172a",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f172a",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#f1f5f9", 
    textAlign: "center",
    marginBottom: 24,
  },
  profileCard: {
    backgroundColor: "#1e293b", 
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#cbd5e1", 
    marginBottom: 10,
  },
  value: {
    fontWeight: "normal",
    color: "#e2e8f0", 
  },
  errorText: {
    color: "#f87171", 
    fontSize: 16,
    textAlign: "center",
  },
});
