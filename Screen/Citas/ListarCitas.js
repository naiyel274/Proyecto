import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function ListarCitas() {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchCitas();
  }, []);

  const fetchCitas = async () => {
    try {
      const response = await axios.get("http://172.30.5.12:8000/api/citas");
      setCitas(response.data);
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar las citas.");
    } finally {
      setLoading(false);
    }
  };

  const eliminarCita = (id) => {
    Alert.alert("¿Eliminar cita?", "Esta acción no se puede deshacer.", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          try {
            await axios.delete(`http://172.30.5.12:8000/api/citas/${id}`);
            fetchCitas();
          } catch (error) {
            Alert.alert("Error", "No se pudo eliminar la cita.");
          }
        },
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View>
        <Text style={styles.title}>
          Paciente: {item.paciente?.nombre || "Desconocido"}
        </Text>
        <Text style={styles.subtitle}>
          Médico: {item.medico?.nombre || "Desconocido"} (
          {item.medico?.especialidad?.nombre || "Sin especialidad"})
        </Text>
        <Text style={styles.subtitle}>
          Consultorio: {item.consultorio?.nombre || "N/A"}
        </Text>
        <Text style={styles.subtitle}>
          Fecha: {item.fecha} - Hora: {item.hora}
        </Text>
        <Text style={styles.estado}>Estado: {item.estado}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={() => navigation.navigate("FormularioCita", { cita: item })}
        >
          <Ionicons name="create-outline" size={24} color="#10b981" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => eliminarCita(item.id)}>
          <Ionicons name="trash-outline" size={24} color="#ef4444" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("FormularioCita")}
      >
        <Ionicons name="add-circle-outline" size={30} color="#60a5fa" />
        <Text style={styles.addText}>Nueva Cita</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#10b981" />
      ) : (
        <FlatList
          data={citas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#121212", 
  },
  itemContainer: {
    backgroundColor: "#1f2937", 
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#f1f5f9", 
  },
  subtitle: {
    fontSize: 14,
    color: "#cbd5e1", 
    marginTop: 2,
  },
  estado: {
    fontSize: 14,
    color: "#a78bfa", 
    marginTop: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
    gap: 16,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  addText: {
    fontSize: 16,
    color: "#60a5fa", 
  },
});
