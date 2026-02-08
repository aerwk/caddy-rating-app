import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC5Lvi02zdlTDY297KBZaMu8E9lkhVISVE",
    authDomain: "caddy-app-af295.firebaseapp.com",
    projectId: "caddy-app-af295",
    storageBucket: "caddy-app-af295.firebasestorage.app",
    messagingSenderId: "964467637345",
    appId: "1:964467637345:web:26952bb6a111916da8fe20",
    measurementId: "G-T8FPGK747V"
    };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = initializeAuth(app, {
persistence: getReactNativePersistence(AsyncStorage)
});
export default app;
