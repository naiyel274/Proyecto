import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";

export default function FormularioMedico({ route, navigation }) {
  const medicoEdit = route.params?.medico;

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [especialidadId, setEspecialidadId] = useState("");
  const [especialidades, setEspecialidades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEspecialidades();

    if (medicoEdit) {
      setNombre(medicoEdit.nombre);
      setApellido(medicoEdit.apellido);
      setEmail(medicoEdit.email);
      setTelefono(medicoEdit.telefono);
      setEspecialidadId(medicoEdit.especialidad_id || medicoEdit.especialidad?.id);
    }
  }, []);

  const fetchEspecialidades = async () => {
    try {
      const response = await axios.get("http://172.30.5.12:8000/api/especialidades");
      setEspecialidades(response.data);
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar las especialidades.");
    } finally {
      setLoading(false);
    }
  };

  const handleGuardar = async () => {
    if (!nombre || !apellido || !email || !telefono || !especialidadId) {
      Alert.alert("Campos requeridos", "Por favor completa todos los campos.");
      return;
    }

    const data = {
      nombre,
      apellido,
      email,
      telefono,
      especialidad_id: especialidadId,
    };

    try {
      if (medicoEdit) {
        await axios.put(`http://172.30.5.12:8000/api/medicos/${medicoEdit.id}`, data);
        Alert.alert("Éxito", "Médico actualizado.");
      } else {
        await axios.post("http://172.30.5.12:8000/api/medicos", data);
        Alert.alert("Éxito", "Médico creado.");
      }
      navigation.goBack();
    } catch (error) {
      console.error(error.response?.data);
      Alert.alert("Error", "No se pudo guardar el médico.");
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#10b981" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {medicoEdit ? "Editar Médico" : "Nuevo Médico"}
      </Text>

      <TextInput
        placeholder="Nombre"
        placeholderTextColor="#94a3b8"
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
      />
      <TextInput
        placeholder="Apellido"
        placeholderTextColor="#94a3b8"
        value={apellido}
        onChangeText={setApellido}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        placeholderTextColor="#94a3b8"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        placeholder="Teléfono"
        placeholderTextColor="#94a3b8"
        value={telefono}
        onChangeText={setTelefono}
        keyboardType="phone-pad"
        style={styles.input}
      />

      <Picker
        selectedValue={especialidadId}
        onValueChange={(itemValue) => setEspecialidadId(itemValue)}
        style={styles.picker}
        dropdownIconColor="#f1f5f9"
      >
        <Picker.Item label="Selecciona una especialidad" value="" color="#94a3b8" />
        {especialidades.map((esp) => (
          <Picker.Item key={esp.id} label={esp.nombre} value={esp.id} color="#f1f5f9" />
        ))}
      </Picker>

      <Button title="Guardar" onPress={handleGuardar} color="#10b981" />
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
    marginBottom: 16,
  },
  input: {
    borderColor: "#374151",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#1f2937", 
    color: "#f1f5f9",
  },
  picker: {
    borderWidth: 1,
    borderColor: "#374151",
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: "#1f2937",
    color: "#f1f5f9",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
