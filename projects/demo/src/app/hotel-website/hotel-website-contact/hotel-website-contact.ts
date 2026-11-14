import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  nxProLicenseGranted,
  NxInput,
  NxButton,
  NxIcon,
  NxCard,
  NxAccordionComponent,
  NxAccordionItemComponent,
  NxAccordionHeaderComponent,
  NxAccordionContentComponent,
} from 'components';
import { HOTEL_FAQS } from '../hotel-website-data';

/**
 * Contact page of the "Hotel / Travel Booking Website" PRO template - a contact form,
 * location/phone/email info card, and an FAQ accordion built from the shared HOTEL_FAQS
 * data.
 */
@Component({
  selector: 'app-hotel-website-contact',
  imports: [
    NgTemplateOutlet,
    RouterLink,
    NxInput,
    NxButton,
    NxIcon,
    NxCard,
    NxAccordionComponent,
    NxAccordionItemComponent,
    NxAccordionHeaderComponent,
    NxAccordionContentComponent,
  ],
  templateUrl: './hotel-website-contact.html',
  styleUrl: './hotel-website-contact.scss',
})
export class HotelWebsiteContactDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly faqs = HOTEL_FAQS;

  protected readonly subjects = ['General inquiry', 'Reservation support', 'Group booking', 'Event inquiry', 'Other'];

  protected readonly infoRows = [
    { icon: 'nx-map-pin', text: '18 Harborview Promenade, Seabrook, MA 01945' },
    { icon: 'nx-phone', text: '+1 (617) 555-0198' },
    { icon: 'nx-mail', text: 'reservations@themarlowhotel.com' },
    { icon: 'nx-clock', text: 'Front desk open 24 hours' },
  ];
}
