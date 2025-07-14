import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Button,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Platform,
  TextInput,
} from "react-native";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

export default function FormularioCita({ route, navigation }) {
  const citaEdit = route.params?.cita;

  const [pacienteId, setPacienteId] = useState(null);
  const [medicoId, setMedicoId] = useState(null);
  const [consultorioId, setConsultorioId] = useState(null);
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [estado, setEstado] = useState("pendiente");
  const [motivo, setMotivo] = useState("");

  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [consultorios, setConsultorios] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    cargarDatosIniciales();
  }, []);

  useEffect(() => {
    if (citaEdit) {
      setPacienteId(citaEdit.paciente_id);
      setMedicoId(citaEdit.medico_id);
      setConsultorioId(citaEdit.consultorio_id);
      setFecha(citaEdit.fecha);
      setHora(citaEdit.hora);
      setEstado(citaEdit.estado);
      setMotivo(citaEdit.motivo || "");
    }
  }, [citaEdit]);

  const cargarDatosIniciales = async () => {
    try {
      const [resPacientes, resMedicos, resConsultorios] = await Promise.all([
        axios.get("http://172.30.5.12:8000/api/pacientes"),
        axios.get("http://172.30.5.12:8000/api/medicos"),
        axios.get("http://172.30.5.12:8000/api/consultorios"),
      ]);

      setPacientes(resPacientes.data);
      setMedicos(resMedicos.data);
      setConsultorios(resConsultorios.data);
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar los datos iniciales.");
    } finally {
      setLoading(false);
    }
  };

  const handleGuardar = async () => {
    if (!pacienteId || !medicoId || !consultorioId || !fecha || !hora || !estado) {
      Alert.alert("Campos incompletos", "Todos los campos obligatorios deben estar completos.");
      return;
    }

    const datos = {
      paciente_id: pacienteId,
      medico_id: medicoId,
      consultorio_id: consultorioId,
      fecha,
      hora,
      estado,
      motivo,
    };

    try {
      if (citaEdit) {
        await axios.put(`http://172.30.5.12:8000/api/citas/${citaEdit.id}`, datos);
        Alert.alert("Éxito", "Cita actualizada.");
      } else {
        await axios.post("http://172.30.5.12:8000/api/citas", datos);
        Alert.alert("Éxito", "Cita creada.");
      }

      navigation.goBack();
    } catch (error) {
      console.error("Error al guardar cita:", error.response?.data);
      Alert.alert("Error", "No se pudo guardar la cita.");
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#10b981" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
      <Text style={styles.title}>{citaEdit ? "Editar Cita" : "Nueva Cita"}</Text>

      {/* Paciente */}
      <Text style={styles.label}>Paciente</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={pacienteId}
          onValueChange={setPacienteId}
          dropdownIconColor="#f1f5f9"
          style={styles.picker}
        >
          <Picker.Item label="Selecciona un paciente" value={null} />
          {pacientes.map((p) => (
            <Picker.Item key={p.id} label={p.nombre} value={p.id} />
          ))}
        </Picker>
      </View>

      {/* Médico */}
      <Text style={styles.label}>Médico</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={medicoId}
          onValueChange={setMedicoId}
          dropdownIconColor="#f1f5f9"
          style={styles.picker}
        >
          <Picker.Item label="Selecciona un médico" value={null} />
          {medicos.map((m) => (
            <Picker.Item key={m.id} label={m.nombre} value={m.id} />
          ))}
        </Picker>
      </View>

      {/* Consultorio */}
      <Text style={styles.label}>Consultorio</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={consultorioId}
          onValueChange={setConsultorioId}
          dropdownIconColor="#f1f5f9"
          style={styles.picker}
        >
          <Picker.Item label="Selecciona un consultorio" value={null} />
          {consultorios.map((c) => (
            <Picker.Item key={c.id} label={c.nombre} value={c.id} />
          ))}
        </Picker>
      </View>

      {/* Fecha */}
      <Text style={styles.label}>Fecha</Text>
      <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.text}>{fecha ? moment(fecha).format("YYYY-MM-DD") : "Selecciona una fecha"}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          mode="date"
          value={fecha ? new Date(fecha) : new Date()}
          display={Platform.OS === "android" ? "calendar" : "default"}
          minimumDate={new Date()}
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setFecha(moment(selectedDate).format("YYYY-MM-DD"));
            }
          }}
        />
      )}

      {/* Hora */}
      <Text style={styles.label}>Hora</Text>
      <TouchableOpacity style={styles.input} onPress={() => setShowTimePicker(true)}>
        <Text style={styles.text}>{hora ? hora : "Selecciona una hora"}</Text>
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          mode="time"
          value={hora ? moment(hora, "HH:mm").toDate() : new Date()}
          display={Platform.OS === "android" ? "clock" : "default"}
          onChange={(event, selectedTime) => {
            setShowTimePicker(false);
            if (selectedTime) {
              setHora(moment(selectedTime).format("HH:mm"));
            }
          }}
        />
      )}

      {/* Estado */}
      <Text style={styles.label}>Estado</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={estado}
          onValueChange={setEstado}
          dropdownIconColor="#f1f5f9"
          style={styles.picker}
        >
          <Picker.Item label="Pendiente" value="pendiente" />
          <Picker.Item label="Confirmada" value="confirmada" />
          <Picker.Item label="Cancelada" value="cancelada" />
          <Picker.Item label="Completada" value="completada" />
        </Picker>
      </View>

      {/* Motivo */}
      <TextInput
        placeholder="Motivo (opcional)"
        placeholderTextColor="#9ca3af"
        value={motivo}
        onChangeText={setMotivo}
        style={styles.input}
        multiline
        numberOfLines={3}
      />

      <Button title="Guardar Cita" onPress={handleGuardar} color="#10b981" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#121212", 
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#f1f5f9", 
    marginBottom: 16,
  },
  label: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "600",
    color: "#e2e8f0",
  },
  input: {
    borderColor: "#374151",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#1f2937", 
    color: "#f1f5f9",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#374151",
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: "#1f2937",
  },
  picker: {
    color: "#f1f5f9",
  },
  text: {
    color: "#f1f5f9",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
