import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, set, onValue } from 'firebase/database';
import { firebaseConfig } from '../firebase.config';

@Injectable({
  providedIn: 'root'
})
export class VisitorTrackingService {
  private db: any;

  constructor() {
    const app = initializeApp(firebaseConfig);
    this.db = getDatabase(app);
    console.log('✅ Firebase initialized for visitor tracking');
  }

  /**
   * Track unique visitor by user ID with geolocation
   * If same user visits again, they won't be counted twice
   */
  trackUniqueVisitor(userId: string): Promise<void> {
    return new Promise(async (resolve) => {
      try {
        console.log('📍 Tracking visitor:', userId);
        
        // Get user location from IP
        const locationData = await this.getUserLocation();
        console.log('🌍 Location detected:', locationData);
        
        const userVisitorRef = ref(this.db, `visitors/${userId}`);
        const snapshot = await get(userVisitorRef);

        if (!snapshot.exists()) {
          // New unique visitor - save their record with location
          await set(userVisitorRef, {
            visitedAt: new Date().toISOString(),
            userId: userId,
            country: locationData.country,
            city: locationData.city,
            ip: locationData.ip,
            latitude: locationData.latitude,
            longitude: locationData.longitude
          });

          // Increment total unique visitors counter
          const totalRef = ref(this.db, 'stats/totalUniqueVisitors');
          const totalSnapshot = await get(totalRef);
          const currentTotal = totalSnapshot.val() || 0;
          
          const newTotal = currentTotal + 1;
          await set(totalRef, newTotal);
          
          console.log(`✅ NEW VISITOR TRACKED! Total unique visitors: ${newTotal}`);
          console.log(`📍 Location: ${locationData.city}, ${locationData.country}`);
        } else {
          console.log('ℹ️ Returning visitor (not counted again):', userId);
          
          // Get current total anyway
          const totalRef = ref(this.db, 'stats/totalUniqueVisitors');
          const totalSnapshot = await get(totalRef);
          const currentTotal = totalSnapshot.val() || 0;
          console.log(`📊 Current total unique visitors: ${currentTotal}`);
        }
        
        resolve();
      } catch (error) {
        console.error('❌ Error tracking visitor:', error);
        resolve();
      }
    });
  }

  /**
   * Get user location from IP using free GeoIP API
   */
  private async getUserLocation(): Promise<any> {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      
      return {
        country: data.country_name || 'Unknown',
        city: data.city || 'Unknown',
        ip: data.ip || 'N/A',
        latitude: data.latitude || null,
        longitude: data.longitude || null,
        region: data.region || 'Unknown',
        postal: data.postal || ''
      };
    } catch (error) {
      console.error('❌ Error getting location:', error);
      return { 
        country: 'Unknown', 
        city: 'Unknown', 
        ip: 'N/A',
        latitude: null,
        longitude: null,
        region: 'Unknown',
        postal: ''
      };
    }
  }

  /**
   * Get total unique visitor count
   */
  getTotalVisitorCount(): Promise<number> {
    return new Promise(async (resolve) => {
      try {
        const totalRef = ref(this.db, 'stats/totalUniqueVisitors');
        const snapshot = await get(totalRef);
        const count = snapshot.val() || 0;
        console.log(`📊 Total visitors retrieved: ${count}`);
        resolve(count);
      } catch (error) {
        console.error('❌ Error getting visitor count:', error);
        resolve(0);
      }
    });
  }

  /**
   * Listen to real-time visitor count changes
   */
  onVisitorCountChange(callback: (count: number) => void) {
    try {
      const totalRef = ref(this.db, 'stats/totalUniqueVisitors');
      const unsubscribe = onValue(totalRef, (snapshot) => {
        const count = snapshot.val() || 0;
        console.log(`📊 Visitor count updated: ${count}`);
        callback(count);
      });
      return unsubscribe;
    } catch (error) {
      console.error('❌ Error setting up visitor count listener:', error);
      return () => {}; // Return empty function if error
    }
  }

  /**
   * Get visitors by country
   */
  async getVisitorsByCountry(): Promise<any> {
    try {
      const visitorsRef = ref(this.db, 'visitors');
      const snapshot = await get(visitorsRef);
      
      if (!snapshot.exists()) {
        return {};
      }

      const visitors = snapshot.val();
      const countByCountry: any = {};

      Object.values(visitors).forEach((visitor: any) => {
        const country = visitor.country || 'Unknown';
        countByCountry[country] = (countByCountry[country] || 0) + 1;
      });

      console.log('📍 Visitors by country:', countByCountry);
      return countByCountry;
    } catch (error) {
      console.error('❌ Error getting visitors by country:', error);
      return {};
    }
  }
}

