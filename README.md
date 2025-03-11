# AI Receptionist App Documentation

## Overview
The AI Receptionist App is a modern healthcare solution that streamlines appointment management between patients and doctors. The application features both voice and text interfaces, making it accessible and user-friendly for all users.


## Tech Stack:
Frontend: React Native with TypeScript, Expo, and Expo Router
Backend/Database: mongodb
UI Framework: React Native Paper
automation: make.com
Calling: twilio
conversation: eleven labs
AI Processing: DeepSeek

## Core Modules

### 1. Welcome Interface
- Hospital name prominently displayed in center
- Two primary access points:
  - Patient Portal
  - Doctor Portal

### 2. Doctor Module

#### Dashboard Features
- **Availability Management**
  - Set available time slots
  - Define consultation duration
  - Mark recurring availability

- **Appointment Overview**
  - View booked appointments
  - Patient details per slot
  - Real-time schedule updates

- **Appointment Actions**
  - Cancel appointments
    - Required: Cancellation reason
    - Automated patient notification (SMS + Call)
  - Mark appointments as completed
  - Track consultation history

#### Voice Command Integration
- Hands-free operation
- Natural language processing
- Quick schedule modifications

### 3. Patient Module

#### Interactive Interface
- Chat-based interaction system
- Voice command support
- Natural conversation flow

#### Core Functions
1. **Appointment Booking**
   - Doctor selection
   - Available slot visualization
   - Time slot selection
   - Mobile number verification (10-digit Indian format)
   - Booking confirmation via SMS and call

2. **Appointment Management**
   - Modify existing appointments
   - Cancel bookings
   - View upcoming appointments

3. **Communication Features**
   - Real-time chat support
   - Voice interaction
   - Automated notifications

## Technical Features

### Communication System
- **Multi-channel Notifications**
  - SMS alerts
  - Automated calls
  - In-app notifications

### Voice Integration
- Natural language processing
- Voice command recognition
- Bi-directional voice communication

### Security Features
- Secure authentication
- Data encryption
- Privacy compliance
- User data protection

### User Experience
- Intuitive navigation
- Responsive design
- Minimal learning curve
- Accessibility features

## Benefits

### For Doctors
- Efficient schedule management
- Reduced administrative overhead
- Automated patient communications
- Quick appointment modifications

### For Patients
- 24/7 appointment booking
- Multiple interaction methods
- Instant confirmations
- Easy schedule management

## Technical Requirements
- Mobile number validation
- SMS gateway integration
- Voice processing capability
- Secure data storage
- Real-time synchronization

## Database Schema

### Collections

#### 1. Users
```typescript
{
  _id: ObjectId,
  role: "patient" | "doctor",
  name: string,
  email: string,
  phone: string,
  password: string (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

#### 2. Doctors
```typescript
{
  _id: ObjectId,
  userId: ObjectId,
  specialization: string,
  experience: number,
  consultationFee: number,
  availableSlots: [{
    day: string,
    startTime: string,
    endTime: string,
    isRecurring: boolean
  }],
  createdAt: Date,
  updatedAt: Date
}
```

#### 3. Appointments
```typescript
{
  _id: ObjectId,
  patientId: ObjectId,
  doctorId: ObjectId,
  date: Date,
  startTime: string,
  endTime: string,
  status: "scheduled" | "completed" | "cancelled",
  cancellationReason?: string,
  createdAt: Date,
  updatedAt: Date
}
```

#### 4. Notifications
```typescript
{
  _id: ObjectId,
  userId: ObjectId,
  type: "sms" | "call" | "in-app",
  content: string,
  status: "pending" | "sent" | "failed",
  createdAt: Date,
  updatedAt: Date
}
```

## Project Structure
```
ai-receptionist/
├── app/
│   ├── assets/
│   │   ├── fonts/
│   │   └── images/
│   ├── components/
│   │   ├── common/
│   │   ├── doctor/
│   │   └── patient/
│   ├── config/
│   │   ├── api.ts
│   │   └── constants.ts
│   ├── hooks/
│   │   └── useAuth.ts
│   ├── services/
│   │   ├── api/
│   │   ├── voice/
│   │   └── notifications/
│   ├── store/
│   │   └── index.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── helpers.ts
│   ├── screens/
│   │   ├── auth/
│   │   ├── doctor/
│   │   └── patient/
│   └── navigation/
│       └── index.tsx
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   └── utils/
├── .env
├── package.json
└── tsconfig.json
```

---

*Note: This documentation is subject to updates and modifications based on user feedback and system requirements.*
