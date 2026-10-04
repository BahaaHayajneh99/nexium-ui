export const BOOKING_TS_SOURCE = `import { Component, computed, signal } from '@angular/core';
import { NxNavbar, NxIcon, NxStepper, NxStep, NxButton, NxInput, NxBadge, NxSignaturePad } from 'nexium-ui';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [NxNavbar, NxIcon, NxStepper, NxButton, NxInput, NxBadge, NxSignaturePad],
  templateUrl: './booking.html',
})
export class Booking {
  steps: NxStep[] = [{ label: 'Class' }, { label: 'Date & time' }, { label: 'Your details' }, { label: 'Confirm' }];
  activeIndex = signal(0);

  classes = [
    { id: 'yoga', name: 'Yoga Flow', instructor: 'Mara Lindqvist', duration: '60 min', icon: 'nx-heart' },
    // ...more classes
  ];

  selectedClassId = signal<string | null>(null);
  selectedClass = computed(() => this.classes.find((c) => c.id === this.selectedClassId()) ?? null);

  selectedDay = signal<string | null>(null);
  selectedTime = signal<string | null>(null);

  name = '';
  email = '';
  waiverSignature = signal<string | null>(null);
  confirmed = signal(false);

  get canContinue(): boolean {
    if (this.activeIndex() === 2) return !!this.name.trim() && !!this.waiverSignature();
    return true;
  }

  onSignature(dataUrl: string): void {
    this.waiverSignature.set(dataUrl);
  }

  next(): void {
    this.activeIndex.update((i) => Math.min(i + 1, this.steps.length - 1));
  }

  confirmBooking(): void {
    this.confirmed.set(true);
  }
}
`;

export const BOOKING_HTML_SOURCE = `<nx-stepper [steps]="steps" [activeIndex]="activeIndex()" (activeIndexChange)="activeIndex.set($event)"></nx-stepper>

@switch (activeIndex()) {
    @case (0) {
        @for (cls of classes; track cls.id) {
            <button [class.active]="selectedClassId() === cls.id" (click)="selectedClassId.set(cls.id)">
                <nx-icon [icon]="cls.icon" variant="svg"></nx-icon>
                {{ cls.name }}
            </button>
        }
    }
    @case (1) {
        @for (day of days; track day) {
            <button [class.active]="selectedDay() === day" (click)="selectedDay.set(day)">{{ day }}</button>
        }
        @for (time of timeSlots; track time) {
            <button [class.active]="selectedTime() === time" (click)="selectedTime.set(time)">{{ time }}</button>
        }
    }
    @case (2) {
        <nx-input label="Full name" [(ngModel)]="name"></nx-input>
        <nx-input label="Email" [(ngModel)]="email"></nx-input>

        <p>I assume the risk of injury in participating in this class.</p>
        <nx-signature-pad (signatureChange)="onSignature($event)"></nx-signature-pad>
    }
    @case (3) {
        <p>{{ selectedClass()?.name }} on {{ selectedDay() }} at {{ selectedTime() }}</p>
        <nx-button variant="primary" (click)="confirmBooking()">Confirm booking</nx-button>
    }
}
`;
