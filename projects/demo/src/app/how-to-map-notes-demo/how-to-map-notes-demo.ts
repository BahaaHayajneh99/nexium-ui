import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NxSearch,
  NxChip,
  NxInput,
  NxTextarea,
  NxSelect,
  NxSelectOption,
  NxButton,
  NxCard,
  NxCardHeader,
  NxCardTitle,
  NxCardContent,
  NxCardFooter,
  NxTag,
  NxEmptyState,
} from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

// Loaded from a CDN <script>/<link> (see loadLeaflet()) rather than an npm
// dependency, so the rest of the app never pays for a mapping library it
// isn't using - the same approach the Try It playground uses for the
// TypeScript compiler. `L` becomes available as a global once loaded.
declare const L: any;

const LEAFLET_CSS_URL = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css';
const LEAFLET_JS_URL = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js';

interface Note {
  id: number;
  title: string;
  body: string;
  category: string;
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-how-to-map-notes-demo',
  imports: [
    FormsModule,
    DecimalPipe,
    NxSearch,
    NxChip,
    NxInput,
    NxTextarea,
    NxSelect,
    NxButton,
    NxCard,
    NxCardHeader,
    NxCardTitle,
    NxCardContent,
    NxCardFooter,
    NxTag,
    NxEmptyState,
    DemoSection,
  ],
  templateUrl: './how-to-map-notes-demo.html',
  styleUrl: './how-to-map-notes-demo.scss',
})
export class HowToMapNotesDemo implements AfterViewInit, OnDestroy {
  @ViewChild('mapContainer', { static: true }) private mapContainerRef!: ElementRef<HTMLDivElement>;

  categories = ['Work', 'Personal', 'Ideas', 'Shopping'];

  categoryOptions: NxSelectOption[] = this.categories.map((category) => ({ label: category, value: category }));

  notes: Note[] = [
    { id: 1, title: 'Sprint planning notes', body: 'Discuss backlog grooming and finalize the sprint goal with the team before Monday standup.', category: 'Work', lat: 40.7484, lng: -73.9857 },
    { id: 2, title: 'Book flights for reunion', body: 'Compare fares for the family reunion weekend, check baggage rules for the connecting flight.', category: 'Personal', lat: 40.7580, lng: -73.9855 },
    { id: 3, title: 'App onboarding redesign', body: 'Sketch a shorter onboarding flow that skips the tutorial for returning users.', category: 'Ideas', lat: 40.7411, lng: -74.0018 },
    { id: 4, title: 'Grocery run', body: 'Milk, eggs, coffee beans, and something for the potluck dinner on Friday.', category: 'Shopping', lat: 40.7295, lng: -73.9965 },
    { id: 5, title: 'Q3 retro takeaways', body: 'Follow up on the deployment delays raised in the retro and share notes with the team.', category: 'Work', lat: 40.7527, lng: -73.9772 },
  ];

  private nextId = 6;

  searchTerm = '';
  activeCategory = 'all';

  newTitle = '';
  newBody = '';
  newCategory = 'Work';
  pendingLocation: { lat: number; lng: number } | null = null;

  private map: any;
  private markers = new Map<number, any>();
  private pendingMarker: any = null;

  get filteredNotes(): Note[] {
    const term = this.searchTerm.trim().toLowerCase();

    return this.notes.filter((note) => {
      const matchesTerm =
        !term || note.title.toLowerCase().includes(term) || note.body.toLowerCase().includes(term);
      const matchesCategory = this.activeCategory === 'all' || note.category === this.activeCategory;
      return matchesTerm && matchesCategory;
    });
  }

