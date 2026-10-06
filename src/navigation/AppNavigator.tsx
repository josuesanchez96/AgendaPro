import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useAppStore } from '../store/useAppStore';
import { LocationScreen } from '../screens/client/LocationScreen';
import { ProfessionalScreen } from '../screens/client/ProfessionalScreen';
import { ServiceScreen } from '../screens/client/ServiceScreen';
import { DateTimeScreen } from '../screens/client/DateTimeScreen';
import { ConfirmationScreen } from '../screens/client/ConfirmationScreen';
import { DashboardScreen } from '../screens/professional/DashboardScreen';

type ClientStep =
  | 'LOCATION'
  | 'PROFESSIONAL'
  | 'SERVICE'
  | 'DATETIME'
  | 'CONFIRMATION';

export const AppNavigator: React.FC = () => {
  const { mode, setMode } = useAppStore();
  const [clientStep, setClientStep] = useState<ClientStep>('LOCATION');

  if (mode === 'PROFESSIONAL') {
    return <DashboardScreen />;
  }

  // Client Flow Steps
  switch (clientStep) {
    case 'LOCATION':
      return (
        <LocationScreen
          onSelectLocation={() => setClientStep('PROFESSIONAL')}
        />
      );

    case 'PROFESSIONAL':
      return (
        <ProfessionalScreen
          onSelectProfessional={() => setClientStep('SERVICE')}
          onBack={() => setClientStep('LOCATION')}
        />
      );

    case 'SERVICE':
      return (
        <ServiceScreen
          onSelectService={() => setClientStep('DATETIME')}
          onBack={() => setClientStep('PROFESSIONAL')}
        />
      );

    case 'DATETIME':
      return (
        <DateTimeScreen
          onContinue={() => setClientStep('CONFIRMATION')}
          onBack={() => setClientStep('SERVICE')}
        />
      );

    case 'CONFIRMATION':
      return (
        <ConfirmationScreen
          onFinishBooking={() => setClientStep('LOCATION')}
          onGoToDashboard={() => {
            setMode('PROFESSIONAL');
            setClientStep('LOCATION');
          }}
          onBack={() => setClientStep('DATETIME')}
        />
      );

    default:
      return (
        <LocationScreen
          onSelectLocation={() => setClientStep('PROFESSIONAL')}
        />
      );
  }
};
