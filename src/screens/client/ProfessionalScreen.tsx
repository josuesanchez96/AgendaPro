import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useAppStore } from '../../store/useAppStore';
import { Professional } from '../../types';
import { Header } from '../../components/Header';

interface ProfessionalScreenProps {
  onSelectProfessional: (professional: Professional) => void;
  onBack: () => void;
}

export const ProfessionalScreen: React.FC<ProfessionalScreenProps> = ({
  onSelectProfessional,
  onBack,
}) => {
  const { selectedLocation, professionals, setSelectedProfessional } =
    useAppStore();

  // Filter professionals that belong to the selected location
  const filteredProfessionals = professionals.filter((pro) =>
    selectedLocation ? pro.locationIds.includes(selectedLocation.id) : true
  );

  const handleSelect = (pro: Professional) => {
    setSelectedProfessional(pro);
    onSelectProfessional(pro);
  };

  const renderItem = ({ item }: { item: Professional }) => (
    <TouchableOpacity
      testID={`professional-card-${item.id}`}
      style={styles.card}
      onPress={() => handleSelect(item)}
      activeOpacity={0.8}
    >
      <View style={styles.avatarContainer}>
        <Text style={styles.avatar}>{item.avatar}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text
          style={styles.proName}
          testID={`professional-name-${item.id}`}
        >
          {item.name}
        </Text>
        <Text style={styles.specialtyText}>{item.specialty}</Text>

        <View style={styles.metaRow}>
          <View style={styles.ratingBadge}>
            <Text style={styles.starText}>★</Text>
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
          <Text style={styles.availabilityText}>
            📅 {item.availableDays.length} días disponibles
          </Text>
        </View>
      </View>

      <View
        testID={`btn-select-professional-${item.id}`}
        style={styles.selectBtn}
      >
        <Text style={styles.selectBtnText}>Elegir →</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="2. Selección del Profesional"
        showBack
        onBack={onBack}
      />
      <View style={styles.body}>
        {selectedLocation && (
          <View style={styles.locationBanner}>
            <Text style={styles.bannerLabel}>Sede seleccionada:</Text>
            <Text
              style={styles.bannerValue}
              testID="selected-location-name"
            >
              📍 {selectedLocation.name}
            </Text>
          </View>
        )}

        <Text style={styles.subtitle} testID="screen-professional-title">
          Selecciona el especialista que te atenderá:
        </Text>

        <FlatList
          data={filteredProfessionals}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listPadding}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                No hay profesionales disponibles en esta sede.
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
  locationBanner: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#0284c755',
  },
  bannerLabel: {
    fontSize: 11,
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  bannerValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#38bdf8',
    marginTop: 2,
  },
  subtitle: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 14,
    fontWeight: '500',
  },
  listPadding: {
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
    elevation: 3,
  },
  avatarContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    borderWidth: 1,
    borderColor: '#0284c744',
  },
  avatar: {
    fontSize: 28,
  },
  infoContainer: {
    flex: 1,
  },
  proName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#f8fafc',
  },
  specialtyText: {
    fontSize: 12,
    color: '#cbd5e1',
    marginTop: 2,
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0284c722',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginRight: 10,
  },
  starText: {
    color: '#f59e0b',
    fontSize: 11,
    marginRight: 3,
  },
  ratingText: {
    color: '#38bdf8',
    fontSize: 11,
    fontWeight: '700',
  },
  availabilityText: {
    fontSize: 11,
    color: '#64748b',
  },
  selectBtn: {
    backgroundColor: '#0284c7',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginLeft: 8,
  },
  selectBtnText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    color: '#64748b',
    fontSize: 14,
    textAlign: 'center',
  },
});
