import { Component } from '@angular/core';
import { NxInput, NxTextarea, NxCard, NxCardHeader, NxCardTitle, NxCardContent, NxButton } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-blocks-contact-demo',
  imports: [NxInput, NxTextarea, NxButton, NxCard, NxCardHeader, NxCardTitle, NxCardContent, DemoSection],
  templateUrl: './blocks-contact-demo.html',
})
export class BlocksContactDemo {
  name = '';
  email = '';
  message = '';

  code = `<nx-card class="template-card-wide" variant="elevated">
    <nx-card-header>
        <nx-card-title>Get in touch</nx-card-title>
    </nx-card-header>
    <nx-card-content>
        <form class="template-form">
            <nx-input label="Name" [(value)]="name"></nx-input>
            <nx-input label="Email" type="email" [(value)]="email"></nx-input>
            <nx-textarea label="Message" [rows]="4" [(value)]="message"></nx-textarea>
            <nx-button variant="primary">Send Message</nx-button>
        </form>
    </nx-card-content>
</nx-card>`;

  tsCode = `name = '';
email = '';
message = '';`;
}
