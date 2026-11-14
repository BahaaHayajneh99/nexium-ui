import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { nxProLicenseGranted, NxIcon, NxButton, NxChip } from 'components';
import { PRO_WEBSITE_TEMPLATES } from '../pro-website-templates-data';

/**
 * Shared "product page" for every PRO full-website template (E-Commerce Website today, more to
 * come). Looks the template up by the `:slug` route param in `PRO_WEBSITE_TEMPLATES` - adding a
 * new PRO website template never needs a new details page, only a new registry entry.
 */
@Component({
  selector: 'app-pro-website-details',
  imports: [RouterLink, NxIcon, NxButton, NxChip],
  templateUrl: './pro-website-details.html',
  styleUrl: './pro-website-details.scss',
})
export class ProWebsiteDetails {
  private readonly route = inject(ActivatedRoute);

  protected readonly licensed = nxProLicenseGranted();

  private readonly slug = toSignal(this.route.paramMap.pipe(map((params) => params.get('slug'))), {
    initialValue: this.route.snapshot.paramMap.get('slug'),
  });

  protected readonly template = computed(() => PRO_WEBSITE_TEMPLATES.find((t) => t.slug === this.slug()) ?? null);
}
