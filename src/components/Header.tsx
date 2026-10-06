import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAppStore } from '../store/useAppStore';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, showBack, onBack }) => {
  const { mode, setMode } = useAppStore();

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        {showBack ? (
          <TouchableOpacity
            testID="btn-back"
            style={styles.backButton}
            onPress={onBack}
          >
            <Text style={styles.backText}>← Volver</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.brandContainer}>
            <Text style={styles.brandLogo}>📅</Text>
            <Text style={styles.brandTitle} testID="app-header-brand">
              Agenda<Text style={styles.brandAccent}>Pro</Text>
            </Text>
          </View>
        )}

        {/* Mode Switcher */}
        <View style={styles.modeSwitcherContainer} testID="header-mode-toggle">
          <TouchableOpacity
            testID="btn-mode-client"
            style={[styles.modeTab, mode === 'CLIENT' && styles.modeTabActive]}
            onPress={() => setMode('CLIENT')}
          >
            <Text
              style={[
                styles.modeTabText,
                mode === 'CLIENT' && styles.modeTabTextActive,
              ]}
            >
              Cliente
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            testID="btn-mode-pro"
            style={[
              styles.modeTab,
              mode === 'PROFESSIONAL' && styles.modeTabActive,
            ]}
            onPress={() => setMode('PROFESSIONAL')}
          >
            <Text
              style={[
                styles.modeTabText,
                mode === 'PROFESSIONAL' && styles.modeTabTextActive,
              ]}
            >
              Profesional
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {title && (
        <View style={styles.titleRow}>
          <Text style={styles.screenTitle} testID="header-screen-title">
            {title}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0f172a',
    paddingTop: 48,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandLogo: {
    fontSize: 22,
    marginRight: 6,
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  brandAccent: {
    color: '#38bdf8',
  },
  backButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#1e293b',
    borderRadius: 8,
  },
  backText: {
    color: '#38bdf8',
    fontWeight: '600',
    fontSize: 14,
  },
  modeSwitcherContainer: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    borderRadius: 20,
    padding: 3,
  },
  modeTab: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  modeTabActive: {
    backgroundColor: '#0284c7',
  },
  modeTabText: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '600',
  },
  modeTabTextActive: {
    color: '#ffffff',
  },
  titleRow: {
    marginTop: 12,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#f8fafc',
  },
});
