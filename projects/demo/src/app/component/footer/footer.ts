import { Component, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NxIcon } from 'components';
import { CommonService } from '../../services/common.service';

interface NxFooterLink {
  label: string;
  path?: string;
  href?: string;
}

interface NxFooterColumn {
  heading: string;
  links: NxFooterLink[];
}

@Component({
  selector: 'app-footer',
  imports: [NgFor, NgIf, RouterLink, NxIcon],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  public commonService = inject(CommonService);

  currentYear = new Date().getFullYear();

  columns: NxFooterColumn[] = [
    {
      heading: 'Product',
      links: [
        { label: 'Getting Started', path: '/getting-started' },
        { label: 'Components', path: '/table' },
        { label: 'Live Showcase', path: '/showcase/dashboard' },
        { label: 'Get PRO License', path: '/pro-upgrade' },
      ],
    },
    {
      heading: 'Resources',
      links: [
        { label: 'GitHub', href: 'https://github.com/BahaaHayajneh99/nexium-ui' },
        { label: 'npm Package', href: 'https://www.npmjs.com/package/nexium-ui' },
        { label: 'Changelog', path: '/about/changelog' },
        { label: 'Roadmap', path: '/about/roadmap' },
      ],
    },
    {
      heading: 'About',
      links: [
        { label: 'Who We Are', path: '/about/who-we-are' },
        { label: 'License', path: '/about/license' },
        { label: 'Contributing', path: '/about/contributing' },
        { label: 'Contact', path: '/about/contact' },
      ],
    },
  ];
}
