import { doctors } from '../data/doctors';

const symptoms = {
  'heart': ['chest pain', 'shortness of breath', 'palpitations'],
  'pediatric': ['fever', 'cough', 'cold'],
  'general': ['headache', 'body pain', 'fatigue']
};

export function processUserInput(input: string): string {
  const lowerInput = input.toLowerCase();

  // Check for greetings
  if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
    return "Hello! I'm your AI medical assistant. How can I help you today?";
  }

  // Check for appointment related queries
  if (lowerInput.includes('appointment') || lowerInput.includes('book')) {
    return "I can help you book an appointment. Please tell me your symptoms or the type of doctor you'd like to see.";
  }

  // Check for symptoms and recommend doctor
  for (const [specialty, symptomList] of Object.entries(symptoms)) {
    if (symptomList.some(symptom => lowerInput.includes(symptom))) {
      const doctor = doctors.find(d => 
        d.specialty.toLowerCase().includes(specialty) ||
        specialty === 'general'
      );
      if (doctor) {
        return `Based on your symptoms, I recommend seeing ${doctor.name}, who is a ${doctor.specialty}. Would you like to book an appointment?`;
      }
    }
  }

  // Default response
  return "I'm here to help you with medical appointments and questions. Could you please provide more details about your symptoms or the type of medical assistance you need?";
}