import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NxNavbar, NxIcon, NxStepper, NxStep, NxButton, NxInput, NxBadge, NxSignaturePad } from 'components';
import { ShowcaseSourceView } from '../shared/showcase-source-view/showcase-source-view';
import { BOOKING_TS_SOURCE, BOOKING_HTML_SOURCE } from './showcase-booking.source';

interface NxShowcaseClass {
  id: string;
  name: string;
  instructor: string;
  duration: string;
  icon: string;
}

@Component({
  selector: 'app-showcase-booking',
  standalone: true,
  imports: [RouterLink, FormsModule, NxNavbar, NxIcon, NxStepper, NxButton, NxInput, NxBadge, NxSignaturePad, ShowcaseSourceView],
  templateUrl: './showcase-booking.html',
  styleUrl: './showcase-booking.scss',
})
export class ShowcaseBooking {
  tsSource = BOOKING_TS_SOURCE;
  htmlSource = BOOKING_HTML_SOURCE;

  steps: NxStep[] = [{ label: 'Class' }, { label: 'Date & time' }, { label: 'Your details' }, { label: 'Confirm' }];
  activeIndex = signal(0);

  classes: NxShowcaseClass[] = [
    { id: 'yoga', name: 'Yoga Flow', instructor: 'Mara Lindqvist', duration: '60 min', icon: 'nx-heart' },
    { id: 'hiit', name: 'HIIT Circuit', instructor: 'Jonas Ferreira', duration: '45 min', icon: 'nx-fire' },
    { id: 'pilates', name: 'Pilates Reform', instructor: 'Yuki Tanaka', duration: '50 min', icon: 'nx-star' },
    { id: 'spin', name: 'Spin Sprint', instructor: 'Alex Romero', duration: '40 min', icon: 'nx-compass' },
  ];

  selectedClassId = signal<string | null>(null);
  selectedClass = computed(() => this.classes.find((c) => c.id === this.selectedClassId()) ?? null);

  days = ['Mon 6', 'Tue 7', 'Wed 8', 'Thu 9', 'Fri 10'];
  selectedDay = signal<string | null>(null);

  timeSlots = ['7:00 AM', '8:30 AM', '10:00 AM', '12:00 PM', '4:30 PM', '6:00 PM', '7:30 PM'];
  selectedTime = signal<string | null>(null);

  name = '';
  email = '';
  phone = '';

  waiverSignature = signal<string | null>(null);

  confirmed = signal(false);

  get canContinue(): boolean {
    if (this.activeIndex() === 0) return !!this.selectedClassId();
    if (this.activeIndex() === 1) return !!this.selectedDay() && !!this.selectedTime();
    if (this.activeIndex() === 2) return !!this.name.trim() && !!this.email.trim() && !!this.waiverSignature();
    return true;
  }

  onSignature(dataUrl: string): void {
    this.waiverSignature.set(dataUrl);
  }

  next(): void {
    if (this.activeIndex() < this.steps.length - 1) {
      this.activeIndex.update((i) => i + 1);
    }
  }

  back(): void {
    if (this.activeIndex() > 0) {
      this.activeIndex.update((i) => i - 1);
    }
  }

  confirmBooking(): void {
    this.confirmed.set(true);
  }

  startOver(): void {
    this.confirmed.set(false);
    this.selectedClassId.set(null);
    this.selectedDay.set(null);
    this.selectedTime.set(null);
    this.name = '';
    this.email = '';
    this.phone = '';
    this.waiverSignature.set(null);
    this.activeIndex.set(0);
  }
}
