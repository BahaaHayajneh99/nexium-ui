import { Component, computed, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NxNavbar, NxIcon, NxBadge, NxButton, NxAvatar, NxPromptInput } from 'components';
import { ShowcaseSourceView } from '../shared/showcase-source-view/showcase-source-view';
import { REALESTATE_TS_SOURCE, REALESTATE_HTML_SOURCE } from './showcase-realestate.source';

type NxPropertyType = 'House' | 'Condo' | 'Townhouse';

interface NxShowcaseProperty {
  id: string;
  title: string;
  address: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  type: NxPropertyType;
  swatch: string;
  badge?: 'New' | 'Open House';
  description: string;
  agent: { name: string; phone: string; email: string };
}

@Component({
  selector: 'app-showcase-realestate',
  standalone: true,
  imports: [RouterLink, DecimalPipe, NxNavbar, NxIcon, NxBadge, NxButton, NxAvatar, NxPromptInput, ShowcaseSourceView],
  templateUrl: './showcase-realestate.html',
  styleUrl: './showcase-realestate.scss',
})
export class ShowcaseRealestate {
  tsSource = REALESTATE_TS_SOURCE;
  htmlSource = REALESTATE_HTML_SOURCE;

  types: ('All' | NxPropertyType)[] = ['All', 'House', 'Condo', 'Townhouse'];
  activeType = signal<'All' | NxPropertyType>('All');

  properties: NxShowcaseProperty[] = [
    {
      id: 'maple',
      title: 'Maple Hollow Craftsman',
      address: '214 Maple Hollow Rd, Ashford',
      price: 589000,
      beds: 4,
      baths: 3,
      sqft: 2450,
      type: 'House',
      swatch: '#4a6d5c',
      badge: 'New',
      description: 'A restored 1920s craftsman with original hardwood floors, a wraparound porch, and a fully updated kitchen opening onto a private garden.',
      agent: { name: 'Elena Ruiz', phone: '(555) 019-2234', email: 'elena@havenrealty.example' },
    },
    {
      id: 'skyline',
      title: 'Skyline Loft 14B',
      address: '88 Harbor View Ave, Unit 14B',
      price: 412000,
      beds: 2,
      baths: 2,
      sqft: 1180,
      type: 'Condo',
      swatch: '#34495e',
      badge: 'Open House',
      description: 'Floor-to-ceiling windows, a private balcony, and skyline views from every room. Building amenities include a gym and rooftop lounge.',
      agent: { name: 'Marcus Webb', phone: '(555) 019-7781', email: 'marcus@havenrealty.example' },
    },
    {
      id: 'cedar',
      title: 'Cedar Row Townhome',
      address: '5 Cedar Row, Brookfield',
      price: 468000,
      beds: 3,
      baths: 2.5,
      sqft: 1820,
      type: 'Townhouse',
      swatch: '#7a5c4f',
      description: 'An end-unit townhome with an attached garage, fenced backyard, and a finished basement ready for a home office or gym.',
      agent: { name: 'Priya Nair', phone: '(555) 019-4420', email: 'priya@havenrealty.example' },
    },
    {
      id: 'willow',
      title: 'Willow Creek Ranch',
      address: '1402 Willow Creek Ln, Ashford',
      price: 724000,
      beds: 5,
      baths: 4,
      sqft: 3100,
      type: 'House',
      swatch: '#8e8b3f',
      description: 'A single-story ranch on a half-acre lot with a pool, outdoor kitchen, and a newly renovated primary suite.',
      agent: { name: 'Owen Bishop', phone: '(555) 019-6632', email: 'owen@havenrealty.example' },
    },
    {
      id: 'parkside',
      title: 'Parkside Studio 6C',
      address: '220 Parkside Dr, Unit 6C',
      price: 268000,
      beds: 1,
      baths: 1,
      sqft: 640,
      type: 'Condo',
      swatch: '#5b4b8a',
      badge: 'New',
      description: 'A bright studio facing the park, with an updated kitchenette, in-unit laundry, and a dedicated parking spot.',
      agent: { name: 'Sofia Reyes', phone: '(555) 019-3305', email: 'sofia@havenrealty.example' },
    },
    {
      id: 'birchwood',
      title: 'Birchwood Mews',
      address: '9 Birchwood Mews, Brookfield',
      price: 395000,
      beds: 3,
      baths: 2,
      sqft: 1540,
      type: 'Townhouse',
      swatch: '#a35d3f',
      description: 'A low-maintenance townhome steps from the Brookfield greenway, with a modern kitchen and a shared courtyard.',
      agent: { name: 'Daniel Cho', phone: '(555) 019-8827', email: 'daniel@havenrealty.example' },
    },
  ];

  filteredProperties = computed(() => {
    const type = this.activeType();
    return type === 'All' ? this.properties : this.properties.filter((p) => p.type === type);
  });

  selectedId = signal<string | null>(null);
  selectedProperty = computed(() => this.properties.find((p) => p.id === this.selectedId()) ?? null);

  sentMessages = signal<string[]>([]);
  justSent = signal(false);

  openProperty(property: NxShowcaseProperty): void {
    this.selectedId.set(property.id);
    this.sentMessages.set([]);
    this.justSent.set(false);
  }

  backToListings(): void {
    this.selectedId.set(null);
  }

  onSendMessage(message: string): void {
    this.sentMessages.update((messages) => [...messages, message]);
    this.justSent.set(true);
    setTimeout(() => this.justSent.set(false), 3000);
  }
}
