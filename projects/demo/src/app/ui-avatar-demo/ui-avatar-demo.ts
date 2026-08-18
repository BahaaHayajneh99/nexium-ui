import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { UiAvatar } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-avatar-demo',
  imports: [UiAvatar, DemoSection],
  templateUrl: './ui-avatar-demo.html',
  styleUrl: './ui-avatar-demo.scss',
})
export class UiAvatarDemo {
  public commonService = inject(CommonService);
  basicCode = `<nx-avatar src="user.jpg" alt="User avatar">
</nx-avatar>`;

  initialsCode = `<nx-avatar name="John Doe">
</nx-avatar>`;

  variantsCode = `<nx-avatar name="Primary" variant="primary"></nx-avatar>
<nx-avatar name="Secondary" variant="secondary"></nx-avatar>
<nx-avatar name="Success" variant="success"></nx-avatar>
<nx-avatar name="Danger" variant="danger"></nx-avatar>
<nx-avatar name="Warning" variant="warning"></nx-avatar>
<nx-avatar name="Info" variant="info"></nx-avatar>`;

  sizesCode = `<nx-avatar name="SM" size="small"></nx-avatar>
<nx-avatar name="MD" size="medium"></nx-avatar>
<nx-avatar name="LG" size="large"></nx-avatar>
<nx-avatar name="XL" size="xlarge"></nx-avatar>`;

  shapesCode = `<nx-avatar name="AB" shape="circle"></nx-avatar>
<nx-avatar name="AB" shape="rounded"></nx-avatar>
<nx-avatar name="AB" shape="square"></nx-avatar>`;

  statusCode = `<nx-avatar name="Jane" status="online"></nx-avatar>
<nx-avatar name="Jane" status="away"></nx-avatar>
<nx-avatar name="Jane" status="busy"></nx-avatar>
<nx-avatar name="Jane" status="offline"></nx-avatar>`;

  borderedCode = `<nx-avatar name="AB" bordered>
</nx-avatar>`;
}
