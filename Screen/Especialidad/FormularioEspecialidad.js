import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

export default function FormularioEspecialidad({ route, navigation }) {
  const especialidadEdit = route.params?.especialidad;
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    if (especialidadEdit) {
      setNombre(especialidadEdit.nombre);
      setDescripcion(especialidadEdit.descripcion || "");
    }
  }, [especialidadEdit]);

  const handleGuardar = async () => {
    if (!nombre) {
      Alert.alert("Campos requeridos", "El nombre es obligatorio.");
      return;
    }

    try {
      if (especialidadEdit) {
        await axios.put(
          `http://172.30.5.12:8000/api/especialidades/${especialidadEdit.id}`,
          { nombre, descripcion }
        );
        Alert.alert("Actualizado", "Especialidad actualizada con éxito.");
      } else {
        await axios.post("http://172.30.5.12:8000/api/especialidades", {
          nombre,
          descripcion,
        });
        Alert.alert("Creado", "Especialidad registrada con éxito.");
      }
      navigation.goBack();
    } catch (error) {
      console.error(error.response?.data);
      Alert.alert("Error", "No se pudo guardar la especialidad.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {especialidadEdit ? "Editar Especialidad" : "Nueva Especialidad"}
      </Text>
      <TextInput
        placeholder="Nombre"
        placeholderTextColor="#9ca3af"
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
      />
      <TextInput
        placeholder="Descripción"
        placeholderTextColor="#9ca3af"
        value={descripcion}
        onChangeText={setDescripcion}
        style={[styles.input, styles.textarea]}
        multiline
        numberOfLines={3}
      />
      <TouchableOpacity style={styles.button} onPress={handleGuardar}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#121212",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#f1f5f9",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#1f2937",
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    color: "#f1f5f9",
    borderWidth: 1,
    borderColor: "#374151",
    marginBottom: 16,
  },
  textarea: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#10b981",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
