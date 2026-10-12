import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, onValue } from 'firebase/database';
import { firebaseConfig } from '../firebase.config';

const TRACK_VISITOR_ENDPOINT =
  typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:3000/api/trackVisitor'
    : 'https://nexium-ui.vercel.app/api/trackVisitor';

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
   * Records this visit as a unique visitor. Done server-side by api/trackVisitor.js - it dedupes
   * by a salted hash of the IP and reads location from Vercel's geo headers - so the database
   * never stores raw IPs and doesn't need to be writable from the browser.
   */
  trackUniqueVisitor(): Promise<void> {
    return fetch(TRACK_VISITOR_ENDPOINT, { method: 'POST' })
      .then(() => undefined)
      .catch(() => undefined);
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
}
