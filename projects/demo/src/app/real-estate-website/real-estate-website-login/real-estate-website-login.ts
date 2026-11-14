import { Component, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { nxProLicenseGranted, NxInput, NxCheckbox, NxButton, NxDivider, NxIcon } from 'components';
import { REAL_ESTATE_TESTIMONIALS } from '../real-estate-website-data';

/**
 * Login page of the "Real Estate Website" PRO template - a full-height two-column
 * "marketing panel + auth form" layout, mirroring the E-Commerce Website login page.
 */
@Component({
  selector: 'app-real-estate-website-login',
  standalone: true,
  imports: [NgTemplateOutlet, RouterLink, NxInput, NxCheckbox, NxButton, NxDivider, NxIcon],
  templateUrl: './real-estate-website-login.html',
  styleUrl: './real-estate-website-login.scss',
})
export class RealEstateWebsiteLoginDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly rememberMe = signal(true);

  protected readonly testimonial = REAL_ESTATE_TESTIMONIALS[0];
}
