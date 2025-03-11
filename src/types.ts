export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
}

export interface Appointment {
  id: string;
  doctorId: string;
  patientEmail: string;
  dateTime: Date;
  symptoms: string;
}