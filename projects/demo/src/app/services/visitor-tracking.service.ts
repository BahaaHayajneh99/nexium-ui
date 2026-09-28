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
  }

  /**
   * Track unique visitor by user ID with geolocation.
   * If the same user visits again, they won't be counted twice - and
   * neither will the same IP address under a *different* userId (e.g. a
   * cleared localStorage or a private-browsing window generates a fresh
   * guest id, but it's still the same real-world visitor).
   */
  trackUniqueVisitor(userId: string): Promise<void> {
    return new Promise(async (resolve) => {
      try {
        // Get user location from IP
        const locationData = await this.getUserLocation();

        const userVisitorRef = ref(this.db, `visitors/${userId}`);
        const snapshot = await get(userVisitorRef);

        if (snapshot.exists()) {
          // Returning visitor under this exact userId (not counted again).
          resolve();
          return;
        }

        if (locationData.ip !== 'N/A' && (await this.isIpAlreadyTracked(locationData.ip))) {
          // Same IP already has a visitor record under a different userId.
          resolve();
          return;
        }

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

        resolve();
      } catch (error) {
        resolve();
      }
    });
  }

  /** Whether any existing visitor record already has this IP address. */
  private async isIpAlreadyTracked(ip: string): Promise<boolean> {
    try {
      const visitorsRef = ref(this.db, 'visitors');
      const snapshot = await get(visitorsRef);
      if (!snapshot.exists()) {
        return false;
      }

      const visitors = snapshot.val();
      return Object.values(visitors).some((visitor: any) => visitor.ip === ip);
    } catch (error) {
      return false;
    }
  }

  /**
   * Get user location from IP using free GeoIP APIs.
   * ipapi.co has a low free-tier rate limit and is sometimes blocked by
   * ad-blockers, which was leaving real visitors recorded as "Unknown" -
   * ipwho.is is tried as a fallback before giving up.
   */
  private async getUserLocation(): Promise<any> {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();

      if (data && !data.error && (data.city || data.country_name)) {
        return {
          country: data.country_name || 'Unknown',
          city: data.city || 'Unknown',
          ip: data.ip || 'N/A',
          latitude: data.latitude || null,
          longitude: data.longitude || null,
          region: data.region || 'Unknown',
          postal: data.postal || ''
        };
      }
    } catch (error) {
      // fall through to the backup provider below
    }

    try {
      const response = await fetch('https://ipwho.is/');
      const data = await response.json();

      if (data && data.success !== false) {
        return {
          country: data.country || 'Unknown',
          city: data.city || 'Unknown',
          ip: data.ip || 'N/A',
          latitude: data.latitude || null,
          longitude: data.longitude || null,
          region: data.region || 'Unknown',
          postal: data.postal_code || ''
        };
      }
    } catch (error) {
      // fall through to the Unknown fallback below
    }

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
        callback(count);
      });
      return unsubscribe;
    } catch (error) {
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

      return countByCountry;
    } catch (error) {
      return {};
    }
  }
}

