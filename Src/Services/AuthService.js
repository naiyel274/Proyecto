// AuthService.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./conexion";

// Función para iniciar sesión
export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/login", { email, password });
    const { token } = response.data;

    await AsyncStorage.setItem("userToken", token);

    return { success: true, token };
  } catch (error) {
    console.error(
      "Error al iniciar sesión:",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response?.data?.message || "Error de conexión",
    };
  }
};

// Función para cerrar sesión
export const logoutUser = async () => {
  try {
    await AsyncStorage.removeItem("userToken");
    console.log("Token eliminado correctamente");
    return true;
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    return false;
  }
};