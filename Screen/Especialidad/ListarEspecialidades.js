import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ListarEspecialidades() {
  const [especialidades, setEspecialidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchEspecialidades();
  }, []);

  const fetchEspecialidades = async () => {
    try {
      const response = await axios.get("http://172.30.5.12:8000/api/especialidades");
      setEspecialidades(response.data);
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar las especialidades.");
    } finally {
      setLoading(false);
    }
  };

  const eliminarEspecialidad = (id) => {
    Alert.alert("¿Eliminar?", "Esta acción no se puede deshacer.", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          try {
            await axios.delete(`http://172.30.5.12:8000/api/especialidades/${id}`);
            fetchEspecialidades();
          } catch (error) {
            Alert.alert("Error", "No se pudo eliminar la especialidad.");
          }
        },
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.infoContainer}>
        <Text style={styles.nombre} numberOfLines={1} ellipsizeMode="tail">
          {item.nombre}
        </Text>
        {item.descripcion ? (
          <Text style={styles.descripcion} numberOfLines={1} ellipsizeMode="tail">
            {item.descripcion}
          </Text>
        ) : null}
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}
          onPress={() => navigation.navigate("FormularioEspecialidad", { especialidad: item })}
        >
          <Ionicons name="create-outline" size={18} color="#10b981" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => eliminarEspecialidad(item.id)}>
          <Ionicons name="trash-outline" size={18} color="#ef4444" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("FormularioEspecialidad")}
      >
        <Ionicons name="add-circle-outline" size={24} color="#3b82f6" />
        <Text style={styles.addText}>Nueva Especialidad</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#10b981" />
      ) : especialidades.length === 0 ? (
        <Text style={styles.emptyText}>No hay especialidades registradas.</Text>
      ) : (
        <FlatList
          data={especialidades}
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
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#1f2937",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    alignItems: "center",
    elevation: 2,
  },
  nombre: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#f1f5f9",
  },
  descripcion: {
    fontSize: 14,
    color: "#94a3b8",
    marginTop: 4,
  },
  infoContainer: {
    flex: 1,
    paddingRight: 12,
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
