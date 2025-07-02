import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    Dimensions
} from 'react-native';
import {
    MaterialCommunityIcons,
    FontAwesome5,
    Feather,
    Ionicons
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const itemWidth = (width / 2) - 30;

export default function InicioCitas() {
    const navigation = useNavigation();

    const navigateTo = (flowName) => {
        navigation.navigate(flowName);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Gestión de Citas</Text>
                    <Text style={styles.headerSubtitle}>Selecciona una opción para continuar</Text>
                </View>

                <View style={styles.gridContainer}>
                    <TouchableOpacity style={styles.gridItem} onPress={() => navigateTo('CitasFlow')}>
                        <MaterialCommunityIcons name="calendar-check" size={45} color="#1f2937" />
                        <Text style={styles.gridItemText}>Citas</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.gridItem} onPress={() => navigateTo('ConsultorioFlow')}>
                        <FontAwesome5 name="clinic-medical" size={40} color="#1f2937" />
                        <Text style={styles.gridItemText}>Consultorios</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.gridItem} onPress={() => navigateTo('EspecialidadFlow')}>
                        <Feather name="star" size={45} color="#1f2937" />
                        <Text style={styles.gridItemText}>Especialidades</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.gridItem} onPress={() => navigateTo('MedicoFlow')}>
                        <Ionicons name="medkit" size={45} color="#1f2937" />
                        <Text style={styles.gridItemText}>Médicos</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#ffffff', // Fondo blanco
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
        marginTop: 20,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#111827', // Gris oscuro
        marginBottom: 5,
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#6b7280', // Gris medio
        textAlign: 'center',
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        paddingHorizontal: 5,
    },
    gridItem: {
        width: itemWidth,
        height: itemWidth,
        backgroundColor: '#f3f4f6', // Gris muy claro
        borderRadius: 15,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    gridItemText: {
        marginTop: 12,
        fontSize: 16,
        fontWeight: '600',
        color: '#1f2937', // Gris oscuro
        textAlign: 'center',
    },
});
