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
import { Service } from '../../types';
import { Header } from '../../components/Header';

interface ServiceScreenProps {
  onSelectService: (service: Service) => void;
  onBack: () => void;
}

export const ServiceScreen: React.FC<ServiceScreenProps> = ({
  onSelectService,
  onBack,
}) => {
  const { services, selectedProfessional, setSelectedService } = useAppStore();

  const handleSelect = (service: Service) => {
    setSelectedService(service);
    onSelectService(service);
  };

  const renderItem = ({ item }: { item: Service }) => (
    <TouchableOpacity
      testID={`service-card-${item.id}`}
      style={styles.card}
      onPress={() => handleSelect(item)}
      activeOpacity={0.8}
    >
      <View style={styles.topRow}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
        <Text style={styles.priceTag} testID={`service-price-${item.id}`}>
          ${item.price} MXN
        </Text>
      </View>

      <Text style={styles.serviceName} testID={`service-name-${item.id}`}>
        {item.name}
      </Text>
      <Text style={styles.descriptionText}>{item.description}</Text>

      <View style={styles.footerRow}>
        <View style={styles.durationBadge}>
          <Text style={styles.durationIcon}>⏱️</Text>
          <Text style={styles.durationText}>{item.durationMinutes} min</Text>
        </View>

        <View
          testID={`btn-select-service-${item.id}`}
          style={styles.selectBtn}
        >
          <Text style={styles.selectBtnText}>Seleccionar →</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="3. Selección del Servicio" showBack onBack={onBack} />
      <View style={styles.body}>
        {selectedProfessional && (
          <View style={styles.proBanner}>
            <Text style={styles.bannerLabel}>Profesional elegido:</Text>
            <Text style={styles.bannerValue} testID="selected-professional-name">
              {selectedProfessional.avatar} {selectedProfessional.name}
            </Text>
          </View>
        )}

        <Text style={styles.subtitle} testID="screen-service-title">
          Elige el tratamiento o servicio que deseas reservar:
        </Text>

        <FlatList
          data={services}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listPadding}
          showsVerticalScrollIndicator={false}
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
  proBanner: {
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
    borderWidth: 1,
    borderColor: '#334155',
    elevation: 3,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryBadge: {
    backgroundColor: '#0f172a',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  categoryText: {
    fontSize: 11,
    color: '#38bdf8',
    fontWeight: '600',
  },
  priceTag: {
    fontSize: 18,
    fontWeight: '800',
    color: '#10b981',
  },
  serviceName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#f8fafc',
    marginBottom: 4,
  },
  descriptionText: {
    fontSize: 13,
    color: '#94a3b8',
    lineHeight: 18,
    marginBottom: 14,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  durationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationIcon: {
    fontSize: 13,
    marginRight: 4,
  },
  durationText: {
    fontSize: 13,
    color: '#cbd5e1',
    fontWeight: '500',
  },
  selectBtn: {
    backgroundColor: '#0284c7',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  selectBtnText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
});
