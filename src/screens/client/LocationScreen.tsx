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
import { Location } from '../../types';
import { Header } from '../../components/Header';

interface LocationScreenProps {
  onSelectLocation: (location: Location) => void;
}

export const LocationScreen: React.FC<LocationScreenProps> = ({
  onSelectLocation,
}) => {
  const { locations, setSelectedLocation } = useAppStore();

  const handleSelect = (location: Location) => {
    setSelectedLocation(location);
    onSelectLocation(location);
  };

  const renderItem = ({ item }: { item: Location }) => (
    <TouchableOpacity
      testID={`location-card-${item.id}`}
      style={styles.card}
      onPress={() => handleSelect(item)}
      activeOpacity={0.8}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.icon}>{item.image}</Text>
        <View style={styles.cardTitleContainer}>
          <Text style={styles.locationName} testID={`location-name-${item.id}`}>
            {item.name}
          </Text>
          <View style={styles.ratingBadge}>
            <Text style={styles.starText}>★</Text>
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.addressText}>{item.address}</Text>
      <Text style={styles.cityText}>{item.city}</Text>

      <View style={styles.cardFooter}>
        <Text style={styles.phoneText}>📞 {item.phone}</Text>
        <View
          testID={`btn-select-location-${item.id}`}
          style={styles.selectBtn}
        >
          <Text style={styles.selectBtnText}>Seleccionar →</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="1. Selección de Sede" />
      <View style={styles.body}>
        <Text style={styles.subtitle} testID="screen-location-title">
          Elige la sucursal de tu preferencia para tu atención:
        </Text>
        <FlatList
          data={locations}
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
    paddingTop: 16,
  },
  subtitle: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 16,
    fontWeight: '500',
  },
  listPadding: {
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#334155',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    fontSize: 32,
    marginRight: 12,
  },
  cardTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#f8fafc',
    flex: 1,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0284c722',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#0284c766',
  },
  starText: {
    color: '#f59e0b',
    marginRight: 4,
    fontSize: 12,
  },
  ratingText: {
    color: '#38bdf8',
    fontSize: 12,
    fontWeight: '700',
  },
  addressText: {
    fontSize: 13,
    color: '#cbd5e1',
    marginBottom: 2,
  },
  cityText: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  phoneText: {
    fontSize: 12,
    color: '#94a3b8',
  },
  selectBtn: {
    backgroundColor: '#0284c7',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  selectBtnText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
});
