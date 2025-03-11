import React, { useState, useEffect } from 'react';
import { Calendar, Users, MessageSquare } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import { ChatBox } from './components/ChatBox';
import { AppointmentModal } from './components/AppointmentModal';
import { doctors } from './data/doctors';
import { Message, Doctor } from './types';
import { processUserInput } from './utils/ai';

function App() {
  const [messages, setMessages] = useState<Message[]>([{
    id: '1',
    text: "Hello! I'm your AI medical assistant. How can I help you today?",
    sender: 'ai',
    timestamp: new Date()
  }]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isListening, setIsListening] = useState(false);
  
  const handleSendMessage = (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: processUserInput(text),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleVoiceCommand = () => {
    if (!('webkitSpeechRecognition' in window)) {
      toast.error('Voice recognition is not supported in your browser');
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      handleSendMessage(text);
    };

    recognition.start();
  };

  const handleAppointmentSubmit = (email: string, dateTime: string, symptoms: string) => {
    // In a real app, this would send data to a backend
    toast.success('Appointment booked successfully! Check your email for confirmation.');
    setSelectedDoctor(null);
    
    const confirmationMessage: Message = {
      id: Date.now().toString(),
      text: `Appointment confirmed with ${selectedDoctor?.name} on ${new Date(dateTime).toLocaleString()}. A confirmation email has been sent to ${email}.`,
      sender: 'ai',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, confirmationMessage]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Sidebar */}
          <div className="md:col-span-1 space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Users className="w-6 h-6 mr-2" />
                Available Doctors
              </h2>
              <div className="space-y-4">
                {doctors.map(doctor => (
                  <div
                    key={doctor.id}
                    className="flex items-center space-x-4 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                    onClick={() => setSelectedDoctor(doctor)}
                  >
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h3 className="font-medium">{doctor.name}</h3>
                      <p className="text-sm text-gray-600">{doctor.specialty}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="md:col-span-2 h-[calc(100vh-2rem)]">
            <ChatBox
              messages={messages}
              onSendMessage={handleSendMessage}
              onStartVoiceCommand={handleVoiceCommand}
              isListening={isListening}
            />
          </div>
        </div>
      </div>

      {selectedDoctor && (
        <AppointmentModal
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
          onSubmit={handleAppointmentSubmit}
        />
      )}
    </div>
  );
}

export default App;