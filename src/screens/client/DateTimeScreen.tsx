import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useAppStore } from '../../store/useAppStore';
import { Header } from '../../components/Header';

interface DateTimeScreenProps {
  onContinue: () => void;
  onBack: () => void;
}

const AVAILABLE_TIMES = [
  '09:00',
  '10:30',
  '12:00',
  '14:00',
  '15:30',
  '17:00',
];

export const DateTimeScreen: React.FC<DateTimeScreenProps> = ({
  onContinue,
  onBack,
}) => {
  const {
    selectedProfessional,
    selectedDate,
    selectedTime,
    clientName,
    clientPhone,
    setSelectedDate,
    setSelectedTime,
    setClientInfo,
  } = useAppStore();

  const [name, setName] = useState(clientName || '');
  const [phone, setPhone] = useState(clientPhone || '');
  const [errorMessage, setErrorMessage] = useState('');

  // Available days from selected pro or fallback dates
  const dates = selectedProfessional?.availableDays || [
    '2026-10-05',
    '2026-10-06',
    '2026-10-07',
    '2026-10-08',
  ];

  const handleNext = () => {
    if (!selectedDate) {
      setErrorMessage('Por favor selecciona una fecha.');
      return;
    }
    if (!selectedTime) {
      setErrorMessage('Por favor selecciona un horario.');
      return;
    }
    if (!name.trim()) {
      setErrorMessage('Por favor ingresa tu nombre completo.');
      return;
    }
    if (!phone.trim()) {
      setErrorMessage('Por favor ingresa tu número telefónico.');
      return;
    }

    setErrorMessage('');
    setClientInfo(name.trim(), phone.trim());
    onContinue();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="4. Fecha, Hora y Datos" showBack onBack={onBack} />
      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.subtitle} testID="screen-datetime-title">
          Selecciona la fecha y horario para tu cita, e ingresa tus datos de contacto:
        </Text>

        {/* Section 1: Date Selection */}
        <Text style={styles.sectionTitle}>1. Selecciona el Día</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
        >
          {dates.map((dateStr) => {
            const isSelected = selectedDate === dateStr;
            return (
              <TouchableOpacity
                key={dateStr}
                testID={`date-chip-${dateStr}`}
                style={[
                  styles.dateChip,
                  isSelected && styles.dateChipSelected,
                ]}
                onPress={() => setSelectedDate(dateStr)}
              >
                <Text
                  style={[
                    styles.dateChipText,
                    isSelected && styles.dateChipTextSelected,
                  ]}
                >
                  📅 {dateStr}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Section 2: Time Slots */}
        <Text style={styles.sectionTitle}>2. Selecciona la Hora</Text>
        <View style={styles.timeGrid}>
          {AVAILABLE_TIMES.map((timeStr) => {
            const isSelected = selectedTime === timeStr;
            return (
              <TouchableOpacity
                key={timeStr}
                testID={`time-chip-${timeStr}`}
                style={[
                  styles.timeChip,
                  isSelected && styles.timeChipSelected,
                ]}
                onPress={() => setSelectedTime(timeStr)}
              >
                <Text
                  style={[
                    styles.timeChipText,
                    isSelected && styles.timeChipTextSelected,
                  ]}
                >
                  ⏰ {timeStr}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Section 3: Client Info Input */}
        <Text style={styles.sectionTitle}>3. Tus Datos Personales</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nombre completo *</Text>
          <TextInput
            testID="input-client-name"
            style={styles.input}
            placeholder="Ej. Juan Pérez"
            placeholderTextColor="#64748b"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Teléfono de contacto *</Text>
          <TextInput
            testID="input-client-phone"
            style={styles.input}
            placeholder="Ej. 55 1234 5678"
            placeholderTextColor="#64748b"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        {errorMessage ? (
          <View style={styles.errorBanner} testID="error-validation-message">
            <Text style={styles.errorText}>⚠️ {errorMessage}</Text>
          </View>
        ) : null}

        {/* Submit Button */}
        <TouchableOpacity
          testID="btn-continue-confirmation"
          style={styles.continueBtn}
          onPress={handleNext}
        >
          <Text style={styles.continueBtnText}>Revisar Reserva →</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090d16',
  },
  body: {
    flex: 1,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingTop: 16,
    paddingBottom: 32,
  },
  subtitle: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#38bdf8',
    marginTop: 12,
    marginBottom: 10,
  },
  horizontalScroll: {
    marginBottom: 16,
  },
  dateChip: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  dateChipSelected: {
    backgroundColor: '#0284c7',
    borderColor: '#38bdf8',
  },
  dateChipText: {
    color: '#cbd5e1',
    fontWeight: '600',
    fontSize: 13,
  },
  dateChipTextSelected: {
    color: '#ffffff',
    fontWeight: '700',
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  timeChip: {
    width: '48%',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  timeChipSelected: {
    backgroundColor: '#0284c7',
    borderColor: '#38bdf8',
  },
  timeChipText: {
    color: '#cbd5e1',
    fontWeight: '600',
    fontSize: 14,
  },
  timeChipTextSelected: {
    color: '#ffffff',
    fontWeight: '700',
  },
  inputContainer: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 16,
  },
  label: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
    marginTop: 6,
  },
  input: {
    backgroundColor: '#0f172a',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: '#f8fafc',
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#334155',
  },
  errorBanner: {
    backgroundColor: '#7f1d1d44',
    borderColor: '#ef444488',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    color: '#fca5a5',
    fontSize: 13,
    fontWeight: '600',
  },
  continueBtn: {
    backgroundColor: '#10b981',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  continueBtnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});
