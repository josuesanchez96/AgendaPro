import { create } from 'zustand';
import { Location, Professional, Service, Appointment, AppMode } from '../types';

interface AppState {
  mode: AppMode;
  setMode: (mode: AppMode) => void;

  locations: Location[];
  professionals: Professional[];
  services: Service[];
  appointments: Appointment[];

  // Draft selection for client booking flow
  selectedLocation: Location | null;
  selectedProfessional: Professional | null;
  selectedService: Service | null;
  selectedDate: string | null;
  selectedTime: string | null;
  clientName: string;
  clientPhone: string;

  // Actions
  setSelectedLocation: (location: Location | null) => void;
  setSelectedProfessional: (professional: Professional | null) => void;
  setSelectedService: (service: Service | null) => void;
  setSelectedDate: (date: string | null) => void;
  setSelectedTime: (time: string | null) => void;
  setClientInfo: (name: string, phone: string) => void;

  resetDraft: () => void;
  addAppointment: (appointmentData: Omit<Appointment, 'id' | 'createdAt'>) => Appointment;
  cancelAppointment: (id: string) => void;
}

const INITIAL_LOCATIONS: Location[] = [
  {
    id: 'loc-1',
    name: 'Sede Central Polanco',
    address: 'Av. Presidente Masaryk 101, Col. Polanco',
    city: 'Ciudad de México',
    phone: '+52 55 1234 5678',
    image: '🏢',
    rating: 4.9,
  },
  {
    id: 'loc-2',
    name: 'Sede Santa Fe',
    address: 'Av. Vasco de Quiroga 3800, Lomas de Santa Fe',
    city: 'Ciudad de México',
    phone: '+52 55 9876 5432',
    image: '🏙️',
    rating: 4.8,
  },
  {
    id: 'loc-3',
    name: 'Sede Condesa',
    address: 'Calle Amsterdam 120, Hipódromo Condesa',
    city: 'Ciudad de México',
    phone: '+52 55 5555 1234',
    image: '🌿',
    rating: 4.9,
  },
];

const INITIAL_PROFESSIONALS: Professional[] = [
  {
    id: 'pro-1',
    locationIds: ['loc-1', 'loc-3'],
    name: 'Dr. Carlos Mendoza',
    specialty: 'Estética & Estilismo Masculino',
    avatar: '👨‍⚕️',
    rating: 4.9,
    availableDays: ['2026-10-05', '2026-10-06', '2026-10-07', '2026-10-08'],
  },
  {
    id: 'pro-2',
    locationIds: ['loc-1', 'loc-2'],
    name: 'Dra. Sofía Ramírez',
    specialty: 'Dermatología & Cuidado Facial',
    avatar: '👩‍⚕️',
    rating: 5.0,
    availableDays: ['2026-10-05', '2026-10-06', '2026-10-07'],
  },
  {
    id: 'pro-3',
    locationIds: ['loc-2', 'loc-3'],
    name: 'Lic. Alejandro Silva',
    specialty: 'Fisioterapia & Masaje Terapéutico',
    avatar: '👨‍🔬',
    rating: 4.7,
    availableDays: ['2026-10-06', '2026-10-07', '2026-10-08'],
  },
  {
    id: 'pro-4',
    locationIds: ['loc-1', 'loc-2', 'loc-3'],
    name: 'Dra. María Elena Torres',
    specialty: 'Cosmiatría Avanzada',
    avatar: '👩‍🔬',
    rating: 4.9,
    availableDays: ['2026-10-05', '2026-10-07', '2026-10-08'],
  },
];

const INITIAL_SERVICES: Service[] = [
  {
    id: 'srv-1',
    name: 'Corte Executive & Barba',
    description: 'Asesoría de imagen, corte personalizado, perfilado de barba y toalla caliente.',
    durationMinutes: 45,
    price: 450,
    category: 'Estilo',
  },
  {
    id: 'srv-2',
    name: 'Limpieza Facial Profunda',
    description: 'Exfoliación ultrasónica, extracción de impurezas y mascarilla hidratante.',
    durationMinutes: 60,
    price: 850,
    category: 'Facial',
  },
  {
    id: 'srv-3',
    name: 'Masaje Descontracturante',
    description: 'Terapia focalizada para liberar tensión muscular en espalda y cuello.',
    durationMinutes: 50,
    price: 950,
    category: 'Bienestar',
  },
  {
    id: 'srv-4',
    name: 'Evaluación Cosmiátrica',
    description: 'Diagnóstico de piel con cámara digital y recomendación de tratamiento.',
    durationMinutes: 30,
    price: 600,
    category: 'Diagnóstico',
  },
];

const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-101',
    locationId: 'loc-1',
    locationName: 'Sede Central Polanco',
    professionalId: 'pro-1',
    professionalName: 'Dr. Carlos Mendoza',
    professionalAvatar: '👨‍⚕️',
    serviceId: 'srv-1',
    serviceName: 'Corte Executive & Barba',
    servicePrice: 450,
    clientName: 'Roberto Gómez',
    clientPhone: '55 1122 3344',
    date: '2026-10-05',
    time: '10:00',
    status: 'CONFIRMED',
    createdAt: '2026-10-04T10:00:00Z',
  },
  {
    id: 'apt-102',
    locationId: 'loc-2',
    locationName: 'Sede Santa Fe',
    professionalId: 'pro-2',
    professionalName: 'Dra. Sofía Ramírez',
    professionalAvatar: '👩‍⚕️',
    serviceId: 'srv-2',
    serviceName: 'Limpieza Facial Profunda',
    servicePrice: 850,
    clientName: 'Ana Valeria Martínez',
    clientPhone: '55 9988 7766',
    date: '2026-10-05',
    time: '11:30',
    status: 'CONFIRMED',
    createdAt: '2026-10-04T11:00:00Z',
  },
];

export const useAppStore = create<AppState>((set, get) => ({
  mode: 'CLIENT',
  setMode: (mode) => set({ mode }),

  locations: INITIAL_LOCATIONS,
  professionals: INITIAL_PROFESSIONALS,
  services: INITIAL_SERVICES,
  appointments: INITIAL_APPOINTMENTS,

  selectedLocation: null,
  selectedProfessional: null,
  selectedService: null,
  selectedDate: null,
  selectedTime: null,
  clientName: '',
  clientPhone: '',

  setSelectedLocation: (location) => set({ selectedLocation: location }),
  setSelectedProfessional: (professional) => set({ selectedProfessional: professional }),
  setSelectedService: (service) => set({ selectedService: service }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setSelectedTime: (time) => set({ selectedTime: time }),
  setClientInfo: (name, phone) => set({ clientName: name, clientPhone: phone }),

  resetDraft: () =>
    set({
      selectedLocation: null,
      selectedProfessional: null,
      selectedService: null,
      selectedDate: null,
      selectedTime: null,
      clientName: '',
      clientPhone: '',
    }),

  addAppointment: (appointmentData) => {
    const newAppointment: Appointment = {
      ...appointmentData,
      id: `apt-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString(),
    };

    set((state) => ({
      appointments: [newAppointment, ...state.appointments],
    }));

    return newAppointment;
  },

  cancelAppointment: (id) => {
    set((state) => ({
      appointments: state.appointments.map((apt) =>
        apt.id === id ? { ...apt, status: 'CANCELLED' } : apt
      ),
    }));
  },
}));
