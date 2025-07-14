import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ListarMedicos() {
  const [medicos, setMedicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchMedicos();
  }, []);

  const fetchMedicos = async () => {
    try {
      const response = await axios.get("http://172.30.5.12:8000/api/medicos");
      setMedicos(response.data);
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar los médicos.");
    } finally {
      setLoading(false);
    }
  };

  const eliminarMedico = (id) => {
    Alert.alert("¿Eliminar médico?", "Esta acción no se puede deshacer.", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          try {
            await axios.delete(`http://172.30.5.12:8000/api/medicos/${id}`);
            fetchMedicos();
          } catch (error) {
            Alert.alert("Error", "No se pudo eliminar el médico.");
          }
        },
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.nombre} {item.apellido}</Text>
        <Text style={styles.info}>Especialidad: {item.especialidad?.nombre || "N/A"}</Text>
        <Text style={styles.info}>Email: {item.email}</Text>
        <Text style={styles.info}>Teléfono: {item.telefono}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("FormularioMedico", { medico: item })}
        >
          <Ionicons name="create-outline" size={18} color="#10b981" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => eliminarMedico(item.id)}
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
        onPress={() => navigation.navigate("FormularioMedico")}
      >
        <Ionicons name="add-circle-outline" size={24} color="#3b82f6" />
        <Text style={styles.addText}>Nuevo Médico</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#10b981" />
      ) : medicos.length === 0 ? (
        <Text style={styles.emptyText}>No hay médicos registrados.</Text>
      ) : (
        <FlatList
          data={medicos}
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
  infoContainer: {
    paddingRight: 12,
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
