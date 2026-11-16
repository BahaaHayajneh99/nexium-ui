import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NxIcon } from 'components';
import { CommonService } from '../../services/common.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-site-header',
  imports: [NgFor, RouterLink, NxIcon],
  templateUrl: './site-header.html',
  styleUrl: './site-header.scss',
})
export class SiteHeader {
  public commonService = inject(CommonService);
  public theme = inject(ThemeService);
}
