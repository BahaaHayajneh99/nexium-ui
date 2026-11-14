import { Component, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { nxProLicenseGranted, NxInput, NxCheckbox, NxButton, NxDivider, NxIcon } from 'components';
import { NX_SAAS_TESTIMONIALS } from '../saas-website-data';

/**
 * Login page of the "SaaS Website" PRO template - a full-height two-column "marketing panel
 * + auth form" layout, mirroring the e-commerce template's auth page pattern.
 */
@Component({
  selector: 'app-saas-website-login',
  imports: [NgTemplateOutlet, RouterLink, NxInput, NxCheckbox, NxButton, NxDivider, NxIcon],
  templateUrl: './saas-website-login.html',
  styleUrl: './saas-website-login.scss',
})
export class SaasWebsiteLoginDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly rememberMe = signal(true);

  protected readonly testimonial = NX_SAAS_TESTIMONIALS[0];
}
