import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

// DTO => Data Transfer Object => separando o que será recebido do firestore 

export type OrderFirestoreDTO = {
    patrimony: string;
    description: string;
    status: 'open' | 'closed';
    solution?: string;
    createdAt: FirebaseFirestoreTypes.Timestamp;
    closedAt?: FirebaseFirestoreTypes.Timestamp;
}