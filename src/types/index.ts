export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  image: string;
  rating: number;
}

export interface Professional {
  id: string;
  locationIds: string[];
  name: string;
  specialty: string;
  avatar: string;
  rating: number;
  availableDays: string[];
}

export interface Service {
  id: string;
  name: string;
  description: string;
  durationMinutes: number;
  price: number;
  category: string;
}

export interface Appointment {
  id: string;
  locationId: string;
  locationName: string;
  professionalId: string;
  professionalName: string;
  professionalAvatar: string;
  serviceId: string;
  serviceName: string;
  servicePrice: number;
  clientName: string;
  clientPhone: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  status: 'CONFIRMED' | 'PENDING' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
}

export type AppMode = 'CLIENT' | 'PROFESSIONAL';
