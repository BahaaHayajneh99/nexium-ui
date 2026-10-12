import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxAvatar, NxPresenceIndicator } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-presence-indicator-demo',
  imports: [NxPresenceIndicator, NxAvatar, DemoSection],
  templateUrl: './ui-presence-indicator-demo.html',
  styleUrl: './ui-presence-indicator-demo.scss',
})
export class UiPresenceIndicatorDemo {
  importCode = `import { NxPresenceIndicator } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  basicCode = `<nx-presence-indicator status="online"></nx-presence-indicator>
<nx-presence-indicator status="away"></nx-presence-indicator>
<nx-presence-indicator status="busy"></nx-presence-indicator>
<nx-presence-indicator status="offline"></nx-presence-indicator>`;

  basicTs = `// status accepts 'online' | 'away' | 'busy' | 'offline'.`;

  labelCode = `<nx-presence-indicator status="online" showLabel></nx-presence-indicator>
<nx-presence-indicator status="away" showLabel></nx-presence-indicator>
<nx-presence-indicator status="busy" showLabel></nx-presence-indicator>
<nx-presence-indicator status="offline" showLabel></nx-presence-indicator>`;

  labelTs = `// showLabel renders a status-derived label ("Online", "Away", ...) next to the dot.
// Pass [label]="'Custom text'" to override it.`;

  pulseCode = `<nx-presence-indicator status="online" [pulse]="true" showLabel></nx-presence-indicator>`;

  pulseTs = `// pulse adds a subtle animated ring around the dot - typically used for 'online'.`;

  avatarCode = `<nx-presence-indicator mode="avatar" status="online"
    avatarName="Jane Doe">
</nx-presence-indicator>
<nx-presence-indicator mode="avatar" status="away"
    avatarName="John Doe">
</nx-presence-indicator>
<nx-presence-indicator mode="avatar" status="busy"
    avatarName="Amy Lee">
</nx-presence-indicator>
<nx-presence-indicator mode="avatar" status="offline"
    avatarName="Max Roy">
</nx-presence-indicator>`;

  avatarTs = `// mode="avatar" overlays the dot in the bottom-right corner of an avatar.
// Pass avatarUrl / avatarName (+ avatarSize / avatarShape / avatarVariant) and
// an internal <nx-avatar> is rendered for you.`;

  avatarImageCode = `<nx-presence-indicator mode="avatar" status="online"
    avatarUrl="../../assets/images/anonymous.png" avatarAlt="Jane Doe">
</nx-presence-indicator>`;

  avatarImageTs = `// Works the same way with a real image avatar.`;

  projectedCode = `<nx-presence-indicator mode="avatar" status="online">
    <nx-avatar name="AB" variant="info"></nx-avatar>
</nx-presence-indicator>`;

  projectedTs = `// Or project your own avatar markup instead of using avatarUrl/avatarName -
// the dot is still positioned in the bottom-right corner.`;

  contextCode = `<div class="member-row" *ngFor="let member of members">
    <nx-presence-indicator mode="avatar" [status]="member.status" [avatarName]="member.name" avatarSize="small">
    </nx-presence-indicator>
    <span>{{ member.name }}</span>
    <nx-presence-indicator [status]="member.status" showLabel></nx-presence-indicator>
</div>`;

  contextTs = `members = [
  { name: 'Jane Doe', status: 'online' },
  { name: 'John Doe', status: 'away' },
  { name: 'Amy Lee', status: 'busy' },
  { name: 'Max Roy', status: 'offline' },
];`;

  members: { name: string; status: 'online' | 'away' | 'busy' | 'offline' }[] = [
    { name: 'Jane Doe', status: 'online' },
    { name: 'John Doe', status: 'away' },
    { name: 'Amy Lee', status: 'busy' },
    { name: 'Max Roy', status: 'offline' },
  ];
}
