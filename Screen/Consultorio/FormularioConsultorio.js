import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

export default function FormularioConsultorio({ route, navigation }) {
  const consultorioEdit = route.params?.consultorio;
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");

  useEffect(() => {
    if (consultorioEdit) {
      setNombre(consultorioEdit.nombre);
      setDireccion(consultorioEdit.direccion);
    }
  }, [consultorioEdit]);

  const handleGuardar = async () => {
    if (!nombre.trim() || !direccion.trim()) {
      Alert.alert("Campos incompletos", "Por favor completa todos los campos.");
      return;
    }

    try {
      if (consultorioEdit) {
        await axios.put(
          `http://172.30.5.12:8000/api/consultorios/${consultorioEdit.id}`,
          { nombre, direccion }
        );
        Alert.alert("Éxito", "Consultorio actualizado.");
      } else {
        await axios.post("http://172.30.5.12:8000/api/consultorios", {
          nombre,
          direccion,
        });
        Alert.alert("Éxito", "Consultorio creado.");
      }

      navigation.goBack();
    } catch (error) {
      const mensaje =
        error.response?.data?.message ||
        JSON.stringify(error.response?.data) ||
        error.message ||
        "Error desconocido";

      console.error("Error al guardar:", mensaje);
      Alert.alert("Error al guardar", mensaje);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {consultorioEdit ? "Editar Consultorio" : "Nuevo Consultorio"}
      </Text>

      <View style={styles.field}>
        <Text style={styles.label}>Nombre del consultorio</Text>
        <TextInput
          placeholder="Ej: Consultorio Norte"
          placeholderTextColor="#94a3b8"
          value={nombre}
          onChangeText={setNombre}
          style={styles.input}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Dirección</Text>
        <TextInput
          placeholder="Ej: Calle 123 #45-67"
          placeholderTextColor="#94a3b8"
          value={direccion}
          onChangeText={setDireccion}
          style={styles.input}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleGuardar}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#121212",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#f1f5f9",
    marginBottom: 20,
    textAlign: "center",
  },
  field: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    color: "#cbd5e1",
    marginBottom: 6,
  },
  input: {
    borderColor: "#334155",
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    backgroundColor: "#1e293b",
    color: "#f1f5f9",
    fontSize: 16,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#10b981",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
