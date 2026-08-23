import { Component, Input, booleanAttribute } from '@angular/core';

@Component({
  selector: 'nx-card',
  imports: [],
  standalone: true,
  templateUrl: './ui-card.html',
  styleUrl: './ui-card.scss',
})
export class NxCard {


  @Input() variant: 'outlined' | 'elevated' | 'flat' = 'flat';

  @Input() size: 'small' | 'medium' | 'large' = 'medium';


  @Input({ transform: booleanAttribute })
  hoverable = false;


}
