export const REALESTATE_TS_SOURCE = `import { Component, computed, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { NxNavbar, NxIcon, NxBadge, NxButton, NxAvatar, NxPromptInput } from 'nexium-ui';

interface Property {
  id: string;
  title: string;
  address: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  type: 'House' | 'Condo' | 'Townhouse';
  description: string;
  agent: { name: string; phone: string; email: string };
}

@Component({
  selector: 'app-listings',
  standalone: true,
  imports: [DecimalPipe, NxNavbar, NxIcon, NxBadge, NxButton, NxAvatar, NxPromptInput],
  templateUrl: './listings.html',
})
export class Listings {
  types = ['All', 'House', 'Condo', 'Townhouse'] as const;
  activeType = signal<string>('All');

  properties: Property[] = [
    { id: 'maple', title: 'Maple Hollow Craftsman', address: '214 Maple Hollow Rd', price: 589000, beds: 4, baths: 3, sqft: 2450, type: 'House', description: '...', agent: { name: 'Elena Ruiz', phone: '(555) 019-2234', email: 'elena@havenrealty.example' } },
    // ...more properties
  ];

  filteredProperties = computed(() => {
    const type = this.activeType();
    return type === 'All' ? this.properties : this.properties.filter((p) => p.type === type);
  });

  selectedId = signal<string | null>(null);
  selectedProperty = computed(() => this.properties.find((p) => p.id === this.selectedId()) ?? null);

  sentMessages = signal<string[]>([]);

  onSendMessage(message: string): void {
    this.sentMessages.update((messages) => [...messages, message]);
  }
}
`;

export const REALESTATE_HTML_SOURCE = `@if (!selectedProperty()) {
    <div class="types">
        @for (type of types; track type) {
            <button [class.active]="activeType() === type" (click)="activeType.set(type)">{{ type }}</button>
        }
    </div>

    <div class="grid">
        @for (property of filteredProperties(); track property.id) {
            <button class="card" (click)="selectedId.set(property.id)">
                <nx-icon icon="nx-home" variant="svg"></nx-icon>
                @if (property.badge) { <nx-badge variant="info">{{ property.badge }}</nx-badge> }
                <div>\${{ property.price | number }}</div>
                <div>{{ property.title }}</div>
                <div><nx-icon icon="nx-map-pin" variant="svg"></nx-icon> {{ property.address }}</div>
                <div>{{ property.beds }} bd · {{ property.baths }} ba · {{ property.sqft | number }} sqft</div>
            </button>
        }
    </div>
} @else {
    <h2>{{ selectedProperty()!.title }}</h2>
    <div>\${{ selectedProperty()!.price | number }}</div>
    <p>{{ selectedProperty()!.description }}</p>

    <div class="agent-card">
        <nx-avatar [name]="selectedProperty()!.agent.name"></nx-avatar>
        <div>{{ selectedProperty()!.agent.name }}</div>
        <div>{{ selectedProperty()!.agent.phone }}</div>

        <nx-prompt-input
            placeholder="Ask about this property..."
            [maxLength]="500"
            (submit)="onSendMessage($event)">
        </nx-prompt-input>
    </div>
}
`;
