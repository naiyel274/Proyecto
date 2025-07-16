import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import BottonComponent from "../../components/BottonComponent";
import { useState } from "react";
import { loginUser } from "../../Src/Services/AuthService";
import * as Notifications from "expo-notifications";


export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    try{
      const result = await loginUser(email, password);
      if (result.success) {
         await Notifications.scheduleNotificationAsync({
        content: {
          title: "Inicio de sesión exitoso",
          body: "Bienvenido de nuevo a la app 🎉",
        },
        trigger: { seconds: 2 }, 
      });
        Alert.alert("Éxito", "Inicio de sesión exitoso", [
          {text: "OK", onPress: () => console.log("Login exitoso, redirigiendo automanticanente....")},

        ]);
      }else {
        Alert.alert("Error de Login", result.message || "ocurrio un error al iniciar sesión", );
      }
    }catch (error) {
      console.error("Error inesperado en login:", error);
      Alert.alert("Error", "Ocurrió un error inesperado al intentar inciar secion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo Electronico"
                placeholderTextColor="#9ca3af"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!loading}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
                placeholderTextColor="#9ca3af"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        editable={!loading}
      />
      <BottonComponent
        title="Iniciar Sesión"
        onPress={handleLogin}
        disabled={!loading}
      />


      <BottonComponent
        title="¿No tienes cuenta? Registrate"
        onPress={() => navigation.navigate("Registro")}
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
    backgroundColor: "#000000", 
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: "#ffffff",
  },
  input: {
    height: 50,
    borderColor: "#4b5563",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    color: "#ffffff",
    backgroundColor: "#1f2937",
  },
});