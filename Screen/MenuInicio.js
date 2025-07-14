import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Animated,
} from "react-native";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  Feather,
  Ionicons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const itemWidth = width / 2 - 30;

export default function InicioCitas() {
  const navigation = useNavigation();

  const navigateTo = (flowName) => {
    navigation.navigate(flowName);
  };

  const AnimatedButton = ({ onPress, icon, label }) => {
    const scale = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
      Animated.spring(scale, {
        toValue: 0.93,
        useNativeDriver: true,
        speed: 30,
        bounciness: 8,
      }).start();
    };

    const handlePressOut = () => {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        speed: 30,
        bounciness: 8,
      }).start();
    };

    return (
      <TouchableWithoutFeedback
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
      >
        <Animated.View style={[styles.gridItem, { transform: [{ scale }] }]}>
          <View style={styles.iconContainer}>{icon}</View>
          <Text style={styles.gridItemText}>{label}</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Gestión de Citas</Text>
          <Text style={styles.headerSubtitle}>
            Selecciona una opción para continuar
          </Text>
        </View>

        <View style={styles.gridContainer}>
          <AnimatedButton
            onPress={() => navigateTo("CitasFlow")}
            icon={
              <MaterialCommunityIcons
                name="calendar-check"
                size={30}
                color="#facc15"
              />
            }
            label="Citas"
          />
          <AnimatedButton
            onPress={() => navigateTo("ConsultorioFlow")}
            icon={
              <FontAwesome5 name="clinic-medical" size={26} color="#10b981" />
            }
            label="Consultorios"
          />
          <AnimatedButton
            onPress={() => navigateTo("EspecialidadFlow")}
            icon={<Feather name="star" size={30} color="#f472b6" />}
            label="Especialidades"
          />
          <AnimatedButton
            onPress={() => navigateTo("MedicoFlow")}
            icon={<Ionicons name="medkit" size={30} color="#60a5fa" />}
            label="Médicos"
          />
          <AnimatedButton
            onPress={() => navigateTo("PacienteFlow")}
            icon={
              <Ionicons
                name="people-circle-outline"
                size={30}
                color="#f87171"
              />
            }
            label="Pacientes"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#121212",
  },
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
    marginTop: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#f1f5f9",
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#94a3b8",
    textAlign: "center",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingHorizontal: 5,
  },
  gridItem: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 12,
    width: itemWidth,
  },
  iconContainer: {
    backgroundColor: "#0f172a",
    padding: 18,
    borderRadius: 100,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  gridItemText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#f1f5f9",
    textAlign: "center",
  },
});
