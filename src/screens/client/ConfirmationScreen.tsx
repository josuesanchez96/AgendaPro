import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useAppStore } from '../../store/useAppStore';
import { Header } from '../../components/Header';
import { Appointment } from '../../types';

interface ConfirmationScreenProps {
  onFinishBooking: () => void;
  onGoToDashboard: () => void;
  onBack: () => void;
}

export const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({
  onFinishBooking,
  onGoToDashboard,
  onBack,
}) => {
  const {
    selectedLocation,
    selectedProfessional,
    selectedService,
    selectedDate,
    selectedTime,
    clientName,
    clientPhone,
    addAppointment,
    resetDraft,
  } = useAppStore();

  const [createdAppointment, setCreatedAppointment] =
    useState<Appointment | null>(null);

  const handleConfirm = () => {
    if (
      !selectedLocation ||
      !selectedProfessional ||
      !selectedService ||
      !selectedDate ||
      !selectedTime
    ) {
      return;
    }

    const appointment = addAppointment({
      locationId: selectedLocation.id,
      locationName: selectedLocation.name,
      professionalId: selectedProfessional.id,
      professionalName: selectedProfessional.name,
      professionalAvatar: selectedProfessional.avatar,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      servicePrice: selectedService.price,
      clientName: clientName,
      clientPhone: clientPhone,
      date: selectedDate,
      time: selectedTime,
      status: 'CONFIRMED',
    });

    setCreatedAppointment(appointment);
  };

  const handleNewBooking = () => {
    resetDraft();
    onFinishBooking();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={createdAppointment ? '¡Cita Confirmada!' : '5. Resumen de Cita'}
        showBack={!createdAppointment}
        onBack={onBack}
      />
      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.scrollContent}
      >
        {createdAppointment ? (
          /* Success View */
          <View style={styles.successContainer}>
            <View style={styles.successIconBadge}>
              <Text style={styles.successIcon}>🎉</Text>
            </View>

            <Text style={styles.successTitle} testID="confirmation-success-msg">
              ¡Tu cita ha sido agendada con éxito!
            </Text>
            <Text style={styles.successSubtitle}>
              Se ha generado tu ticket con ID #{createdAppointment.id}
            </Text>

            {/* Ticket Card */}
            <View style={styles.ticketCard} testID="created-appointment-ticket">
              <View style={styles.ticketRow}>
                <Text style={styles.ticketLabel}>Código:</Text>
                <Text style={styles.ticketValue} testID="ticket-id">
                  #{createdAppointment.id}
                </Text>
              </View>

              <View style={styles.ticketDivider} />

              <View style={styles.ticketRow}>
                <Text style={styles.ticketLabel}>Sede:</Text>
                <Text style={styles.ticketValueText} testID="ticket-location">
                  {createdAppointment.locationName}
                </Text>
              </View>

              <View style={styles.ticketRow}>
                <Text style={styles.ticketLabel}>Profesional:</Text>
                <Text style={styles.ticketValueText} testID="ticket-professional">
                  {createdAppointment.professionalAvatar}{' '}
                  {createdAppointment.professionalName}
                </Text>
              </View>

              <View style={styles.ticketRow}>
                <Text style={styles.ticketLabel}>Servicio:</Text>
                <Text style={styles.ticketValueText} testID="ticket-service">
                  {createdAppointment.serviceName} (${createdAppointment.servicePrice} MXN)
                </Text>
              </View>

              <View style={styles.ticketRow}>
                <Text style={styles.ticketLabel}>Fecha & Hora:</Text>
                <Text style={styles.ticketValueText} testID="ticket-date-time">
                  📅 {createdAppointment.date} a las ⏰ {createdAppointment.time}
                </Text>
              </View>

              <View style={styles.ticketRow}>
                <Text style={styles.ticketLabel}>Cliente:</Text>
                <Text style={styles.ticketValueText} testID="ticket-client">
                  👤 {createdAppointment.clientName} ({createdAppointment.clientPhone})
                </Text>
              </View>
            </View>

            <TouchableOpacity
              testID="btn-go-to-dashboard"
              style={styles.dashboardBtn}
              onPress={onGoToDashboard}
            >
              <Text style={styles.dashboardBtnText}>
                Ver Cita en Dashboard Profesional →
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              testID="btn-new-booking"
              style={styles.secondaryBtn}
              onPress={handleNewBooking}
            >
              <Text style={styles.secondaryBtnText}>
                Agendar otra cita
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          /* Draft Confirmation View */
          <View>
            <Text style={styles.subtitle} testID="screen-confirmation-title">
              Revisa que toda la información de tu reserva sea correcta antes de confirmar:
            </Text>

            <View style={styles.summaryCard} testID="booking-summary-card">
              <View style={styles.summaryItem}>
                <Text style={styles.itemLabel}>📍 SEDE</Text>
                <Text style={styles.itemTitle} testID="summary-location-name">
                  {selectedLocation?.name}
                </Text>
                <Text style={styles.itemSub}>{selectedLocation?.address}</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.summaryItem}>
                <Text style={styles.itemLabel}>👤 PROFESIONAL</Text>
                <Text style={styles.itemTitle} testID="summary-professional-name">
                  {selectedProfessional?.avatar} {selectedProfessional?.name}
                </Text>
                <Text style={styles.itemSub}>{selectedProfessional?.specialty}</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.summaryItem}>
                <Text style={styles.itemLabel}>💆 SERVICIO</Text>
                <Text style={styles.itemTitle} testID="summary-service-name">
                  {selectedService?.name}
                </Text>
                <Text style={styles.priceHighlight} testID="summary-service-price">
                  ${selectedService?.price} MXN ({selectedService?.durationMinutes} min)
                </Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.summaryItem}>
                <Text style={styles.itemLabel}>📅 FECHA Y HORA</Text>
                <Text style={styles.itemTitle} testID="summary-date-time">
                  {selectedDate} a las {selectedTime} hrs
                </Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.summaryItem}>
                <Text style={styles.itemLabel}>📱 DATOS DEL CLIENTE</Text>
                <Text style={styles.itemTitle} testID="summary-client-name">
                  {clientName}
                </Text>
                <Text style={styles.itemSub} testID="summary-client-phone">
                  Teléfono: {clientPhone}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              testID="btn-confirm-booking"
              style={styles.confirmBtn}
              onPress={handleConfirm}
            >
              <Text style={styles.confirmBtnText}>
                ✓ Confirmar y Registrar Cita
              </Text>
            </TouchableOpacity>
          </View>
        )}
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
    paddingBottom: 36,
  },
  subtitle: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 16,
  },
  summaryCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 20,
  },
  summaryItem: {
    marginVertical: 4,
  },
  itemLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#38bdf8',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#f8fafc',
  },
  itemSub: {
    fontSize: 13,
    color: '#94a3b8',
    marginTop: 2,
  },
  priceHighlight: {
    fontSize: 15,
    fontWeight: '700',
    color: '#10b981',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#334155',
    marginVertical: 12,
  },
  confirmBtn: {
    backgroundColor: '#10b981',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 5,
  },
  confirmBtnText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
  },
  /* Success Styles */
  successContainer: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  successIconBadge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#064e3b',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#10b981',
  },
  successIcon: {
    fontSize: 36,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#10b981',
    textAlign: 'center',
    marginBottom: 6,
  },
  successSubtitle: {
    fontSize: 13,
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 20,
  },
  ticketCard: {
    width: '100%',
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#10b98155',
    marginBottom: 20,
  },
  ticketRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  ticketLabel: {
    fontSize: 13,
    color: '#94a3b8',
    fontWeight: '600',
  },
  ticketValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#38bdf8',
  },
  ticketValueText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#f8fafc',
    textAlign: 'right',
    flex: 1,
    marginLeft: 12,
  },
  ticketDivider: {
    height: 1,
    backgroundColor: '#334155',
    marginVertical: 8,
  },
  dashboardBtn: {
    width: '100%',
    backgroundColor: '#0284c7',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  dashboardBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  secondaryBtn: {
    width: '100%',
    backgroundColor: '#1e293b',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  secondaryBtnText: {
    color: '#94a3b8',
    fontSize: 14,
    fontWeight: '600',
  },
});
