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

export default function ListarPacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchPacientes();
  }, []);

  const fetchPacientes = async () => {
    try {
      const response = await axios.get("http://172.30.5.12:8000/api/pacientes");
      setPacientes(response.data);
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar los pacientes.");
    } finally {
      setLoading(false);
    }
  };

  const eliminarPaciente = async (id) => {
    Alert.alert("¿Eliminar paciente?", "Esta acción no se puede deshacer.", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          try {
            await axios.delete(`http://172.30.5.12:8000/api/pacientes/${id}`);
            fetchPacientes();
          } catch (error) {
            Alert.alert("Error", "No se pudo eliminar el paciente.");
          }
        },
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>
          {item.nombre} {item.apellido}
        </Text>
        <Text style={styles.info}>Email: {item.email}</Text>
        <Text style={styles.info}>Teléfono: {item.telefono}</Text>
        <Text style={styles.info}>Nacimiento: {item.fecha_nacimiento}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("FormularioPaciente", { paciente: item })}
        >
          <Ionicons name="create-outline" size={18} color="#10b981" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => eliminarPaciente(item.id)}
        >
          <Ionicons name="trash-outline" size={18} color="#ef4444" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("FormularioPaciente")}
      >
        <Ionicons name="add-circle-outline" size={24} color="#3b82f6" />
        <Text style={styles.addText}>Nuevo Paciente</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#10b981" />
      ) : pacientes.length === 0 ? (
        <Text style={styles.emptyText}>No hay pacientes registrados.</Text>
      ) : (
        <FlatList
          data={pacientes}
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
  item: {
    backgroundColor: "#1f2937",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
  },
  infoContainer: {
    paddingRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#f1f5f9",
  },
  info: {
    fontSize: 14,
    color: "#94a3b8",
    marginTop: 2,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
    gap: 12,
  },
  actionButton: {
    padding: 8,
    backgroundColor: "#0f172a",
    borderRadius: 50,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  addText: {
    fontSize: 16,
    color: "#3b82f6",
    fontWeight: "600",
  },
  emptyText: {
    color: "#64748b",
    fontSize: 16,
    textAlign: "center",
    marginTop: 40,
  },
});
