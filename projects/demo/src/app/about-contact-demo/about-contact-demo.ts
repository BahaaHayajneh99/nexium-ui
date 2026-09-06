import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxIcon, NxInput, NxTextarea, NxButton } from '../../../../../dist/components';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-about-contact-demo',
  imports: [FormsModule, NxIcon, NxInput, NxTextarea, NxButton, DemoSection],
  templateUrl: './about-contact-demo.html',
  styleUrl: './about-contact-demo.scss',
})
export class AboutContactDemo {
  commonService = inject(CommonService);

  name = '';
  email = '';
  message = '';
  sent = false;

  sendMessage(): void {
    const subject = encodeURIComponent(`Message from ${this.name || 'a website visitor'}`);
    const body = encodeURIComponent(`${this.message}\n\n— ${this.name} (${this.email})`);
    window.location.href = `mailto:bahaahayajneh3@gmail.com?subject=${subject}&body=${body}`;
    this.sent = true;
  }
}
