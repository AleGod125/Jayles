import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAnalytics, provideAnalytics, ScreenTrackingService } from '@angular/fire/analytics';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ "projectId": "jailes", "appId": "1:498125157098:web:62249e1564e87d566add93", "storageBucket": "jailes.appspot.com", "apiKey": "AIzaSyD8uxBTCas6gzJ_O1D0kRAw-IQBY1VHDjg", "authDomain": "jailes.firebaseapp.com", "messagingSenderId": "498125157098", "measurementId": "G-FN32K87T1M" })), provideAnalytics(() => getAnalytics()), ScreenTrackingService, provideFirestore(() => getFirestore()), provideStorage(() => getStorage())]
};
