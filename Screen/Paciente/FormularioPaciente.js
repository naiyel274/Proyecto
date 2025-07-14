import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Platform,
} from "react-native";
import axios from "axios";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function FormularioPaciente({ route, navigation }) {
  const pacienteEdit = route.params?.paciente;

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState(new Date());
  const [mostrarCalendario, setMostrarCalendario] = useState(false);

  useEffect(() => {
    if (pacienteEdit) {
      setNombre(pacienteEdit.nombre);
      setApellido(pacienteEdit.apellido);
      setEmail(pacienteEdit.email);
      setTelefono(pacienteEdit.telefono);
      setFechaNacimiento(new Date(pacienteEdit.fecha_nacimiento));
    }
  }, [pacienteEdit]);

  const handleGuardar = async () => {
    if (!nombre || !apellido || !email || !telefono || !fechaNacimiento) {
      Alert.alert("Campos incompletos", "Por favor completa todos los campos.");
      return;
    }

    const data = {
      nombre,
      apellido,
      email,
      telefono,
      fecha_nacimiento: fechaNacimiento.toISOString().split("T")[0],
    };

    try {
      if (pacienteEdit) {
        await axios.put(
          `http://172.30.5.12:8000/api/pacientes/${pacienteEdit.id}`,
          data
        );
        Alert.alert("Éxito", "Paciente actualizado.");
      } else {
        await axios.post("http://172.30.5.12:8000/api/pacientes", data);
        Alert.alert("Éxito", "Paciente creado.");
      }
      navigation.goBack();
    } catch (error) {
      console.error(error.response?.data);
      Alert.alert("Error", "No se pudo guardar el paciente.");
    }
  };

  const mostrarPicker = () => {
    setMostrarCalendario(true);
  };

  const onChangeFecha = (event, selectedDate) => {
    if (Platform.OS === "android") setMostrarCalendario(false);
    if (selectedDate) setFechaNacimiento(selectedDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {pacienteEdit ? "Editar Paciente" : "Nuevo Paciente"}
      </Text>

      <TextInput
        placeholder="Nombre"
        placeholderTextColor="#9ca3af"
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
      />
      <TextInput
        placeholder="Apellido"
        placeholderTextColor="#9ca3af"
        value={apellido}
        onChangeText={setApellido}
        style={styles.input}
      />
      <TextInput
        placeholder="Correo electrónico"
        placeholderTextColor="#9ca3af"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        placeholder="Teléfono"
        placeholderTextColor="#9ca3af"
        value={telefono}
        onChangeText={setTelefono}
        keyboardType="phone-pad"
        style={styles.input}
      />

      <TouchableOpacity onPress={mostrarPicker} style={styles.input}>
        <Text style={{ color: "#f1f5f9" }}>
          {fechaNacimiento.toLocaleDateString()}
        </Text>
      </TouchableOpacity>

      {mostrarCalendario && (
        <DateTimePicker
          value={fechaNacimiento}
          mode="date"
          display="default"
          onChange={onChangeFecha}
          maximumDate={new Date()}
        />
      )}

      <Button title="Guardar" onPress={handleGuardar} color="#10b981" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#121212" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 16, color: "#f1f5f9" },
  input: {
    borderColor: "#374151",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    color: "#f1f5f9",
    backgroundColor: "#1f2937",
  },
});