  async ngAfterViewInit(): Promise<void> {
    await this.loadLeaflet();
    this.initMap();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  setCategory(category: string): void {
    this.activeCategory = this.activeCategory === category ? 'all' : category;
    this.syncMarkerVisibility();
  }

  addNote(): void {
    const title = this.newTitle.trim();
    if (!title) {
      return;
    }

    const location = this.pendingLocation ?? this.map?.getCenter() ?? { lat: 40.7484, lng: -73.9857 };

    const note: Note = {
      id: this.nextId++,
      title,
      body: this.newBody.trim(),
      category: this.newCategory,
      lat: location.lat,
      lng: location.lng,
    };

    this.notes = [note, ...this.notes];
    this.newTitle = '';
    this.newBody = '';
    this.clearPendingLocation();
    this.addMarkerForNote(note);
  }

  removeNote(id: number): void {
    this.notes = this.notes.filter((note) => note.id !== id);
    this.markers.get(id)?.remove();
    this.markers.delete(id);
  }

  focusNote(note: Note): void {
    this.map?.setView([note.lat, note.lng], 15, { animate: true });
    this.markers.get(note.id)?.openPopup();
  }

  clearPendingLocation(): void {
    this.pendingLocation = null;
    this.pendingMarker?.remove();
    this.pendingMarker = null;
  }

  private async loadLeaflet(): Promise<void> {
    if (typeof L !== 'undefined') {
      return;
    }

    if (!document.querySelector(`link[href="${LEAFLET_CSS_URL}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = LEAFLET_CSS_URL;
      document.head.appendChild(link);
    }

    await new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = LEAFLET_JS_URL;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Could not load Leaflet from the CDN.'));
      document.head.appendChild(script);
    });
  }

  private initMap(): void {
    const center = this.notes[0] ?? { lat: 40.7484, lng: -73.9857 };
    this.map = L.map(this.mapContainerRef.nativeElement).setView([center.lat, center.lng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(this.map);

    for (const note of this.notes) {
      this.addMarkerForNote(note);
    }

    this.map.on('click', (event: { latlng: { lat: number; lng: number } }) => {
      this.pendingLocation = { lat: event.latlng.lat, lng: event.latlng.lng };
      this.pendingMarker?.remove();
      this.pendingMarker = L.circleMarker(event.latlng, {
        radius: 8,
        color: '#3498db',
        fillColor: '#3498db',
        fillOpacity: 0.6,
      })
        .addTo(this.map)
        .bindPopup('New note will be pinned here')
        .openPopup();
    });
  }

  private addMarkerForNote(note: Note): void {
    if (!this.map) {
      return;
    }

    const marker = L.marker([note.lat, note.lng])
      .addTo(this.map)
      .bindPopup(`<strong>${this.escapeHtml(note.title)}</strong><br>${this.escapeHtml(note.category)}`);

    this.markers.set(note.id, marker);
  }

  private syncMarkerVisibility(): void {
    for (const note of this.notes) {
      const marker = this.markers.get(note.id);
      if (!marker) {
        continue;
      }

      const visible = this.activeCategory === 'all' || note.category === this.activeCategory;
      if (visible && !this.map.hasLayer(marker)) {
        marker.addTo(this.map);
      } else if (!visible && this.map.hasLayer(marker)) {
        marker.remove();
      }
    }
  }

  private escapeHtml(value: string): string {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  code = `<div class="notes-map" #mapContainer></div>

<div class="notes-toolbar">
    <nx-search placeholder="Search notes..." [(value)]="searchTerm"></nx-search>

    <div class="notes-filters">
        <nx-chip [selected]="activeCategory === 'all'" (click)="setCategory('all')">All</nx-chip>
        @for (category of categories; track category) {
            <nx-chip [selected]="activeCategory === category" (click)="setCategory(category)">{{ category }}</nx-chip>
        }
    </div>
</div>

<nx-card variant="outlined" class="notes-add-card">
    <nx-card-content>
        <div class="notes-add-form">
            <nx-input label="Title" placeholder="Note title" [(value)]="newTitle"></nx-input>
            <nx-textarea label="Body" placeholder="Write your note..." [rows]="2" [(value)]="newBody"></nx-textarea>
            <nx-select label="Category" [options]="categoryOptions" [(value)]="newCategory"></nx-select>
            @if (pendingLocation) {
                <p>Pinned at {{ pendingLocation.lat | number:'1.3-3' }}, {{ pendingLocation.lng | number:'1.3-3' }}</p>
            } @else {
                <p>Click the map to choose a location (defaults to the map's center).</p>
            }
            <nx-button variant="primary" [disabled]="!newTitle.trim()" (click)="addNote()">Add Note</nx-button>
        </div>
    </nx-card-content>
</nx-card>

@if (filteredNotes.length) {
    <div class="notes-grid">
        @for (note of filteredNotes; track note.id) {
            <nx-card variant="outlined" hoverable (click)="focusNote(note)">
                <nx-card-header>
                    <nx-card-title>{{ note.title }}</nx-card-title>
                    <nx-tag variant="outline">{{ note.category }}</nx-tag>
                </nx-card-header>
                <nx-card-content>
                    <p>{{ note.body }}</p>
                </nx-card-content>
                <nx-card-footer>
                    <nx-button variant="ghost" size="small" (click)="removeNote(note.id)">Delete</nx-button>
                </nx-card-footer>
            </nx-card>
        }
    </div>
} @else {
    <nx-empty-state
        icon="nx-search"
        title="No notes found"
        description="Try a different search term or clear the category filter.">
    </nx-empty-state>
}`;

  tsCode = `// Leaflet + OpenStreetMap tiles, loaded from a CDN at runtime - no API
// key needed, and the main bundle never pays for a mapping library.
declare const L: any;

interface Note {
  id: number;
  title: string;
  body: string;
  category: string;
  lat: number;
  lng: number;
}

@ViewChild('mapContainer', { static: true }) mapContainerRef!: ElementRef<HTMLDivElement>;

notes: Note[] = [ /* ...seed notes, each with a lat/lng... */ ];
pendingLocation: { lat: number; lng: number } | null = null;
private map: any;
private markers = new Map<number, any>();

async ngAfterViewInit(): Promise<void> {
  await this.loadLeaflet(); // injects the CDN <link>/<script> tags
  this.map = L.map(this.mapContainerRef.nativeElement).setView([this.notes[0].lat, this.notes[0].lng], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '...' }).addTo(this.map);

  for (const note of this.notes) {
    L.marker([note.lat, note.lng]).addTo(this.map).bindPopup(note.title);
  }

  // Clicking the map stages a location for the next note
  this.map.on('click', (e) => { this.pendingLocation = e.latlng; });
}

addNote(): void {
  const location = this.pendingLocation ?? this.map.getCenter();
  // ...push a new Note using location.lat/location.lng, then drop a marker...
}`;
}
