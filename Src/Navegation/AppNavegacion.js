import { NavigationContainer } from "@react-navigation/native";
import AuthNavegacion from "./AuthNavegacion";
import NavegacionPrincipal from "./NavegacionPrincipal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useRef, use } from "react";
import { ActivityIndicator, View, StyleSheet, AppState } from "react-native";

export default function AppNavegacion() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const appState = useRef(AppState.currentState);

  const loadToken = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      setUserToken(token);
    } catch (error) {
      console.error("Error al cargar el token desde AsyncStorage:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    loadToken(); 
  }, []);

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log(
          "La aplicación ha vuelto al primer plano, verificando el token..."
        );
        loadToken(); 
      }
      appState.current = nextAppState;
    };
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );
    return () => subscription.remove(); 
  }, []);

  useEffect(() => {
    if (!isLoading) {
        const interval = setInterval(() => {
            if (AppState.currentState === "active") {
                loadToken(); 
            }
        }, 2000);
      return () => clearInterval(interval); 
    }
  }, [isLoading]);

    if (isLoading) {
    return (
      <View style={Styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1976D2" />
      </View>
    );
    }

  return (
    <NavigationContainer>
      {userToken ? <NavegacionPrincipal /> : <AuthNavegacion />}
    </NavigationContainer>
  );
}



const Styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
});