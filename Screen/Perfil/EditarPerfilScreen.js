import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import BottonComponent from "../../components/BottonComponent";
import api from "../../Src/Services/conexion";
import { useNavigation } from "@react-navigation/native";

export default function EditarPerfilScreen({ route }) {
  const { usuario } = route.params; // Recibe datos del perfil actual
  const navigation = useNavigation();

  // Estados con datos actuales
  const [nombre, setNombre] = useState(usuario.user.name);
  const [email, setEmail] = useState(usuario.user.email);

  // Guardar cambios
  const handleActualizarPerfil = async () => {
    try {
      await api.put("/usuario", {
        name: nombre,
        email: email,
      });

      Alert.alert("Éxito", "Perfil actualizado correctamente", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      console.error("Error al actualizar perfil:", error.response?.data || error.message);
      Alert.alert("Error", "No se pudo actualizar el perfil.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Perfil</Text>

      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
        placeholder="Tu nombre"
        placeholderTextColor="#9ca3af"
      />

      <Text style={styles.label}>Correo</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Tu correo"
        placeholderTextColor="#9ca3af"
        keyboardType="email-address"
      />

      <BottonComponent title="Guardar Cambios" onPress={handleActualizarPerfil} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: "#f1f5f9",
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#cbd5e1",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#1f2937",
    color: "#f1f5f9",
    borderWidth: 1,
    borderColor: "#374151",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
});
