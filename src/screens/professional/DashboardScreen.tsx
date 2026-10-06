import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useAppStore } from '../../store/useAppStore';
import { Appointment } from '../../types';
import { Header } from '../../components/Header';

export const DashboardScreen: React.FC = () => {
  const { appointments, cancelAppointment } = useAppStore();
  const [filter, setFilter] = useState<'ALL' | 'CONFIRMED' | 'CANCELLED'>('ALL');

  // Sort appointments by date & time ascending
  const sortedAppointments = [...appointments].sort((a, b) => {
    const dateTimeA = `${a.date} ${a.time}`;
    const dateTimeB = `${b.date} ${b.time}`;
    return dateTimeA.localeCompare(dateTimeB);
  });

  const filteredAppointments = sortedAppointments.filter((apt) => {
    if (filter === 'CONFIRMED') return apt.status === 'CONFIRMED';
    if (filter === 'CANCELLED') return apt.status === 'CANCELLED';
    return true;
  });

  const totalRevenue = sortedAppointments
    .filter((a) => a.status === 'CONFIRMED')
    .reduce((sum, a) => sum + a.servicePrice, 0);

  const handleCancel = (id: string, clientName: string) => {
    cancelAppointment(id);
  };

  const renderItem = ({ item }: { item: Appointment }) => {
    const isCancelled = item.status === 'CANCELLED';

    return (
      <View
        testID={`appointment-card-${item.id}`}
        style={[styles.card, isCancelled && styles.cardCancelled]}
      >
        <View style={styles.cardHeader}>
          <View style={styles.idBadge}>
            <Text style={styles.idText} testID={`appointment-id-${item.id}`}>
              #{item.id}
            </Text>
          </View>
          <View
            style={[
              styles.statusBadge,
              isCancelled
                ? styles.statusBadgeCancelled
                : styles.statusBadgeConfirmed,
            ]}
            testID={`appointment-status-${item.id}`}
          >
            <Text
              style={[
                styles.statusText,
                isCancelled
                  ? styles.statusTextCancelled
                  : styles.statusTextConfirmed,
              ]}
            >
              {isCancelled ? 'CANCELADA' : 'CONFIRMADA'}
            </Text>
          </View>
        </View>

        <Text
          style={styles.clientName}
          testID={`appointment-client-${item.id}`}
        >
          👤 {item.clientName}
        </Text>
        <Text style={styles.clientPhone}>📞 Tel: {item.clientPhone}</Text>

        <View style={styles.divider} />

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>📍 Sede:</Text>
          <Text style={styles.detailValue}>{item.locationName}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>👨‍⚕️ Especialista:</Text>
          <Text style={styles.detailValue}>
            {item.professionalAvatar} {item.professionalName}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>💆 Servicio:</Text>
          <Text style={styles.detailValue}>
            {item.serviceName} (${item.servicePrice} MXN)
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>📅 Fecha y Hora:</Text>
          <Text
            style={styles.dateTimeValue}
            testID={`appointment-datetime-${item.id}`}
          >
            {item.date} a las {item.time} hrs
          </Text>
        </View>

        {!isCancelled && (
          <TouchableOpacity
            testID={`btn-cancel-appointment-${item.id}`}
            style={styles.cancelBtn}
            onPress={() => handleCancel(item.id, item.clientName)}
          >
            <Text style={styles.cancelBtnText}>Cancelar Cita</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Dashboard del Profesional" />
      <View style={styles.body}>
        {/* Stat Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Total Citas</Text>
            <Text style={styles.statValue} testID="total-appointments-count">
              {sortedAppointments.length}
            </Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Ingreso Est.</Text>
            <Text style={styles.statValueGreen} testID="total-revenue-value">
              ${totalRevenue}
            </Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Confirmadas</Text>
            <Text style={styles.statValueBlue} testID="confirmed-count">
              {sortedAppointments.filter((a) => a.status === 'CONFIRMED').length}
            </Text>
          </View>
        </View>

        {/* Filter Bar */}
        <View style={styles.filterRow}>
          <TouchableOpacity
            testID="btn-filter-all"
            style={[styles.filterChip, filter === 'ALL' && styles.filterChipActive]}
            onPress={() => setFilter('ALL')}
          >
            <Text
              style={[
                styles.filterChipText,
                filter === 'ALL' && styles.filterChipTextActive,
              ]}
            >
              Todas ({sortedAppointments.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            testID="btn-filter-confirmed"
            style={[
              styles.filterChip,
              filter === 'CONFIRMED' && styles.filterChipActive,
            ]}
            onPress={() => setFilter('CONFIRMED')}
          >
            <Text
              style={[
                styles.filterChipText,
                filter === 'CONFIRMED' && styles.filterChipTextActive,
              ]}
            >
              Confirmadas
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            testID="btn-filter-cancelled"
            style={[
              styles.filterChip,
              filter === 'CANCELLED' && styles.filterChipActive,
            ]}
            onPress={() => setFilter('CANCELLED')}
          >
            <Text
              style={[
                styles.filterChipText,
                filter === 'CANCELLED' && styles.filterChipTextActive,
              ]}
            >
              Canceladas
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionHeader} testID="screen-dashboard-title">
          Citas Programadas (Orden Cronológico):
        </Text>

        <FlatList
          data={filteredAppointments}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listPadding}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>
                No hay citas agendadas con este filtro.
              </Text>
            </View>
          }
        />
      </View>
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
    paddingTop: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  statCard: {
    width: '31%',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#334155',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 11,
    color: '#94a3b8',
    fontWeight: '600',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#f8fafc',
  },
  statValueGreen: {
    fontSize: 16,
    fontWeight: '800',
    color: '#10b981',
  },
  statValueBlue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#38bdf8',
  },
  filterRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  filterChip: {
    backgroundColor: '#1e293b',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  filterChipActive: {
    backgroundColor: '#0284c7',
    borderColor: '#38bdf8',
  },
  filterChipText: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '600',
  },
  filterChipTextActive: {
    color: '#ffffff',
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '600',
    color: '#cbd5e1',
    marginBottom: 12,
  },
  listPadding: {
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardCancelled: {
    opacity: 0.6,
    borderColor: '#ef444455',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  idBadge: {
    backgroundColor: '#0f172a',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  idText: {
    color: '#38bdf8',
    fontWeight: '700',
    fontSize: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  statusBadgeConfirmed: {
    backgroundColor: '#064e3b',
  },
  statusBadgeCancelled: {
    backgroundColor: '#7f1d1d',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  statusTextConfirmed: {
    color: '#34d399',
  },
  statusTextCancelled: {
    color: '#fca5a5',
  },
  clientName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#f8fafc',
  },
  clientPhone: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#334155',
    marginVertical: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  detailLabel: {
    fontSize: 12,
    color: '#94a3b8',
  },
  detailValue: {
    fontSize: 12,
    color: '#cbd5e1',
    fontWeight: '600',
  },
  dateTimeValue: {
    fontSize: 12,
    color: '#38bdf8',
    fontWeight: '700',
  },
  cancelBtn: {
    marginTop: 12,
    backgroundColor: '#7f1d1d33',
    borderColor: '#ef444466',
    borderWidth: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelBtnText: {
    color: '#fca5a5',
    fontSize: 12,
    fontWeight: '700',
  },
  emptyBox: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    color: '#64748b',
    fontSize: 14,
  },
});
