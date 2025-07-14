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

export default function ListarConsultorios() {
  const [consultorios, setConsultorios] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchConsultorios();
  }, []);

  const fetchConsultorios = async () => {
    try {
      const response = await axios.get("http://172.30.5.12:8000/api/consultorios");
      setConsultorios(response.data);
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar los consultorios.");
    } finally {
      setLoading(false);
    }
  };

  const eliminarConsultorio = async (id) => {
    Alert.alert("¿Eliminar consultorio?", "Esta acción no se puede deshacer.", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          try {
            await axios.delete(`http://172.30.5.12:8000/api/consultorios/${id}`);
            fetchConsultorios();
          } catch (error) {
            Alert.alert("Error", "No se pudo eliminar el consultorio.");
          }
        },
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.nombre}</Text>
        <Text style={styles.subtitle}>{item.direccion}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("FormularioConsultorio", { consultorio: item })}
        >
          <Ionicons name="create-outline" size={18} color="#10b981" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => eliminarConsultorio(item.id)}
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
        onPress={() => navigation.navigate("FormularioConsultorio")}
      >
        <Ionicons name="add-circle-outline" size={24} color="#3b82f6" />
        <Text style={styles.addText}>Nuevo Consultorio</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#10b981" />
      ) : consultorios.length === 0 ? (
        <Text style={styles.emptyText}>No hay consultorios registrados.</Text>
      ) : (
        <FlatList
          data={consultorios}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 16 }}
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
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#1f2937",
    borderRadius: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    color: "#f1f5f9",
  },
  subtitle: {
    fontSize: 14,
    color: "#94a3b8",
    marginTop: 4,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  actionButton: {
    padding: 8,
    backgroundColor: "#0f172a",
    borderRadius: 50,
  },
  emptyText: {
    color: "#64748b",
    fontSize: 16,
    textAlign: "center",
    marginTop: 40,
  },
});
