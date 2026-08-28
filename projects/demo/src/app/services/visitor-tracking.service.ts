import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, set, increment, update } from 'firebase/database';
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
   * Track unique visitor by user ID
   * If same user visits again, they won't be counted twice
   */
  trackUniqueVisitor(userId: string): Promise<void> {
    return new Promise(async (resolve) => {
      try {
        const userVisitorRef = ref(this.db, `visitors/${userId}`);
        const snapshot = await get(userVisitorRef);

        if (!snapshot.exists()) {
          // New unique visitor - save their record
          await set(userVisitorRef, {
            visitedAt: new Date().toISOString(),
            userId: userId
          });

          // Increment total unique visitors counter
          const totalRef = ref(this.db, 'stats/totalUniqueVisitors');
          const totalSnapshot = await get(totalRef);
          const currentTotal = totalSnapshot.val() || 0;
          
          await set(totalRef, currentTotal + 1);
          
          console.log('✓ New unique visitor tracked. Total:', currentTotal + 1);
        } else {
          console.log('✓ Returning visitor (already counted):', userId);
        }
        
        resolve();
      } catch (error) {
        console.error('Error tracking visitor:', error);
        resolve();
      }
    });
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
        resolve(count);
      } catch (error) {
        console.error('Error getting visitor count:', error);
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
      const unsubscribe = this.db.ref('stats/totalUniqueVisitors').on('value', (snapshot: any) => {
        const count = snapshot.val() || 0;
        callback(count);
      });
      return unsubscribe;
    } catch (error) {
      console.error('Error setting up visitor count listener:', error);
    }
  }
}
