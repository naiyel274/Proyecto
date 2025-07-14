import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import CustomButton from "../../components/BottonComponent"; 
import React, { useState } from "react";
import axios from "axios";

export default function RegistroScreen({ navigation }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState(""); 
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");

  const handleRegister = async () => {
    if (!nombre || !email || !password || !confirmarPassword) {
      Alert.alert("Campos incompletos", "Por favor completa todos los campos.");
      return;
    }

    if (password !== confirmarPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await axios.post("http://172.30.5.12:8000/api/register", {
        name: nombre,
        email: email,
        password: password,
      });

      if (response.data.success) {
        Alert.alert("Éxito", "Usuario registrado correctamente", [
          { text: "OK", onPress: () => navigation.replace("Login") },
        ]);
      } else {
        Alert.alert("Error", response.data.message || "No se pudo registrar.");
      }
    } catch (error) {
      console.error("Error en registro:", error);
      Alert.alert(
        "Error",
        error.response?.data?.message || "No se pudo conectar con el servidor."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre Completo"
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Teléfono (opcional)"
        value={telefono}
        onChangeText={setTelefono}
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirmar Contraseña"
        secureTextEntry
        value={confirmarPassword}
        onChangeText={setConfirmarPassword}
      />

      <CustomButton title="Registrarse" onPress={handleRegister} />
      <CustomButton
        title="Iniciar Sesión"
        onPress={() => navigation.navigate("Login")}
        style={{ backgroundColor: "#3b82f6" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
});
